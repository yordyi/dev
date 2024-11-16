export interface Transaction {
    amount: number;
    description: string;
    date: Date;
}

export interface Revenue {
    amount: number;
    description: string;
    date: Date;
}

export interface Budget {
    amount: number;
    date: Date;
}

export interface FinancialTarget {
    amount: number;
    date: Date;
}

export interface User {
    username: string;
    password: string;
}
