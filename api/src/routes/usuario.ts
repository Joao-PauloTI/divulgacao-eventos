import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.get("/", UsuarioController.listarUsuarios);

router.get("/:id([0-9]+)", UsuarioController.buscarUsuario);

router.post("/", UsuarioController.novoUsuario);

export default router;
