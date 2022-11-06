import React, { Component } from "react";

class TimeBar extends Component {
	render() {
		return (
			<ul className="timePeriods">
				{this.props.lastMonth ? (
					<li
						className="activeTimeRange"
						onClick={() => {
							this.props.handleLastMonth();
							this.props.handleLastMonthArtists();
						}}
					>
						Last Month
					</li>
				) : (
					<li
						onClick={() => {
							this.props.handleLastMonth();
							this.props.handleLastMonthArtists();
						}}
					>
						Last Month
					</li>
				)}

				<div class="vl"></div>

				{this.props.sixMonths ? (
					<li
						className="activeTimeRange"
						onClick={() => {
							this.props.renderUserTopData();
							this.props.renderUserArtistTopData();
						}}
					>
						Last 6 months
					</li>
				) : (
					<li
						onClick={() => {
							this.props.renderUserTopData();
							this.props.renderUserArtistTopData();
						}}
					>
						Last 6 months
					</li>
				)}

				<div class="vl"></div>

				{this.props.allTime ? (
					<li
						className="activeTimeRange"
						onClick={() => {
							this.props.handleAllTime();
							this.props.handleAllTimeArtists();
						}}
					>
						All Time
					</li>
				) : (
					<li
						onClick={() => {
							this.props.handleAllTime();
							this.props.handleAllTimeArtists();
						}}
					>
						All Time
					</li>
				)}
			</ul>
		);
	}
}

export default TimeBar;
