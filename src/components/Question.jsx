import React, { Component } from "react";
import album from "./images/album.jpg";
import next from "./images/next.png";

class Question extends Component {
	state = { renderedSongs: [], artist: "" };

	componentDidMount = () => {
		const tracks = this.props.questionData;
		let renderedSongs = [];
		const artist = tracks[0].artist;
		for (let i = 0; i < tracks.length; i++) {
			renderedSongs.push(tracks[Math.floor(Math.random() * tracks.length)]);
			if (i == 3) {
				break;
			}
		}
		this.setState({ renderedSongs, artist });
	};

	checkRight = (index, name) => {
		let tracks = this.state.renderedSongs;

		var lowest = Number.POSITIVE_INFINITY;
		var tmp;
		for (var i = tracks.length - 1; i >= 0; i--) {
			tmp = tracks[i].index;
			if (tmp < lowest) lowest = tmp;
		}

		if (index == lowest) {
			const song = document.getElementById(name);
			song.classList.add("correct");
			const confet = document.querySelector(".Options");
			confet.classList.add("active");
		} else {
			const song = document.getElementById(name);
			song.classList.add("wrong");
		}
	};

	render() {
		return (
			<div className="Question">
				<h3>
					Since you love {this.state.artist} so much... Which song did you
					listen to the most, like since you clicked on their Spotify account?
				</h3>
				<div className="Options">
					{console.log(this.state.renderedSongs)}
					{this.state.renderedSongs &&
						this.state.renderedSongs.map((song) => (
							<React.Fragment>
								{console.log(song)}{" "}
								<div
									onClick={() => this.checkRight(song.index, song.name)}
									key={song.index}
									id={song.name}
									className="songGame"
								>
									<img src={song.albumCover} className="AlbumCover" />
									<h6>{song.name}</h6>
								</div>
							</React.Fragment>
						))}
				</div>
				<button
					className="nextQuestion"
					onClick={() => {
						this.componentDidMount();
					}}
				>
					Continue to the next Question <img src={next} className="nextIcon" />
				</button>{" "}
			</div>
		);
	}
}

export default Question;
