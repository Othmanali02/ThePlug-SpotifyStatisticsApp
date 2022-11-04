import React, { Component } from "react";

class Footer extends Component {
	render() {
		return (
			<footer class="site-footer">
				<h4>© 2022 The Plug for Spotify</h4>
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
