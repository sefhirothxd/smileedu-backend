import 'dotenv/config';
import pkg from 'pg';

const { Pool } = pkg;

// Crear el pool de conexión
export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false, // Necesario para Supabase
	},
	allowExitOnIdle: true,
});

// Probar la conexión
(async () => {
	try {
		const res = await pool.query('SELECT NOW()');
		console.log('Database connected at:', res.rows[0].now);
	} catch (error) {
		console.error('Database connection error:', error);
	}
})();
