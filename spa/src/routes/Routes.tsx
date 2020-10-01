import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "../pages/Login";
import PaginaPrincipal from '../pages/PaginaPrincipal'

function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<Route path="/pagina-principal" exact component={PaginaPrincipal} />
		</Switch>
	);
}

export default Routes;
