import { Router } from "express";
import * as multer from "multer";
import EventoController from "../controllers/EventoController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads");
	},
	filename: (req, file, cb) => {
		var filetype = "";
		if (file.mimetype === "image/gif") {
			filetype = "gif";
		}
		if (file.mimetype === "image/png") {
			filetype = "png";
		}
		if (file.mimetype === "image/jpeg") {
			filetype = "jpg";
		}
		cb(null, "imagem-evento_" + Date.now() + "." + filetype);
	},
});

var upload = multer({ storage: storage });

router.post("/", upload.single("foto"), EventoController.novoEvento);

router.get("/", EventoController.listarEventos);

router.get("/:id([0-9]+)", EventoController.buscarEvento);

router.delete("/:id([0-9]+)", EventoController.excluirEvento);

router.get("/like/:id([0-9]+)", EventoController.acrescentarLike);

router.get("/deslike/:id([0-9]+)", EventoController.acrescentarDeslike);

export default router;
