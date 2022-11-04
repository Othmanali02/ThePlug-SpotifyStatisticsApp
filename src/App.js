import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Tracks from "./components/tracks";
import NavBar from "./components/navbar";
import Footer from "./components/footer";

function App() {
	const token = localStorage.getItem("token");

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
				</Switch>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default App;
