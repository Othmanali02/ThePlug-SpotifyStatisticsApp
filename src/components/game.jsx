import React, { Component } from "react";
import axios from "axios";
import Question from "./Question";

class Game extends Component {
	state = {
		token: "",
		topArtistTracks: [{ artist: "", name: "", index: "", albumCover: "" }],
		topArtists: [],
		sixMonthsTracks: [],
		allTimeTracks: [],
	};

	componentDidMount = async () => {
		if (localStorage.getItem("token")) {
			const token = localStorage.getItem("token");
			this.props.handleLogin();
			this.setState({ token });
			this.handleTopArtistTracks(token);
		}
	};

	renderNextQuestion = () => {
		alert("ZAZA");
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
				const topArtists = data.items;

				this.setState({ topArtists });
				return topArtists;
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
					if (artists.items[0].name == data.items[i].artists[0].name) {
						topArtistTracks.push({
							artist: artists.items[0].name,
							name: data.items[i].name,
							index: i + 1,
							albumCover: data.items[i].album.images[0].url,
						});
					}
				}
				this.setState({ topArtistTracks });
			} catch (err) {
				console.log(err);
			}
		}
	};

	handleLastSixMonthsTrack = async (token) => {
		console.log("eh");
	};

	handleAllTimeTopTrack = async (token) => {
		console.log("eh");
	};

	render() {
		return (
			<React.Fragment>
				<div className="headGame">
					{" "}
					<Question questionData={this.state.topArtistTracks} />
				</div>
			</React.Fragment>
		);
	}
}

export default Game;
