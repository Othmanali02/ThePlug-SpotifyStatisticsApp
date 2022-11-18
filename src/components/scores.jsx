import React, { Component } from "react";
import wellDone from "./images/wellDone.gif";
import good from "./images/good.gif";
import great from "./images/great.gif";
import notbad from "./images/notbad.gif";
import laugh from "./images/laugh.gif";

class Scores extends Component {
	state = {
		score: 0,
		renderedSongs: [],
		topArtists: [],
		sixMonthsTracks: [],
		thisMonthTracks: [],
	};
	componentDidMount = () => {
		const renderedSongs = JSON.parse(
			sessionStorage.getItem("topArtistSongQuestion")
		);
		const TopArtists = JSON.parse(sessionStorage.getItem("topArtists"));
		const sixMonthsTracks = JSON.parse(
			sessionStorage.getItem("sixMonthTracks")
		);
		const thisMonthTracks = JSON.parse(
			sessionStorage.getItem("thisMonthTracks")
		);

		this.props.handleLogin();
		const score = this.props.score();
		this.setState({
			score,
			renderedSongs,
			TopArtists,
			sixMonthsTracks,
			thisMonthTracks,
		});
	};
	render() {
		return (
			<React.Fragment>
				{console.log(
					this.state.renderedSongs,
					this.state.sixMonthsTracks,
					this.state.thisMonthTracks,
					this.state.TopArtists
				)}
				<div className="answer">
					{this.state.score == 4 && (
						<React.Fragment>
							<img src={great} alt="WellDoneGif" className="Giffy" />
							<h1>Great Job! </h1>
							<h3 className="scoreCard four">
								You scored {this.state.score} out of 4
							</h3>
						</React.Fragment>
					)}
					{this.state.score == 3 && (
						<React.Fragment>
							<img src={good} alt="WellDoneGif" className="Giffy" />
							<h1>You did alright, I guess...</h1>
							<h3 className="scoreCard three">
								You scored {this.state.score} out of 4
							</h3>
						</React.Fragment>
					)}
					{this.state.score == 2 && (
						<React.Fragment>
							<img src={notbad} alt="WellDoneGif" className="Giffy" />
							<h1>Not bad... not good either</h1>
							<h3 className="scoreCard two">
								You scored {this.state.score} out of 4
							</h3>
						</React.Fragment>
					)}
					{this.state.score == 1 && (
						<React.Fragment>
							<img src={laugh} alt="WellDoneGif" className="Giffy" />
							<h1>Did you get lucky here or...?</h1>
							<h3 className="scoreCard one">
								You scored {this.state.score} out of 4
							</h3>
						</React.Fragment>
					)}
					{this.state.score == 0 && (
						<React.Fragment>
							<img src={wellDone} alt="WellDoneGif" className="Giffy" />
							<h1>Wow... you got none of them right lollll</h1>
							<h3 className="scoreCard zero">
								You scored {this.state.score} out of 4
							</h3>
						</React.Fragment>
					)}
					<h5 className="linkToFriend">
						<a>
							Send these questions to a friend, and see how well they know you
						</a>
					</h5>

					<a className="newGame" href="/game">
						Would you like to start a new game?
					</a>
				</div>
			</React.Fragment>
		);
	}
}

export default Scores;
