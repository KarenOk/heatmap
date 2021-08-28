import React from "react";
import dayjs from "dayjs";
import transactions from "../data/transactions.json";
import { getNetTransactions, groupByDate } from "../utils/helpers";
import { ITransactionSummary } from "../interfaces/transactions";

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
					return transactions.map((txn: any, index: number) => (
						<div
							className="heat-map__cell"
							key={index}
							data-tip={`${txn.date}<br/>Net: ${txn.netTransactions}`}
						></div>
					));
				})}
			</div>
		</div>
	);
};

export default HeatMap;

// {new Array(366).fill(null).map((_, index) => (
// 	<div className="heat-map__cell" key={index}>
// 		{index + firstDay < 7 && (
// 			<p className="heat-map__label heat-map__label--left">
// 				{days[index + firstDay]}
// 			</p>
// 		)}
// 		{/* {(index + 1) % 30 === 0 && (
// 			<p className="heat-map__label heat-map__label--bottom">
// 				{months[(index + 1) / 30]}
// 				{(index + 1) / 30}
// 			</p>
// 		)} */}
// 	</div>
// ))}
