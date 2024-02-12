import express from "express";
import cors from "cors";
import alumnoRoute from "./routes/alumno.route.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/alumnos", alumnoRoute);
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
