import { useContext } from "react";
import { BudgetContext } from "./context/BudgetContext";
import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/categories";
import { TransactionType, ITransaction, Category, ChartData } from "./types";

const useTransactions = (title: TransactionType) => {
  resetCategories();
  const { state } = useContext(BudgetContext);
  const transactionsPerType: ITransaction[] = state.filter(
    (t) => t.type === title
  );
  const total: number = transactionsPerType.reduce(
    (acc, curr) => (acc += curr.amount),
    0
  );
  const balance: number = state.reduce(
    (acc, curr) =>
      curr.type === "Expense" ? acc - curr.amount : acc + curr.amount,
    0
  );
  const categories: Category[] =
    title === "Income" ? incomeCategories : expenseCategories;

  transactionsPerType.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);

    if (category) category.amount += t.amount;
  });

  const filteredCategories: Category[] = categories.filter(
    (sc) => sc.amount > 0
  );

  const chartData: ChartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };

  return { filteredCategories, total, chartData, balance };
};

export default useTransactions;
