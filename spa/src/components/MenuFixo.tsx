import React from "react";

export default function MenuFixo() {
	let dadosUsuario = JSON.parse(window.localStorage.getItem("usuario")!);

	return (
		<div>
			<nav className="navbar fixed-top navbar-dark bg-dark" style={{ borderBottom: "1px solid white" }}>
				<div className="container">
					<a className="navbar-brand" href="/pagina-principal">
						<h4 style={{ color: "#3ffdfd", textShadow: "0 0 black" }}>
							<strong>Divulgação de Eventos</strong>
						</h4>
					</a>
					<ul className="nav navbar-pills">
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" style={{ color: "#3ffdfd", textShadow: "0 0 black" }}>
								<i className="fas fa-user" /> {dadosUsuario.nome}
							</a>
							<div className="dropdown-menu bg-dark">
								<a className="dropdown-item text-white" href="/">
									<i className="fas fa-door-open" /> Sair
								</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}
