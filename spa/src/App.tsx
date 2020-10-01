import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</div>
	);
}

export default App;
