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
  const findEstado = await pool.query(
    "SELECT * FROM regalos where nombre = $1",
    [regalo.regalo]
  );
  console.log(findEstado.rows[0].estado);
  if (findEstado.rows[0].estado == false) {
    return { error: "El regalo ya fue seleccionado" };
  }
  const result = await pool.query(
    "INSERT INTO registroregalos ( nombres,apellidos,regalo) VALUES ($1, $2, $3) RETURNING *",
    [regalo.nombres, regalo.apellidos, regalo.regalo]
  );
  await pool.query("UPDATE regalos set estado = false where nombre=$1", [
    regalo.regalo,
  ]);
  return result.rows[0];
};

const updateRegalo = async (id) => {
  const result = await pool.query(
    "UPDATE regalos set estado = 0 where id = $1",
    [id]
  );
  return result.rows[0];
};

export const regaloModel = {
  findAll,
  createRegalo,
  updateRegalo,
  findAllRegalos,
};
