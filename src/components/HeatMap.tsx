import React from "react";
import dayjs from "dayjs";
import transactions from "../data/transactions.json";
import {
	getHeatmapCellColor,
	getNetTransactions,
	groupByDate,
} from "../utils/helpers";
import { ITransactionSummary } from "../interfaces/transactions";
import "../styles/HeatMap.css";

const year = 2019;
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

const groupedTx = groupByDate(transactions);
const firstDay = dayjs(`${year}-01-01`).day();
const monthsData: { [key: string]: ITransactionSummary[] } = {};

for (let monthNo in months) {
	const month = months[monthNo];
	if (!monthsData[month]) monthsData[month] = [];

	// populate transactions for each day in each month
	const daysInMonth = dayjs(new Date(year, Number(monthNo), 1)).daysInMonth();
	for (let dayNo = 1; dayNo <= daysInMonth; dayNo++) {
		const date = new Date(year, Number(monthNo), dayNo);
		const dateStr = dayjs(date).format("YYYY-MM-DD");
		monthsData[month].push({
			date: dateStr,
			netTransactions: groupedTx[dateStr]
				? getNetTransactions(groupedTx[dateStr])
				: null,
		});
	}
}

const HeatMap = () => {
	let traversed = 0;
	return (
		<div className="heat-map">
			<div className="heat-map__cells">
				{new Array(firstDay).fill(null).map((_, index) => (
					<div className="heat-map__cell heat-map__cell--blank">
						<p className="heat-map__label heat-map__label--left">
							{days[index]}
						</p>
					</div>
				))}
				{months.map((month) => {
					const transactions = monthsData[month];
					return transactions.map((txn: any, index: number) => {
						traversed = traversed + 1;
						return (
							<div
								className={`heat-map__cell ${getHeatmapCellColor(
									txn.netTransactions
								)}`}
								key={index}
								data-tip={`${txn.date}<br/>Net: ${
									txn.netTransactions ?? "No data"
								}`}
							>
								{month === "Jan" && index + firstDay < 7 && (
									<p className="heat-map__label heat-map__label--left">
										{days[index + firstDay]}
									</p>
								)}
								{(traversed + firstDay === 7 ||
									(traversed + firstDay) % 35 === 0) && (
									<p className="heat-map__label heat-map__label--bottom">
										{month}
									</p>
								)}
							</div>
						);
					});
				})}
			</div>
		</div>
	);
};

export default HeatMap;
