import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Privacy from "./components/privacy";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Game from "./components/game";

function App() {
	const handleLogin = () => {
		var element = document.querySelector(".App");
		element.classList.add("logged-in");
	};

	return (
		<React.Fragment>
			<NavBar />
			<div className="App">
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => <Home {...props} handleLogin={handleLogin} />}
					/>
					<Route
						exact
						path="/privacy"
						render={(props) => <Privacy {...props} handleLogin={handleLogin} />}
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
