export interface ITransaction {
	date: string;
	amount: number;
	transactionType: string;
}

export interface ITransactionGroup {
	[key: string]: ITransaction[];
}

export interface ITransactionSummary {
	date: string;
	netTransactions: number | null;
}
