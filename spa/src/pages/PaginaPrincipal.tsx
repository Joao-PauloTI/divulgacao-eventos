import React, { useEffect } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";

const listaEventos = () => {
	let dadosUsuario = Object;
	dadosUsuario = JSON.parse(window.localStorage.getItem("usuario")!);
	console.log(dadosUsuario);
};

function PaginaPrincipal() {
	useEffect(() => {
		listaEventos();
	}, []);

	return (
		<div className="container">
			<h1>pagina principal</h1>
		</div>
	);
}

export default PaginaPrincipal;
