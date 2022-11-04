import React, { Component } from "react";

class ArtistTable extends Component {
	state = {};
	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th></th>
						<th>Artist</th>
					</tr>
				</thead>
				<tbody>
					{this.props.userTop.map((item, index) => (
						<tr className="tableItems" key={item.id}>
							<td className="rank">{index + 1}</td>
							<img src={item.images[0].url} className="tableImage" />
							<td className="tableName"> {item.name} </td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default ArtistTable;
