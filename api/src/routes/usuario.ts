import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.post("/", UsuarioController.novoUsuario);

router.get("/", UsuarioController.listarUsuarios);

router.get("/:id([0-9]+)", UsuarioController.buscarUsuario);

router.delete("/:id([0-9]+)", UsuarioController.excluirUsuario);

export default router;
