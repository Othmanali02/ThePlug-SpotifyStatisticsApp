import React, { Component } from "react";
import github from "./images/github.png";

class Footer extends Component {
	render() {
		return (
			<footer class="site-footer">
				<h4>© 2022 The Plug for Spotify</h4>
				<a href="https://github.com" target="_blank">
					<img src={github} className="GitHub" />
				</a>
				<div className="credit">
					<a
						target="_blank"
						href="https://othmans-portfolio.herokuapp.com/home"
						className="othman"
					>
						Othman Ali
					</a>
				</div>
			</footer>
		);
	}
}

export default Footer;
