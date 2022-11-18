import React, { Component } from "react";
import Bubbles from "./bubbles";
import spotify from "./images/spotify.png";

class HomeSpotify extends Component {
	componentDidMount = async () => {
		if (localStorage.getItem("token")) {
			window.location = "/home";
		}
	};
	render() {
		const CLIENT_ID = "b58810d40a6d43df8a0ac251a1c75e68";
		const REDIRECT_URI = "https://theplugforspotify.netlify.app/home";
		// const REDIRECT_URI = "http://localhost:3000/home";
		const scopes = "user-top-read";
		const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
		const RESPONSE_TYPE = "token";

		return (
			<React.Fragment>
				<div className="WRAP">
					<h1 className="homeMsg">
						Authorize your Spotify account to access your Top Tracks and
						Artists!
					</h1>
				</div>
				<Bubbles />
				<a
					className="login"
					href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}
				>
					<h4>
						{" "}
						<img src={spotify} className="loginSpot" /> Login with Spotify
					</h4>
				</a>
			</React.Fragment>
		);
	}
}

export default HomeSpotify;
