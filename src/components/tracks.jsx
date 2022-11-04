import axios from "axios";
import React, { Component } from "react";

class Tracks extends Component {
	state = { lastMonth: [], sixMonths: [], allTime: [] };

	componentDidMount = async () => {
		const { data: lastMonth } = await axios.get("", {
			headers: `Beared ${this.props.token}`,
		});

		const { data: sixMonths } = await axios.get("", {
			headers: `Beared ${this.props.token}`,
		});

		const { data: allTime } = await axios.get("", {
			headers: `Beared ${this.props.token}`,
		});

		this.setState({ lastMonth, sixMonths, allTime });
	};
	render() {
		!this.props.token && (window.location = "/");

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

				<ul className="TopG">
					<li onClick={() => this.renderTopTracks()}>Top Tracks</li>
					<li onClick={() => this.renderTopArtists()}>Top Artists</li>
					<li onClick={() => this.renderTopGenres()}>Top Genres</li>
				</ul>

				{/* <ItemTable userTop={this.state.userTop} /> */}
			</React.Fragment>
		);
	}
}

export default Tracks;
