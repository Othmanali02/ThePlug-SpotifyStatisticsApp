import React, { Component } from "react";
import axios from "axios";
import Statistics from "./Statistics";
import { Link } from "react-router-dom";

class Home extends Component {
	state = {
		token: "",
		userData: {},
		userImage: "",
	};

	componentDidMount = async () => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		if (hash) {
			token = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("access_token"))
				.split("=")[1];
			window.location.hash = "";
		}
		this.setState({ token });
		localStorage.setItem("token", token);
		this.renderUserData(token);
		this.props.handleLogin();
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
				console.log(err.response.status);
				if (err.response.status === 401) {
					this.refreshToken();
				} else if (err.response.status === 403) {
					// localStorage.clear();
					// window.location = "/";
				}
			}
		}
	};

	refreshToken = () => {
		localStorage.clear();
		const CLIENT_ID = "b58810d40a6d43df8a0ac251a1c75e68";
		const REDIRECT_URI = "https://theplugforspotify.netlify.app/home";
		// const REDIRECT_URI = "http://localhost:3000/home";
		const scopes = "user-top-read";
		const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
		const RESPONSE_TYPE = "token";
		window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`;
	};

	render() {
		const logout = () => {
			window.localStorage.removeItem("token");
			window.location = "/";
		};

		return (
			<React.Fragment>
				<div className="userInfo">
					<img
						className="profPic"
						src={this.state.userImage}
						alt="Profile pic"
					/>
					<h1>{this.state.userData.display_name}</h1>
				</div>
				<React.Fragment>
					<Link className="game" to="/game">
						Play a game based on your listening activity
					</Link>{" "}
				</React.Fragment>
				{this.state.token && <Statistics token={this.state.token} />}
				<button className="logout" onClick={logout}>
					Logout
				</button>
			</React.Fragment>
		);
	}
}

export default Home;
