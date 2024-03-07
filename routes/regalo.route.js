import { Router } from "express";
import { regaloController } from "../controllers/regalo.cotroller.js";

const router = Router();
router.get("/", regaloController.getRegalos);
router.post("/", regaloController.createRegalo);
router.get("/list", regaloController.getRegalosList);
//update
router.put("/:id", regaloController.updateRegalo);

export default router;
// Path: index.js
