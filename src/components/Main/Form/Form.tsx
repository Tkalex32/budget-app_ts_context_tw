import React, { useContext, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { BudgetContext } from "../../../context/BudgetContext";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import { Category, IFormData, ITransaction } from "../../../types";

const initialState: IFormData = {
  amount: 0,
  category: "",
  type: "Income",
  date: "",
};

const Form: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>(initialState);
  const { dispatch } = useContext(BudgetContext);

  const selectRef = useRef<HTMLSelectElement>(null);

  const formSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transaction: ITransaction = {
      ...formData,
      id: uuid(),
    };
    dispatch({
      type: "ADD",
      payload: transaction,
    });
    setFormData(initialState);
    selectRef.current?.blur();
  };

  const selectedCategories: Category[] =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <div className="w-full px-4 sm:w-10/12 sm:max-w-2xl md:w-10/12 lg:w-full">
      <form onSubmit={(e) => formSubmitHandler(e)}>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="relative mt-4">
              <select
                required
                name="type"
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full h-10 pl-3 pr-6 text-base border rounded-lg appearance-none placeholder-slate-700 focus:shadow-outline"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="relative mt-4">
              <select
                required
                ref={selectRef}
                name="category"
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full h-10 pl-3 pr-6 text-base border rounded-lg appearance-none placeholder-slate-700 focus:shadow-outline"
              >
                <option value="" disabled hidden>
                  Category
                </option>
                {selectedCategories.map((c) => (
                  <option key={c.type} value={c.type}>
                    {c.type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative mt-4">
              <input
                required
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: +e.target.value })
                }
                className="w-full h-10 px-3 mb-2 text-base border rounded-lg placeholder-slate-700 focus:shadow-outline"
                placeholder="Amount"
              />
            </div>
            <div className="relative mt-4">
              <input
                required
                id="date"
                type="text"
                className="w-full h-10 px-3 mb-2 text-base border rounded-lg placeholder-slate-700 focus:shadow-outline"
                placeholder="Date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 p-0.5 mx-auto rounded bg-gradient-to-r from-blue-600 to-red-600">
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-blue-700 rounded bg-slate-50 hover:bg-transparent hover:text-white hover:border-transparent"
            >
              Add New Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
