import { pool } from "../database/connection.js";

const findAll = async () => {
  const result = await pool.query("SELECT * FROM persona");
  return result.rows;
};

const createAlumno = async (alumno) => {
  const result = await pool.query(
    "INSERT INTO persona ( nom_persona,ape_pate_pers,ape_mate_pers,nid_grado,fecha_naci,foto_ruta) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      alumno.nom_persona,
      alumno.ape_pate_pers,
      alumno.ape_mate_pers,
      alumno.nid_grado,
      alumno.fecha_naci,
      alumno.foto_ruta,
    ]
  );
  return result.rows[0];
};

const deleteAlumno = async (nid_persona) => {
  const result = await pool.query(
    "DELETE FROM persona WHERE nid_persona = $1",
    [nid_persona]
  );
  return result.rows[0];
};

export const alumnoModel = {
  findAll,
  createAlumno,
  deleteAlumno,
};
