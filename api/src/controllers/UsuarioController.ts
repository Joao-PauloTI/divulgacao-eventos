import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Usuario } from "../entity/Usuario";

class UsuarioController {
	static listarUsuarios = async (req: Request, res: Response) => {
		const usuarioRepository = getRepository(Usuario);
		const usuarios = await usuarioRepository.find({
			select: ["id", "email", "nome"],
		});

		res.send(usuarios);
	};

	static buscarUsuario = async (req: Request, res: Response) => {
		const id: number = req.params.id;

		const usuarioRepository = getRepository(Usuario);
		try {
			const usuario = await usuarioRepository.findOneOrFail(id, {
				select: ["id", "email", "nome"],
			});
			res.send(usuario);
		} catch (error) {
			res.status(404).send("Usuario não encontrado!");
		}
	};

	static novoUsuario = async (req: Request, res: Response) => {
		let { email, nome, senha } = req.body;
		let usuario = new Usuario();
		usuario.email = email;
		usuario.nome = nome;
		usuario.senha = senha;

		const errors = await validate(usuario);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		usuario.hashSenha();

		const usuarioRepository = getRepository(Usuario);
		try {
			await usuarioRepository.save(usuario);
		} catch (e) {
			res.status(409).send("Este email ja está sendo utilizado!");
			return;
		}

		res.send("Usuario criado com sucesso!");
	};
}

export default UsuarioController;
