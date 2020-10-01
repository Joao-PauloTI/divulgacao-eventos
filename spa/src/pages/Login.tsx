import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

type camposLogin = {
	emailLogin: string;
	senhaLogin: string;
};

type camposNovoUsuario = {
	emailNovo: string;
	nomeNovo: string;
	senhaNovo: string;
};

function Login() {
	const history = useHistory();

	const formLogin = useForm<camposLogin>();
	const login = (dados: camposLogin) => {
		axios
			.post("http://localhost:3333/auth/login", {
				email: dados.emailLogin,
				senha: dados.senhaLogin,
			})
			.then((res) => {
				window.localStorage.setItem("usuario", res.data);
				history.push("/pagina-principal");
			})
			.catch((erro) => {
				alert(erro.response.data);
			});
	};

	const formNovoUsuario = useForm<camposNovoUsuario>();
	const novoUsuario = (dados: camposNovoUsuario) => {
		axios
			.post("http://localhost:3333/usuario/", {
				email: dados.emailNovo,
				nome: dados.nomeNovo,
				senha: dados.senhaNovo,
			})
			.then((res) => {
				alert(res.data);
			})
			.catch((erro) => {
				alert(erro.response.data);
			});
	};

	return (
		<div className="container">
			<div className="card" style={{ marginLeft: "20%", marginRight: "20%", marginTop: "5%" }}>
				<div className="card-header" style={{ textAlign: "center" }}>
					<h4>Divulgação de Eventos</h4>
				</div>
				<div className="card-body" style={{ paddingLeft: "20%", paddingRight: "20%" }}>
					<form onSubmit={formLogin.handleSubmit(login)} id="formLogin">
						<div className="form-group">
							<label htmlFor="emailLogin">E-mail</label>
							<input type="email" id="emailLogin" name="emailLogin" ref={formLogin.register({ required: true })} className="form-control" />
							{formLogin.errors.emailLogin && formLogin.errors.emailLogin.type === "required" && (
								<div style={{ color: "red" }}>
									<small>Por favor, insira um e-mail para prosseguir!</small>
								</div>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="senhaLogin">Senha</label>
							<input type="password" id="senhaLogin" name="senhaLogin" ref={formLogin.register({ required: true })} className="form-control" />
							{formLogin.errors.senhaLogin && formLogin.errors.senhaLogin.type === "required" && (
								<div style={{ color: "red" }}>
									<small>Por favor, insira uma senha para prosseguir!</small>
								</div>
							)}
						</div>
						<div className="form-group" style={{ textAlign: "center" }}>
							<button type="submit" className="btn btn-success">
								Login
							</button>
							<br />
							<button type="button" data-toggle="modal" data-target="#modalNovoUsuario" className="btn btn-link" style={{ marginTop: "5%" }}>
								Não é um usuário? Registre-se aqui!
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="modal fade" id="modalNovoUsuario" tabIndex={-1} role="dialog" aria-labelledby="modalNovoUsuarioLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<form onSubmit={formNovoUsuario.handleSubmit(novoUsuario)} id="formNovoUsuario">
							<div className="modal-header">
								<h4 className="modal-title" id="modalNovoUsuarioLabel">
									Novo Usuário
								</h4>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<label htmlFor="emailNovo">E-mail</label>
									<input type="email" id="emailNovo" name="emailNovo" ref={formNovoUsuario.register({ required: true })} className="form-control" />
									{formNovoUsuario.errors.emailNovo && formNovoUsuario.errors.emailNovo.type === "required" && (
										<div style={{ color: "red" }}>
											<small>Por favor, insira um e-mail para prosseguir!</small>
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="nomeNovo">Nome</label>
									<input type="text" id="nomeNovo" name="nomeNovo" ref={formNovoUsuario.register({ required: true })} className="form-control" />
									{formNovoUsuario.errors.nomeNovo && formNovoUsuario.errors.nomeNovo.type === "required" && (
										<div style={{ color: "red" }}>
											<small>Por favor, insira um nome para prosseguir!</small>
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="senhaNovo">Senha</label>
									<input type="password" id="senhaNovo" name="senhaNovo" ref={formNovoUsuario.register({ required: true })} className="form-control" />
									{formNovoUsuario.errors.senhaNovo && formNovoUsuario.errors.senhaNovo.type === "required" && (
										<div style={{ color: "red" }}>
											<small>Por favor, insira uma senha para prosseguir!</small>
										</div>
									)}
								</div>
							</div>
							<div className="modal-footer">
								<button type="submit" className="btn btn-success">
									Criar Usuário
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
