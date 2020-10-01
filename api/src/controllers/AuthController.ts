import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Usuario } from "../entity/Usuario";
import config from "../config/config";

class AuthController {
	static login = async (req: Request, res: Response) => {
		let { email, senha } = req.body;
		if (!(email && senha)) {
			res.status(400).send();
		}

		const usuarioRepository = getRepository(Usuario);
		let usuario: Usuario;
		try {
			usuario = await usuarioRepository.findOneOrFail({ where: { email } });
		} catch (error) {
			res.status(401).send("Usuário não encontrado!");
			return;
		}

		if (!usuario.senhaDescriptografadaEValida(senha)) {
			res.status(401).send("Senha Invalida!");
			return;
		}

		const token = jwt.sign({ usuarioId: usuario.id, email: usuario.email }, config.jwtSecret, { expiresIn: "1h" });

		res.setHeader("token", token);

		res.send({ email: usuario.email, nome: usuario.nome, token: token });
	};
}
export default AuthController;
