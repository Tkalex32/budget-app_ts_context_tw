import React from "react";

interface ITransaction {
  id: string;
  amount: number;
  category: string;
  type: string;
  date: string;
}

interface IFormData {
  amount: number;
  category: string;
  type: string;
  date: string;
}

type TransactionType = "Income" | "Expense";

type BudgetAction =
  | { type: "ADD"; payload: ITransaction }
  | { type: "DELETE"; payload: ITransaction };

interface IProviderProps {
  children: React.ReactNode;
}

type Title = {
  title: string;
};

type Category = {
  type: string;
  amount: number;
  color: string;
};

interface ChartData {
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
  labels: string[];
}

type Styles = {
  order: string;
  borderColor: string;
  titleColor: string;
  totalColor: string;
};
