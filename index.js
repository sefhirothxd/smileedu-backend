import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import alumnoRoute from './routes/alumno.route.js';
import regaloRoute from './routes/regalo.route.js';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/postgres-adapter';
import { pool } from './database/connection.js';

const app = express();
const server = createServer(app);
export const io = new Server(server);

app.use(cors());

app.use(express.json());
app.use('/api/alumnos', alumnoRoute);
app.use('/api/regalos', regaloRoute);

app.get('/', (req, res) => {
	res.send('API is running...');
});
io.adapter(createAdapter(pool));
io.engine.on('initial_headers', (headers, req) => {
	headers['Access-Control-Allow-Origin'] = '*';
});

io.engine.on('headers', (headers, req) => {
	headers['Access-Control-Allow-Origin'] = '*'; // url to all
});

io.on('connection', (socket) => {
	console.log('nuevo socket connectado:', socket.id);

	const emitRegalos = async () => {
		const result = await pool.query(
			'SELECT * FROM regalos where estado = true'
		);
		// console.log(result.rows);
		socket.emit('regalos', result.rows);
		socket.broadcast.emit('regalos', result.rows);
	};
	emitRegalos();

	socket.on('actulizarRegalos', () => {
		emitRegalos();
		console.log('actualizando regalos');
	});
	socket.on('disconnect', () => {
		console.log('socket desconectado:', socket.id);
	});
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
	console.log('Server is running on http://localhost:' + PORT);
});
