import React from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
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
		Axios.post("http://localhost:3333/auth/login", {
			email: dados.emailLogin,
			senha: dados.senhaLogin,
		})
			.then((res) => {
				window.localStorage.setItem("usuario", JSON.stringify(res.data));
				history.push("/pagina-principal");
			})
			.catch((erro) => {
				alert(erro.response.data);
			});
	};

	const formNovoUsuario = useForm<camposNovoUsuario>();
	const novoUsuario = (dados: camposNovoUsuario) => {
		Axios.post("http://localhost:3333/usuario/", {
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
			<div className="card text-white bg-dark" style={{ marginLeft: "20%", marginRight: "20%", marginTop: "5%" }}>
				<div className="card-header" style={{ textAlign: "center" }}>
					<h4 style={{ color: "#3ffdfd", textShadow: "0 0 black" }}>
						<strong>Divulgação de Eventos</strong>
					</h4>
				</div>
				<div className="card-body" style={{ paddingLeft: "20%", paddingRight: "20%" }}>
					<form onSubmit={formLogin.handleSubmit(login)} id="formLogin">
						<div className="form-group">
							<label htmlFor="emailLogin">
								<i className="fas fa-envelope" /> E-mail
							</label>
							<input type="email" id="emailLogin" name="emailLogin" ref={formLogin.register({ required: true })} className="form-control text-white bg-dark" />
							{formLogin.errors.emailLogin && formLogin.errors.emailLogin.type === "required" && (
								<div style={{ color: "#ff78e8" }}>
									<small>Por favor, insira um e-mail para prosseguir!</small>
								</div>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="senhaLogin">
								<i className="fas fa-lock" /> Senha
							</label>
							<input type="password" id="senhaLogin" name="senhaLogin" ref={formLogin.register({ required: true })} className="form-control text-white bg-dark" />
							{formLogin.errors.senhaLogin && formLogin.errors.senhaLogin.type === "required" && (
								<div style={{ color: "#ff78e8" }}>
									<small>Por favor, insira uma senha para prosseguir!</small>
								</div>
							)}
						</div>
						<div className="form-group" style={{ textAlign: "center" }}>
							<button type="submit" className="btn btn-success">
								<i className="fas fa-sign-in-alt" /> Login
							</button>
							<br />
							<button type="button" data-toggle="modal" data-target="#modalNovoUsuario" className="btn btn-link" style={{ marginTop: "5%", color: "deepskyblue" }}>
								<i className="fas fa-user-plus" /> Não é um usuário? Registre-se aqui!
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="modal fade" id="modalNovoUsuario" tabIndex={-1} role="dialog" aria-labelledby="modalNovoUsuarioLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content text-white bg-dark">
						<form onSubmit={formNovoUsuario.handleSubmit(novoUsuario)} id="formNovoUsuario">
							<div className="modal-header">
								<h4 className="modal-title" id="modalNovoUsuarioLabel">
									Novo Usuário
								</h4>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ color: "white" }}>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<label htmlFor="emailNovo">
										<i className="fas fa-envelope" /> E-mail
									</label>
									<input type="email" id="emailNovo" name="emailNovo" ref={formNovoUsuario.register({ required: true })} className="form-control text-white bg-dark" />
									{formNovoUsuario.errors.emailNovo && formNovoUsuario.errors.emailNovo.type === "required" && (
										<div style={{ color: "#ff78e8" }}>
											<small>Por favor, insira um e-mail para prosseguir!</small>
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="nomeNovo">
										<i className="fas fa-user" /> Nome
									</label>
									<input type="text" id="nomeNovo" name="nomeNovo" ref={formNovoUsuario.register({ required: true })} className="form-control text-white bg-dark" />
									{formNovoUsuario.errors.nomeNovo && formNovoUsuario.errors.nomeNovo.type === "required" && (
										<div style={{ color: "#ff78e8" }}>
											<small>Por favor, insira um nome para prosseguir!</small>
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="senhaNovo">
										<i className="fas fa-lock" /> Senha
									</label>
									<input type="password" id="senhaNovo" name="senhaNovo" ref={formNovoUsuario.register({ required: true })} className="form-control text-white bg-dark" />
									{formNovoUsuario.errors.senhaNovo && formNovoUsuario.errors.senhaNovo.type === "required" && (
										<div style={{ color: "#ff78e8" }}>
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
