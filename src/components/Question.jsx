import React, { Component } from "react";
import { Link } from "react-router-dom";
import next from "./images/next1.png";
import play from "./images/play.png";

class Question extends Component {
	state = {
		renderedSongs: [],
		artist: "",
		topArtists: [],
		sixMonthTracks: [],
		thisMonthTracks: [],
		thisMonthQuestion: false,
		sixMonthQuestion: false,
		songQuestion: false,
		artistQuestion: false,
		showButton: false,
		currentQuestion: -1,
		score: 0,
	};

	randomQuestion = () => {
		let currentQuestion = this.state.currentQuestion;
		currentQuestion += 1;
		if (currentQuestion === 5) {
			currentQuestion = 0;
		}
		this.setState({ currentQuestion });

		let artistQuestion = false;
		let songQuestion = false;
		let sixMonthQuestion = false;
		let thisMonthQuestion = false;
		let showButton = false;
		switch (currentQuestion) {
			case 0:
				this.renderQuestions();
				artistQuestion = false;
				songQuestion = true;
				sixMonthQuestion = false;
				thisMonthQuestion = false;
				let score = 0;
				this.setState({ score });
				this.setState({
					songQuestion,
					artistQuestion,
					sixMonthQuestion,
					thisMonthQuestion,
				});
				break;
			case 1:
				this.renderArtistQuestions();
				artistQuestion = true;
				songQuestion = false;
				sixMonthQuestion = false;
				thisMonthQuestion = false;
				showButton = false;
				this.setState({
					songQuestion,
					artistQuestion,
					sixMonthQuestion,
					thisMonthQuestion,
					showButton,
				});
				break;
			case 2:
				this.renderLastSixMonthQuestion();
				artistQuestion = false;
				songQuestion = false;
				sixMonthQuestion = true;
				thisMonthQuestion = false;
				showButton = false;

				this.setState({
					songQuestion,
					artistQuestion,
					sixMonthQuestion,
					thisMonthQuestion,
					showButton,
				});
				break;
			case 3:
				this.renderLastMonthQuestion();
				artistQuestion = false;
				songQuestion = false;
				sixMonthQuestion = false;
				thisMonthQuestion = true;
				showButton = false;

				this.setState({
					songQuestion,
					artistQuestion,
					sixMonthQuestion,
					thisMonthQuestion,
					showButton,
				});
				break;
			case 4:
				this.renderScoreScreen();

				break;
			default:
				break;
		}
	};

	renderScoreScreen = () => {
		window.location = "/scores";
		localStorage.setItem("score", this.state.score);
	};

	renderArtistQuestions = () => {
		const artists = this.props.artistQuestionData;
		var topArtists = [];
		let firstArt = Math.floor(Math.random() * artists.length);
		let secondArt = Math.floor(Math.random() * artists.length);

		do {
			firstArt = Math.floor(Math.random() * artists.length);
			secondArt = Math.floor(Math.random() * artists.length);
		} while (firstArt === secondArt && firstArt !== 0 && secondArt !== 0);

		topArtists.push(artists[firstArt]);
		topArtists.push(artists[secondArt]);

		sessionStorage.setItem("topArtists", JSON.stringify(topArtists));

		this.setState({ topArtists });
	};

	renderLastMonthQuestion = () => {
		const tracks = this.props.lastMonthQuestionData;
		var thisMonthTracks = [];

		var arr = [];
		while (arr.length < 4) {
			var r = Math.floor(Math.random() * tracks.length);
			if (arr.indexOf(r) === -1) arr.push(r);
		}

		for (let i = 0; i < 4; i++) {
			thisMonthTracks.push(tracks[arr[i]]);
		}
		sessionStorage.setItem("thisMonthTracks", JSON.stringify(thisMonthTracks));

		this.setState({ thisMonthTracks });
	};

	renderLastSixMonthQuestion = () => {
		const tracks = this.props.sixMonthsQuestionData;
		var sixMonthTracks = [];

		var arr = [];
		while (arr.length < 4) {
			var r = Math.floor(Math.random() * tracks.length);
			if (arr.indexOf(r) === -1) arr.push(r);
		}

		for (let i = 0; i < 4; i++) {
			sixMonthTracks.push(tracks[arr[i]]);
		}

		sessionStorage.setItem("sixMonthTracks", JSON.stringify(sixMonthTracks));

		this.setState({ sixMonthTracks });
	};

	renderQuestions = () => {
		const tracks = this.props.questionData;
		var renderedSongs = [];
		const artist = tracks[0].artist;
		var arr = [];
		let numRandom = 0;

		if (tracks.length > 3) {
			numRandom = 4;
		} else if (tracks.length === 3) {
			numRandom = 3;
		} else if (tracks.length === 2) {
			numRandom = 2;
		}

		while (arr.length < numRandom) {
			var r = Math.floor(Math.random() * tracks.length);
			if (arr.indexOf(r) === -1) arr.push(r);
		}

		for (let i = 0; i < tracks.length; i++) {
			renderedSongs.push(tracks[arr[i]]);
			if (i == 3) break;
		}

		sessionStorage.setItem(
			"topArtistSongQuestion",
			JSON.stringify(renderedSongs)
		);

		this.setState({ renderedSongs, artist });
	};

	checkRight = (index, name) => {
		let choices = [];
		if (this.state.songQuestion) {
			choices = this.state.renderedSongs;
		} else if (this.state.artistQuestion) {
			choices = this.state.topArtists;
		} else if (this.state.sixMonthQuestion) {
			choices = this.state.sixMonthTracks;
		} else if (this.state.thisMonthQuestion) {
			choices = this.state.thisMonthTracks;
		}

		var lowest = Number.POSITIVE_INFINITY;
		var tmp;
		for (var i = choices.length - 1; i >= 0; i--) {
			tmp = choices[i].index;
			if (tmp < lowest) lowest = tmp;
		}

		if (index === lowest) {
			const song = document.getElementById(name);
			song.classList.add("correct");
			const confet = document.querySelector(".Options");
			confet.classList.add("active");
			let score = this.state.score;
			let showButton = true;
			score += 1;
			this.setState({ score, showButton });
		} else {
			const song = document.getElementById(name);
			song.classList.add("wrong");
			const correct = document.getElementById(lowest);
			correct.classList.add("correct");
			const confet = document.querySelector(".Options");
			confet.classList.add("active");
			let showButton = true;
			this.setState({ showButton });
		}
	};

	handleDate = () => {
		const date = new Date();
		let result = this.subtractMonths(6, date);
		let stringResult = "";
		stringResult += result;
		const newDate = stringResult.split(" ");
		let month = newDate[1];
		let year = newDate[3];

		if (month === "01") {
			month = "January";
		} else if (month === "02") {
			month = "February";
		} else if (month === "03") {
			month = "March";
		} else if (month === "04") {
			month = "April";
		} else if (month === "05") {
			month = "May";
		} else if (month === "06") {
			month = "June";
		} else if (month === "07") {
			month = "July";
		} else if (month === "08") {
			month = "August";
		} else if (month === "09") {
			month = "September";
		} else if (month === "10") {
			month = "October";
		} else if (month === "11") {
			month = "November";
		} else if (month === "12") {
			month = "December";
		}

		return `${month}, ${year}`;
	};
	subtractMonths = (numOfMonths, date = new Date()) => {
		const dateCopy = new Date(date.getTime());

		dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);

		return dateCopy;
	};

	render() {
		return (
			<div className="Question">
				{this.state.songQuestion && (
					<React.Fragment>
						{this.props.weirdPerson && (
							<h3>
								You really loved these tracks a whole lot{" "}
								<span className="artistQuestion">
									since you started using Spotify...
								</span>{" "}
								Which song did you listen to the more?
							</h3>
						)}
						{!this.props.weirdPerson && (
							<h3>
								Oh wow another{" "}
								<span className="artistQuestion"> {this.state.artist}</span>{" "}
								fan... Which song did you listen to more, like since you clicked
								on their Spotify account and got butterflies for the first time?
							</h3>
						)}
						<div className="Options">
							{this.state.renderedSongs.map((song) => (
								<div
									onClick={() => this.checkRight(song.index, song.index)}
									key={song.index}
									id={song.index}
									className="songGame"
								>
									<img
										src={song.albumCover}
										alt="Album Cover"
										className="AlbumCover"
									/>
									<h6>{song.name}</h6>
								</div>
							))}
						</div>
						{this.state.showButton && (
							<button
								className="nextQuestion"
								onClick={() => {
									this.randomQuestion();
								}}
							>
								Continue to the next Question{" "}
								<img src={next} className="nextIcon" />
							</button>
						)}

						<h6 className="linkContainer">
							<Link className="linktoMain" to="/home">
								Return to the home page
							</Link>
						</h6>
					</React.Fragment>
				)}

				{this.state.sixMonthQuestion && (
					<React.Fragment>
						<h3>
							Since{" "}
							<span className="artistQuestion">{this.handleDate()}...</span>{" "}
							Which track did you stream more?
						</h3>
						<div className="Options">
							{this.state.sixMonthTracks.map((song) => (
								<div
									onClick={() => this.checkRight(song.index, song.index)}
									key={song.index}
									id={song.index}
									className="songGame"
								>
									<img
										src={song.albumCover}
										alt="Album Cover"
										className="AlbumCover"
									/>
									<h6>{song.name}</h6>
								</div>
							))}
						</div>
						{this.state.showButton && (
							<button
								className="nextQuestion"
								onClick={() => {
									this.randomQuestion();
								}}
							>
								Continue to the next Question{" "}
								<img src={next} className="nextIcon" />
							</button>
						)}
						<h6 className="linkContainer">
							<Link className="linktoMain" to="/home">
								Return to the home page
							</Link>
						</h6>
					</React.Fragment>
				)}

				{this.state.thisMonthQuestion && (
					<React.Fragment>
						<h3>
							Over the <span className="artistQuestion">last month</span>, which
							song did you listen to more?
						</h3>
						<div className="Options">
							{this.state.thisMonthTracks.map((song) => (
								<div
									onClick={() => this.checkRight(song.index, song.index)}
									key={song.index}
									id={song.index}
									className="songGame"
								>
									<img
										src={song.albumCover}
										alt="Album Cover"
										className="AlbumCover"
									/>
									<h6>{song.name}</h6>
								</div>
							))}
						</div>
						{this.state.showButton && (
							<button
								className="nextQuestion"
								onClick={() => {
									this.randomQuestion();
								}}
							>
								Continue to look at your score{" "}
								<img src={next} className="nextIcon" />
							</button>
						)}

						<h6 className="linkContainer">
							<Link className="linktoMain" to="/home">
								Return to the home page
							</Link>
						</h6>
					</React.Fragment>
				)}

				{this.state.artistQuestion && (
					<React.Fragment>
						<h3 className="artistQuestionh3">
							Which artist did you listen to more in the{" "}
							<span className="artistQuestion">past month?</span>
						</h3>
						<div className="Options">
							{this.state.topArtists.map((artist) => (
								<div
									onClick={() => this.checkRight(artist.index, artist.index)}
									key={artist.index}
									id={artist.index}
									className="songGame"
								>
									<img
										src={artist.pic}
										alt="Artist Cover"
										className="ArtistCover"
									/>
									<h5>{artist.artist}</h5>
								</div>
							))}
						</div>
						{this.state.showButton && (
							<button
								className="nextQuestion"
								onClick={() => {
									this.randomQuestion();
								}}
							>
								Continue to the next Question{" "}
								<img src={next} className="nextIcon" />
							</button>
						)}
						<h6 className="linkContainer">
							<Link className="linktoMain" to="/home">
								Return to the home page
							</Link>
						</h6>
					</React.Fragment>
				)}

				{!this.state.songQuestion &&
					!this.state.artistQuestion &&
					!this.state.sixMonthQuestion &&
					!this.state.thisMonthQuestion &&
					!this.state.altTopArtistQuestion && (
						<React.Fragment>
							{this.props.questionData.length > 2 ? (
								<div className="Play" onClick={() => this.randomQuestion()}>
									<img src={play} className="PlayIcon" />
									<h5>Play</h5>
								</div>
							) : (
								<div className="Play unavailable">
									<img src={play} className="PlayIcon" />
									<h5>Play</h5>
								</div>
							)}

							{/* <h6 className="linkContainer">
								<Link className="linktoMain" to="/home">
									Return to the home page
								</Link>
							</h6> */}
						</React.Fragment>
					)}
			</div>
		);
	}
}

export default Question;
