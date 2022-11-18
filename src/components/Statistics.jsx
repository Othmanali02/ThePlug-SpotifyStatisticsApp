import React, { Component } from "react";
import axios from "axios";
import ArtistTable from "./artistTable";
import ItemTable from "./table";
import TimeRanges from "./timePeriods";

class Statistics extends Component {
	state = {
		userTop: [],
		userTopArtists: [],
		tracks: false,
		artists: false,
		// genres: false,
		lastMonth: true,
		sixMonths: false,
		allTime: false,
	};

	componentDidMount = async () => {
		this.handleLastMonth(this.props.token);
		this.handleLastMonthArtists(this.props.token);
	};

	renderTopTracks = () => {
		const tracks = !this.state.tracks;
		const artists = false;
		// const genres = false;
		const element = document.querySelector(".listTrack");
		const element1 = document.querySelector(".listArt");
		// const element2 = document.querySelector(".listGenre");

		if (tracks) {
			element.classList.add("active");
			element1.className = "listArt";
			// element2.className = "listGenre";
		} else {
			element.className = "listTrack";
		}
		this.setState({ tracks, artists }); //genres
	};

	renderTopArtists = () => {
		const artists = !this.state.artists;
		const tracks = false;
		// const genres = false;
		const element = document.querySelector(".listArt");
		const element1 = document.querySelector(".listTrack");
		// const element2 = document.querySelector(".listGenre");

		if (artists) {
			element.classList.add("active");
			element1.className = "listTrack";
			// element2.className = "listGenre";
		} else {
			element.className = "listArt";
		}
		this.setState({ tracks, artists }); //genre
	};

	renderTopGenres = () => {
		const genres = !this.state.genres;
		const artists = false;
		const tracks = false;
		const element3 = document.querySelector(".listArt");
		const element1 = document.querySelector(".listTrack");
		const element2 = document.querySelector(".listGenre");
		if (genres) {
			element2.classList.add("active");
			element1.className = "listTrack";
			element3.className = "listArt";
		} else {
			element2.className = "listGenre";
		}
		this.setState({ tracks, artists, genres });
	}; //for when i make genres

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
				const lastMonth = false;
				const sixMonths = true;
				const allTime = false;

				this.setState({ userTopArtists, lastMonth, sixMonths, allTime });
			} catch (err) {
				console.log(err);
			}
		}
	};

	handleLastMonthArtists = async (token) => {
		if (localStorage.getItem("token")) {
			try {
				const { data } = await axios.get(
					`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=100`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const userTopArtists = data.items;

				const lastMonth = true;
				const sixMonths = false;
				const allTime = false;

				this.setState({ userTopArtists, lastMonth, sixMonths, allTime });
			} catch (err) {
				console.log(err);
			}
		}
	};

	handleAllTimeArtists = async (token) => {
		if (localStorage.getItem("token")) {
			try {
				const { data } = await axios.get(
					`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=100`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const userTopArtists = data.items;

				const lastMonth = false;
				const sixMonths = false;
				const allTime = true;

				this.setState({ userTopArtists, lastMonth, sixMonths, allTime });
			} catch (err) {
				console.log(err);
			}
		}
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
				const lastMonth = false;
				const sixMonths = true;
				const allTime = false;
				this.setState({ userTop, lastMonth, sixMonths, allTime });
			} catch (err) {
				console.log(err);
			}
		}
	};

	handleLastMonth = async (token) => {
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
				const userTop = data.items;
				const lastMonth = true;
				const sixMonths = false;
				const allTime = false;
				this.setState({ userTop, lastMonth, sixMonths, allTime });
			} catch (err) {
				console.log(err);
			}
		}
	};

	handleAllTime = async (token) => {
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
				const userTop = data.items;
				const lastMonth = false;
				const sixMonths = false;
				const allTime = true;
				this.setState({ userTop, lastMonth, sixMonths, allTime });
			} catch (err) {
				console.log(err);
			}
		}
	};
	render() {
		return (
			<React.Fragment>
				<ul className="TopG">
					<li className="listTrack" onClick={() => this.renderTopTracks()}>
						Top Tracks
					</li>
					<li className="listArt" onClick={() => this.renderTopArtists()}>
						Top Artists
					</li>
					{/* <li className="listGenre" onClick={() => this.renderTopGenres()}>
						Top Genres
					</li> */}
				</ul>
				{this.state.tracks && (
					<React.Fragment>
						<TimeRanges
							token={this.props.token}
							lastMonth={this.state.lastMonth}
							sixMonths={this.state.sixMonths}
							allTime={this.state.allTime}
							handleAllTime={() => this.handleAllTime(this.props.token)}
							handleAllTimeArtists={() =>
								this.handleAllTimeArtists(this.props.token)
							}
							handleLastMonth={() => this.handleLastMonth(this.props.token)}
							handleLastMonthArtists={() =>
								this.handleLastMonthArtists(this.props.token)
							}
							renderUserTopData={() => this.renderUserTopData(this.props.token)}
							renderUserArtistTopData={() =>
								this.renderUserArtistTopData(this.props.token)
							}
						/>
						<ItemTable userTop={this.state.userTop} />{" "}
					</React.Fragment>
				)}
				{this.state.artists && (
					<React.Fragment>
						<TimeRanges
							token={this.state.token}
							lastMonth={this.state.lastMonth}
							sixMonths={this.state.sixMonths}
							allTime={this.state.allTime}
							handleAllTime={() => this.handleAllTime(this.props.token)}
							handleAllTimeArtists={() =>
								this.handleAllTimeArtists(this.props.token)
							}
							handleLastMonth={() => this.handleLastMonth(this.props.token)}
							handleLastMonthArtists={() =>
								this.handleLastMonthArtists(this.props.token)
							}
							renderUserTopData={() => this.renderUserTopData(this.props.token)}
							renderUserArtistTopData={() =>
								this.renderUserArtistTopData(this.props.token)
							}
						/>
						<ArtistTable userTop={this.state.userTopArtists} />
					</React.Fragment>
				)}
				{/* {this.state.genres && <ItemTable userTop={this.state.userTop} />} */}
			</React.Fragment>
		);
	}
}

export default Statistics;
