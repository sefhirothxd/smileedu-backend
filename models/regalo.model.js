import { pool } from "../database/connection.js";

const findAll = async () => {
  const result = await pool.query("SELECT * FROM registroregalos");
  return result?.rows;
};
const findAllRegalos = async () => {
  const result = await pool.query("SELECT * FROM regalos where estado = true");
  return result?.rows;
};

const createRegalo = async (regalo) => {
  const result = await pool.query(
    "INSERT INTO registroregalos ( nombres,apellidos,regalo) VALUES ($1, $2, $3) RETURNING *",
    [regalo.nombres, regalo.apellidos, regalo.regalo]
  );
  return result.rows[0];
};

const deleteRegalo = async (id) => {
  const result = await pool.query("DELETE FROM registroregalos WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

export const regaloModel = {
  findAll,
  createRegalo,
  deleteRegalo,
  findAllRegalos,
};
