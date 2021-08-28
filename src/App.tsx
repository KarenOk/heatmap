import React from "react";
import logo from "./logo.jpeg";
import "./App.css";
import HeatMap from "./components/HeatMap";
import ReactTooltip from "react-tooltip";
import Legend from "./components/Legend";

function App() {
	return (
		<div className="app">
			<header className="header">
				<img src={logo} alt="Transaction Map" className="logo" />
				<h1 className="heading">
					Transaction <br /> Map
				</h1>
			</header>
			<main className="main">
				<div className="content">
					<HeatMap />
					<Legend />
				</div>
			</main>
			<ReactTooltip multiline={true} />
		</div>
	);
}

export default App;
