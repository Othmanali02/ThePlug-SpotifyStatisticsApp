import React, { Component } from "react";
import axios from "axios";
import spotify from "./images/spotify.png";
import Bubbles from "./bubbles";
import Statistics from "./Statistics";

class Home extends Component {
	state = {
		token: "",
		userData: {},
		userImage: "",
	};

	componentDidMount = async () => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("access_token"))
				.split("=")[1];
			window.location.hash = "";
			window.localStorage.setItem("token", token);
		}
		this.setState({ token });
		this.renderUserData(token);
		if (localStorage.getItem("token")) {
			this.props.handleLogin();
		}
	};

	renderUserData = async (token) => {
		if (localStorage.getItem("token")) {
			try {
				const { data: userData } = await axios.get(
					"https://api.spotify.com/v1/me",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				// this.renderUserPlaylists(token, userData.id);
				const userImage = userData.images[0].url;
				this.setState({ userData, userImage });
			} catch (err) {
				console.log(err);
			}
		}
	};

	handleSpotifyGame = () => {
		window.location = "/game";
	};

	render() {
		const CLIENT_ID = "b58810d40a6d43df8a0ac251a1c75e68";
		const REDIRECT_URI = "https://theplugforspotify.netlify.app";
		const scopes = "user-top-read user-follow-read user-read-recently-played";
		const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
		const RESPONSE_TYPE = "token";

		const logout = () => {
			window.localStorage.removeItem("token");
			window.location = "/";
		};

		return (
			<React.Fragment>
				{this.state.token ? (
					<div className="userInfo">
						<img
							className="profPic"
							src={this.state.userImage}
							alt="Profile pic"
						/>
						<h1>{this.state.userData.display_name}</h1>
					</div>
				) : (
					<React.Fragment>
						<div className="WRAP">
							<h1 className="homeMsg">
								Authorize your Spotify account to access your Top Tracks,
								Artists and Genres!
							</h1>
						</div>
					</React.Fragment>
				)}
				{this.state.token && (
					<React.Fragment>
						<button className="game" onClick={() => this.handleSpotifyGame()}>
							Play the Spotify Game
						</button>{" "}
					</React.Fragment>
				)}
				{this.state.token && <Statistics token={this.state.token} />}{" "}
				{!this.state.token && <Bubbles />}
				{!this.state.token ? (
					<a
						className="login"
						href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}
					>
						<h4>
							{" "}
							<img src={spotify} className="loginSpot" /> Login with Spotify
						</h4>
					</a>
				) : (
					<button className="logout" onClick={logout}>
						Logout
					</button>
				)}
			</React.Fragment>
		);
	}
}

export default Home;
