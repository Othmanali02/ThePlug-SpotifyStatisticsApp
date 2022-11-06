import React, { Component } from "react";

class ArtistTable extends Component {
	state = {};
	handleArtistClick = (link) => {
		window.open(link);
	};
	render() {
		return (
			<div className="tableItemsArt">
				{this.props.userTop.map((item, index) => (
					<div className="artistBubble" key={item.id}>
						<img src={item.images[0].url} className="tableImageArt" />
						<h5>
							<a href={item.external_urls.spotify}>
								{index + 1}. {item.name}
							</a>
						</h5>
					</div>
				))}
			</div>
		);
	}
}

export default ArtistTable;
