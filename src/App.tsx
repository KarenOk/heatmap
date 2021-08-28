import React from "react";
import logo from "./logo.jpeg";
import "./App.css";
import HeatMap from "./components/HeatMap";
import ReactTooltip from "react-tooltip";

function App() {
	return (
		<div className="app">
			<header className="header">
				<img src={logo} alt="Transaction Map" className="logo" />
				<h1 className="heading">
					Transaction <br /> Map
				</h1>
			</header>
			<main className="content">
				<HeatMap />
			</main>
			<ReactTooltip multiline={true} />
		</div>
	);
}

export default App;
