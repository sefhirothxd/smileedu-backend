import { regaloModel } from "../models/regalo.model.js";

const getRegalos = async (req, res) => {
  try {
    const response = await regaloModel.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
const getRegalosList = async (req, res) => {
  try {
    const response = await regaloModel.findAllRegalos();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const createRegalo = async (req, res) => {
  try {
    const response = await regaloModel.createRegalo(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const deleteRegalo = async (req, res) => {
  try {
    const response = await regaloModel.deleteRegalo(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const regaloController = {
  getRegalos,
  createRegalo,
  getRegalosList,
};
// Path: routes/Regalo.routes.js
