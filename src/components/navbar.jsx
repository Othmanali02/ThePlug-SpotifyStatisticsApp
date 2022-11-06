import React, { Component } from "react";
import img from "./images/logo.webp";
import help from "./images/inquiry-icon-22-removebg-preview.png";
import info from "./images/813715-removebg-preview.png";

class NavBar extends Component {
	state = {};
	handleHelp = () => {
		window.open("/privacy");
	};

	render() {
		return (
			<React.Fragment>
				<div className="nav">
					<a href="/">
						<img src={img} className="logo" alt="The Plug" />
					</a>
					<div className="do">
						<a onClick={() => this.handleHelp()}>
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
