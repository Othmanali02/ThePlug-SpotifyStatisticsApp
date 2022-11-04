import React, { Component } from "react";

class ItemTable extends Component {
	state = {};
	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th></th>
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
								{item.name}{" "}
								<span className="tableArtists">
									{item.artists.length > 1 &&
										item.artists.map((i) => i.name + ", ")}
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
