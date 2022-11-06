import React, { Component } from "react";
import explicit from "./images/explicit.png";
class ItemTable extends Component {
	state = {};
	artists = (artists) => {
		let artString = "";
		for (let i = 0; i < artists.length; i++) {
			if (i == artists.length - 1) artString += artists[i].name + "";
			else artString += artists[i].name + ", ";
		}
		return artString;
	};
	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Track</th>
					</tr>
				</thead>
				<tbody>
					{this.props.userTop.map((item, index) => (
						<tr className="tableItems" key={item.id}>
							<td className="rank">{index + 1}</td>
							<img src={item.album.images[0].url} className="tableImage" />
							<td className="tableName">
								{" "}
								<a
									target="_blank"
									className="songLink"
									href={item.external_urls.spotify}
								>
									{item.name}
								</a>{" "}
								{item.explicit && (
									<span>
										<img src={explicit} className="exp" />
									</span>
								)}
								<span className="tableArtists">
									{item.artists.length > 1 && this.artists(item.artists)}
									{item.artists.length <= 1 && item.artists[0].name}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default ItemTable;
