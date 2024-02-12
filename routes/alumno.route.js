import { Router } from "express";
import { alumnoController } from "../controllers/alumno.cotroller.js";

const router = Router();
router.get("/", alumnoController.getAlumnos);
router.post("/", alumnoController.createAlumno);
router.delete("/:id", alumnoController.deleteAlumno);

export default router;
// Path: index.js
