import React, { Component } from "react";
import axios from "axios";
import spotify from "./images/spotify.png";
import Bubbles from "./bubbles";
import ArtistTable from "./artistTable";
import ItemTable from "./table";

class Home extends Component {
	state = {
		token: "",
		userData: {},
		userImage: "",
		userTop: [],
		userTopArtists: [],
		tracks: false,
		artists: false,
		genres: false,
	};

	componentDidMount = async () => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		// getToken()

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
		this.renderUserTopData(token);
		this.renderUserArtistTopData(token);
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

	renderTopTracks = () => {
		const tracks = !this.state.tracks;
		const artists = false;
		const genres = false;
		this.setState({ tracks, artists, genres });
	};
	renderTopArtists = () => {
		const artists = !this.state.artists;
		const tracks = false;
		const genres = false;
		this.setState({ tracks, artists, genres });
	};
	renderTopGenres = () => {
		const genres = !this.state.genres;
		const artists = false;
		const tracks = false;
		this.setState({ tracks, artists, genres });
	};

	renderUserTopData = async (token) => {
		if (localStorage.getItem("token")) {
			try {
				const { data } = await axios.get(
					`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=100`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const userTop = data.items;
				this.setState({ userTop });
			} catch (err) {
				console.log(err);
			}
		}
	};
	renderUserArtistTopData = async (token) => {
		if (localStorage.getItem("token")) {
			try {
				const { data } = await axios.get(
					`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=100`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const userTopArtists = data.items;
				this.setState({ userTopArtists });
			} catch (err) {
				console.log(err);
			}
		}
	};

	render() {
		const CLIENT_ID = "b58810d40a6d43df8a0ac251a1c75e68";
		const REDIRECT_URI = "http://localhost:3000";
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
								Artists, Genres!
							</h1>
						</div>
					</React.Fragment>
				)}

				{this.state.token ? (
					<React.Fragment>
						<ul className="TopG">
							<li onClick={() => this.renderTopTracks()}>Top Tracks</li>
							<li onClick={() => this.renderTopArtists()}>Top Artists</li>
							<li onClick={() => this.renderTopGenres()}>Top Genres</li>
						</ul>
						{this.state.tracks && <ItemTable userTop={this.state.userTop} />}
						{this.state.artists && (
							<ArtistTable userTop={this.state.userTopArtists} />
						)}
						{/* {this.state.genres && <ItemTable userTop={this.state.userTop} />} */}
					</React.Fragment>
				) : (
					<Bubbles />
				)}

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
