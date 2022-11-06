import React, { Component } from "react";
import album from "./images/album.jpg";

class Game extends Component {
	state = {};

	componentDidMount = async () => {
		this.props.handleLogin();
	};

	render() {
		return (
			<React.Fragment>
				<div className="headGame">
					{" "}
					<h3>
						Since you love The Weeknd so much... Which song did you listen to
						the most during the past Six months?
					</h3>
					<div className="Options">
						<div className="songGame">
							<img src={album} className="AlbumCover" />
							<h6>Nothing Compares (Bonus Track)</h6>
						</div>
						<div className="songGame">
							<img src={album} className="AlbumCover" />
							<h6>Final Lullaby (Bonus Track)</h6>
						</div>
						<div className="songGame">
							<img src={album} className="AlbumCover" />
							<h6>Missed You (Bonus Track)</h6>
						</div>
						<div className="songGame">
							<img src={album} className="AlbumCover" />
							<h6>Nothing Compares (Bonus Track)</h6>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Game;
