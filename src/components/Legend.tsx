import React from "react";
import "../styles/Legend.css";

const positiveLegend = [
	{ type: 1, range: "0 to 1000" },
	{ type: 2, range: "1001 to 3000" },
	{ type: 3, range: "3001 to 7000" },
	{ type: 4, range: "7001 to 10000" },
	{ type: 5, range: "10001 to above" },
];
const negativeLegend = [
	{ type: 1, range: "-0.1 to -1000" },
	{ type: 2, range: "-1001 to -3000" },
	{ type: 3, range: "-3001 to -7000" },
	{ type: 4, range: "-7001 to -10000" },
	{ type: 5, range: "-10001 and below" },
];

const Legend = () => {
	return (
		<div className="legend">
			<div className="legend__group">
				<span className="legend__text"> Less </span>
				<div className="legend__cells">
					{positiveLegend.map((legend) => (
						<div
							className={`heat-map__cell heat-map__cell--positive-${legend.type}`}
							data-tip={legend.range}
						/>
					))}
				</div>
				<span className="legend__text"> More </span>
			</div>
			<div className="legend__group">
				<span className="legend__text"> Less </span>
				<div className="legend__cells">
					{negativeLegend.map((legend) => (
						<div
							className={`heat-map__cell heat-map__cell--negative-${legend.type}`}
							data-tip={legend.range}
						/>
					))}
				</div>
				<span className="legend__text"> More </span>
			</div>
		</div>
	);
};

export default Legend;
