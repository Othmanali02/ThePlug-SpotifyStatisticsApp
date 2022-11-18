import React, { Component } from "react";
import music from "./images/music.png";
import play from "./images/play.png";
import spotify from "./images/spotify.png";
import stat from "./images/stat.png";

class Bubbles extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="bubbles">
					<div className="bubble">
						<div className="WRAP">
							<img className="bubbleImg white" src={music} alt="Music" />
						</div>
						<h6>Browse through your listening information</h6>
					</div>
					<div className="bubble">
						<div className="WRAP">
							<img className="bubbleImg white" src={play} alt="Playlist" />
						</div>

						<h6>Play a game based on your data</h6>
					</div>
					<div className="bubble">
						<div className="WRAP">
							<img className="bubbleImg" src={spotify} alt="spotify" />
						</div>
						<h6>Application created using Spotify's API</h6>
					</div>
					<div className="bubble">
						<div className="WRAP">
							<img className="bubbleImg white" src={stat} alt="stat" />
						</div>
						<h6>Learn in-depth statistics about your Spotify profile</h6>
					</div>
				</div>{" "}
			</React.Fragment>
		);
	}
}

export default Bubbles;
