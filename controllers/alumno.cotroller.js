import { alumnoModel } from "../models/alumno.model.js";

const getAlumnos = async (req, res) => {
  try {
    const response = await alumnoModel.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const createAlumno = async (req, res) => {
  try {
    const response = await alumnoModel.createAlumno(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const deleteAlumno = async (req, res) => {
  try {
    const response = await alumnoModel.deleteAlumno(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const alumnoController = {
  getAlumnos,
  createAlumno,
  deleteAlumno,
};
// Path: routes/alumno.routes.js
