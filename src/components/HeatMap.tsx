import React from "react";

const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months: string[] = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const HeatMap = () => {
	return (
		<div className="heat-map">
			<div className="heat-map__cells">
				{new Array(366).fill(null).map((_, index) => (
					<div className="heat-map__cell" key={index}>
						{index < 7 && (
							<p className="heat-map__label heat-map__label--left">
								{days[index]}
							</p>
						)}
						{/* {(index + 1) % 30 === 0 && (
							<p className="heat-map__label heat-map__label--bottom">
								{months[(index + 1) / 30]}
								{(index + 1) / 30}
							</p>
						)} */}
					</div>
				))}
			</div>
		</div>
	);
};

export default HeatMap;
