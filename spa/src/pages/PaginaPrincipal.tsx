import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import MenuFixo from "../components/MenuFixo";
import { useHistory } from "react-router-dom";

type camposNovoEvento = {
	nome: string;
	local: string;
	comentario: string;
	foto: any;
};

export default function PaginaPrincipal() {
	const history = useHistory();
	if (!window.localStorage.getItem("usuario")) {
		history.push("/");
	}

	const dadosUsuario = JSON.parse(window.localStorage.getItem("usuario")!);

	const [eventos, setEventos] = useState([]);

	const formNovoEvento = useForm<camposNovoEvento>();
	const novoEvento = (dados: camposNovoEvento) => {
		Axios.post(
			"http://localhost:3333/evento/",
			{
				emailUsuario: dadosUsuario.email,
				nome: dados.nome,
				local: dados.local,
				comentario: dados.comentario,
				foto: dados.foto[0],
			},
			{ headers: { token: dadosUsuario.token } }
		)
			.then((res) => {
				alert(res.data);
			})
			.catch((erro) => {
				alert(erro.response.data);
			});
	};

	useEffect(() => {
		Axios.get("http://localhost:3333/evento", { headers: { token: dadosUsuario.token } }).then((response) => {
			setEventos(response.data);
		});
	}, []);

	return (
		<div>
			<MenuFixo />
			<div className="container" style={{ marginTop: "6%", marginBottom: "2%" }}>
				<button type="button" data-toggle="modal" data-target="#modalNovoEvento" className="btn btn-primary" style={{ float: "right" }}>
					<i className="fas fa-plus" /> Criar Novo Evento
				</button>
				<br />
				<br />
				<div className="row">
					{eventos.map((evento: any) => {
						let botaoExcluir = null;
						if (evento.emailUsuario == dadosUsuario.email) {
							botaoExcluir = (
								<button type="button" className="btn btn-danger" style={{ float: "right" }}>
									<i className="fas fa-trash" /> Excluir
								</button>
							);
						}
						return (
							<div className="col-md-4" key={evento.id}>
								<div id={`evento-${evento.id}`} className="card text-white bg-dark" style={{ width: "100%", height: "100%", borderColor: "#b5b5b5" }}>
									<img className="card-img-top" src={`http://localhost:3333/uploads/${evento.foto}`} style={{ height: "50%" }} />
									<div className="card-body">
										<div className="card-title">
											<h5>
												<strong>{evento.nome}</strong>
											</h5>
										</div>
										<p>
											<span className="text-muted">Local</span>
											<br />
											{evento.local}
										</p>
										<p>
											<span className="text-muted">Comentário</span>
											<br />
											{evento.comentario}
										</p>
									</div>
									<div className="card-footer text-muted">
										<span>
											<i className="fas fa-thumbs-up" /> {evento.likes} | <i className="fas fa-thumbs-down" /> {evento.deslikes}
										</span>
										{botaoExcluir}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="modal fade" id="modalNovoEvento" tabIndex={-1} role="dialog" aria-labelledby="modalNovoEventoLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content text-white bg-dark">
						<form onSubmit={formNovoEvento.handleSubmit(novoEvento)} id="formNovoEvento" encType="multipart/form-data">
							<div className="modal-header">
								<h4 className="modal-title" id="modalNovoEventoLabel">
									Novo Evento
								</h4>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ color: "white" }}>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<label htmlFor="nome">
										<i className="fas fa-font" /> Nome
									</label>
									<input type="text" id="nome" name="nome" ref={formNovoEvento.register({ required: true })} className="form-control text-white bg-dark" />
									{formNovoEvento.errors.nome && formNovoEvento.errors.nome.type === "required" && (
										<div style={{ color: "#ff78e8" }}>
											<small>Por favor, insira o nome do evento para prosseguir!</small>
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="local">
										<i className="fas fa-map-marker" /> Local
									</label>
									<input type="text" id="local" name="local" ref={formNovoEvento.register({ required: true })} className="form-control text-white bg-dark" />
									{formNovoEvento.errors.local && formNovoEvento.errors.local.type === "required" && (
										<div style={{ color: "#ff78e8" }}>
											<small>Por favor, insira o local do evento para prosseguir!</small>
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="comentario">
										<i className="fas fa-comment-alt" /> Comentário
									</label>
									<input type="text" id="comentario" name="comentario" ref={formNovoEvento.register({ required: true })} className="form-control text-white bg-dark" />
									{formNovoEvento.errors.comentario && formNovoEvento.errors.comentario.type === "required" && (
										<div style={{ color: "#ff78e8" }}>
											<small>Por favor, insira um comentário sobre o evento para prosseguir!</small>
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="foto">
										<i className="fas fa-images" /> Foto
									</label>
									<br />
									<input type="file" id="foto" name="foto" ref={formNovoEvento.register({ required: true })} />
									{formNovoEvento.errors.foto && formNovoEvento.errors.foto.type === "required" && (
										<div style={{ color: "#ff78e8" }}>
											<small>Por favor, insira uma foto do evento para prosseguir!</small>
										</div>
									)}
								</div>
							</div>
							<div className="modal-footer">
								<button type="submit" className="btn btn-success">
									<i className="fas fa-plus-circle" /> Criar Evento
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
