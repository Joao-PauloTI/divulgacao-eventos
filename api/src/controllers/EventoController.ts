import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Evento } from "../entity/Evento";

class EventoController {
	static listarEventos = async (req: Request, res: Response) => {
		const eventoRepository = getRepository(Evento);
		const eventos = await eventoRepository.find({
			select: ["id", "nome", "local", "comentario", "likes", "deslikes", "foto"],
		});

		res.send(eventos);
	};

	static buscarEvento = async (req: Request, res: Response) => {
		const id: number = req.params.id;

		const eventoRepository = getRepository(Evento);
		try {
			const evento = await eventoRepository.findOneOrFail(id, {
				select: ["id", "nome", "local", "comentario", "likes", "deslikes", "foto"],
			});
			res.send(evento);
		} catch (error) {
			res.status(404).send("Evento não encontrado!");
		}
	};

	static novoEvento = async (req: Request, res: Response) => {
		let { nome, local, comentario, likes, deslikes, foto } = req.body;
		let evento = new Evento();
		evento.nome = nome;
		evento.local = local;
		evento.comentario = comentario;
		evento.likes = 0;
		evento.deslikes = 0;
		evento.foto = req.file.filename;

		const errors = await validate(evento);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		const eventoRepository = getRepository(Evento);
		try {
			await eventoRepository.save(evento);
		} catch (e) {
			res.status(409).send(e);
			return;
		}

		res.status(201).send("Evento criado!");
	};

	static excluirEvento = async (req: Request, res: Response) => {
		const id = req.params.id;

		const eventoRepository = getRepository(Evento);
		let evento: Evento;
		try {
			evento = await eventoRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send("Evento não encontrado!");
			return;
		}

		eventoRepository.delete(id);

		res.status(204).send("Evento excluído!");
	};

	static acrescentarLike = async (req: Request, res: Response) => {
		const id = req.params.id;

		const eventoRepository = getRepository(Evento);
		let evento: Evento;
		try {
			evento = await eventoRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send("Evento não encontrado!");
			return;
		}

		evento.likes = evento.likes + 1;

		eventoRepository.save(evento);

		res.status(200).send("Like adicionado ao evento!");
	};

	static acrescentarDeslike = async (req: Request, res: Response) => {
		const id = req.params.id;

		const eventoRepository = getRepository(Evento);
		let evento: Evento;
		try {
			evento = await eventoRepository.findOneOrFail(id);
		} catch (error) {
			res.status(404).send("Evento não encontrado!");
			return;
		}

		evento.deslikes = evento.deslikes + 1;

		eventoRepository.save(evento);

		res.status(200).send("Deslike adicionado ao evento!");
	};
}

export default EventoController;
