import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Privacy from "./components/privacy";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Scores from "./components/scores";
import Game from "./components/game";
import HomeSpotify from "./components/homeSpotify";

function App() {
	const handleLogin = () => {
		var element = document.querySelector(".App");
		element.classList.add("logged-in");
	};

	const getScore = () => {
		let score = 0;
		if (localStorage.getItem("score")) {
			score = localStorage.getItem("score");
		}
		return score;
	};

	return (
		<React.Fragment>
			<NavBar />
			<div className="App">
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => (
							<HomeSpotify {...props} handleLogin={handleLogin} />
						)}
					/>
					<Route
						exact
						path="/home"
						render={(props) => <Home {...props} handleLogin={handleLogin} />}
					/>
					<Route
						exact
						path="/privacy"
						render={(props) => <Privacy {...props} handleLogin={handleLogin} />}
					/>
					<Route
						exact
						path="/scores"
						render={(props) => (
							<Scores {...props} score={getScore} handleLogin={handleLogin} />
						)}
					/>
					<Route
						exact
						path="/game"
						render={(props) => <Game {...props} handleLogin={handleLogin} />}
					/>
				</Switch>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default App;
