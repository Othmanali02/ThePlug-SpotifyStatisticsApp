import React, { Component } from "react";
import axios from "axios";
import Question from "./Question";

class Game extends Component {
	state = {
		token: "",
		topArtistTracks: [{ artist: "", name: "", index: "", albumCover: "" }],
		weirdPerson: false,
		topArtists: [{ artist: "", index: "", pic: "" }],
		sixMonthsTracks: [{ name: "", index: "", albumCover: "" }],
		thisMonthTracks: [{ name: "", index: "", albumCover: "" }],
	};

	componentDidMount = async () => {
		let token = localStorage.getItem("token");
		this.props.handleLogin();
		this.setState({ token });
		this.handleTopArtistTracks(token);
		this.handleLastMonthTopArtist(token);
		this.handleLastSixMonthsTrack(token);
		this.handleLastMonthTopTrack(token);
	};

	handleLastMonthTopArtist = async (token) => {
		if (localStorage.getItem("token")) {
			try {
				const { data } = await axios.get(
					`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const topArtists = [];

				for (let i = 0; i < data.items.length; i++) {
					topArtists.push({
						artist: data.items[i].name,
						index: i + 1,
						pic: data.items[i].images[0].url,
					});
				}

				this.setState({ topArtists });
			} catch (err) {
				console.log(err);
			}
		}
	};

	handleTopArtistTracks = async (token) => {
		if (localStorage.getItem("token")) {
			try {
				const { data } = await axios.get(
					`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=100`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const { data: artists } = await axios.get(
					`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				let topArtistTracks = [];

				for (let i = 0; i < data.items.length; i++) {
					if (artists.items[0].name === data.items[i].artists[0].name) {
						topArtistTracks.push({
							artist: artists.items[0].name,
							name: data.items[i].name,
							index: i + 1,
							albumCover: data.items[i].album.images[0].url,
						});
					}
				}

				let weirdPerson = false;

				if (topArtistTracks.length < 2) {
					topArtistTracks = [];
					let moreThan3 = [];
					let moreThan2 = [];

					for (let i = 0; i < data.items.length; i++) {
						let newArtistArray = [];
						for (let j = 0; j < artists.items.length; j++) {
							if (artists.items[i].name === data.items[j].artists[0].name) {
								newArtistArray.push({
									artist: artists.items[i].name,
									name: data.items[j].name,
									index: j + 1,
									albumCover: data.items[j].album.images[0].url,
								});
							}
						}

						if (newArtistArray.length > 3) {
							moreThan3 = newArtistArray;
						}
						if (newArtistArray.length > 2) {
							moreThan2 = newArtistArray;
						}

						if (moreThan3.length > moreThan2.length) {
							topArtistTracks = moreThan3;
						} else if (moreThan2.length > moreThan3.length) {
							topArtistTracks = moreThan2;
						} else if (moreThan2.length < 2 && moreThan3.length < 2) {
							for (let i = 0; i < data.items.length; i++) {
								topArtistTracks.push({
									artist: artists.items[i].name,
									name: data.items[i].name,
									index: i + 1,
									albumCover: data.items[i].album.images[0].url,
								});
							}
							weirdPerson = true;
						}
					}
				}

				this.setState({ topArtistTracks, weirdPerson });
			} catch (err) {
				console.log(err);
				// if (localStorage.getItem("token")) {
				// 	if (err.response.status === 401) {
				// 		// localStorage.removeItem("token");
				// 		// this.refreshToken();
				// 	} else if (err.response.status === 403) {
				// 		// localStorage.removeItem("token");
				// 		// window.location = "/";
				// 	}
				// }
			}
		}
	};

	refreshToken = () => {
		const CLIENT_ID = "b58810d40a6d43df8a0ac251a1c75e68";
		// const REDIRECT_URI = "https://theplugforspotify.netlify.app";
		const REDIRECT_URI = "http://localhost:3000";
		const scopes = "user-top-read user-follow-read user-read-recently-played";
		const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
		const RESPONSE_TYPE = "token";
		window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`;
	};

	handleLastSixMonthsTrack = async (token) => {
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

				let sixMonthsTracks = [];
				for (let i = 0; i < data.items.length; i++) {
					sixMonthsTracks.push({
						name: data.items[i].name,
						index: i + 1,
						albumCover: data.items[i].album.images[0].url,
					});
				}
				this.setState({ sixMonthsTracks });
			} catch (err) {
				console.log(err);
			}
		}
	};

	handleLastMonthTopTrack = async (token) => {
		if (localStorage.getItem("token")) {
			try {
				const { data } = await axios.get(
					`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=100`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				let thisMonthTracks = [];
				for (let i = 0; i < data.items.length; i++) {
					thisMonthTracks.push({
						name: data.items[i].name,
						index: i + 1,
						albumCover: data.items[i].album.images[0].url,
					});
				}
				this.setState({ thisMonthTracks });
			} catch (err) {
				console.log(err);
			}
		}
	};

	render() {
		return (
			<React.Fragment>
				<div className="headGame">
					{" "}
					{this.state.topArtistTracks && (
						<Question
							sixMonthsQuestionData={this.state.sixMonthsTracks}
							artistQuestionData={this.state.topArtists}
							weirdPerson={this.state.weirdPerson}
							questionData={this.state.topArtistTracks}
							lastMonthQuestionData={this.state.thisMonthTracks}
						/>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default Game;
