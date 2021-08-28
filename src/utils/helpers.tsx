import { ITransactionGroup, ITransaction } from "../interfaces/transactions";
import { formatTo2DP } from "./format";

export const groupByDate = (transactions: ITransaction[]) => {
	const groups: ITransactionGroup = {};
	for (let tx of transactions) {
		if (!groups[tx.date]) groups[tx.date] = [];
		groups[tx.date].push(tx);
	}
	return groups;
};

export const getNetTransactions = (transactions: ITransaction[]) => {
	const total = transactions.reduce((total, tx) => {
		if (tx.transactionType === "credit") return total + tx.amount;
		else return total - tx.amount;
	}, 0);

	return formatTo2DP(total);
};

export const getHeatmapCellColor = (netAmount: number | null) => {
	if (netAmount === null) return "";

	if (netAmount < 0) {
		// set red ranges
		if (netAmount < -10000) return "heat-map__cell--negative-5";
		else if (netAmount < -7000) return "heat-map__cell--negative-4";
		else if (netAmount < -3000) return "heat-map__cell--negative-3";
		else if (netAmount < -1000) return "heat-map__cell--negative-2";
		else return "heat-map__cell--negative-1";
	} else {
		// set green ranges
		if (netAmount > 10000) return "heat-map__cell--positive-5";
		else if (netAmount > 7000) return "heat-map__cell--positive-4";
		else if (netAmount > 3000) return "heat-map__cell--positive-3";
		else if (netAmount > 1000) return "heat-map__cell--positive-2";
		else return "heat-map__cell--positive-1";
	}
};
