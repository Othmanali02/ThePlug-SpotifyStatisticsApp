import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "./images/ThePlug.webp";
import help from "./images/inquiry-icon-22-removebg-preview.png";
import info from "./images/813715-removebg-preview.png";

class NavBar extends Component {
	state = {};

	render() {
		return (
			<React.Fragment>
				<div className="nav">
					<Link to="/home">
						<img src={img} className="logo" alt="The Plug" />
					</Link>
					<div className="do">
						<a href="/privacy">
							{" "}
							<img src={help} className="icons" />
						</a>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default NavBar;
