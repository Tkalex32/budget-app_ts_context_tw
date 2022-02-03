import React, { createContext, useReducer } from "react";
import { ITransaction, BudgetAction, IProviderProps } from "../types";

const BudgetReducer = (state: ITransaction[], action: BudgetAction) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "DELETE":
      return state.filter((i) => i.id !== action.payload.id);
    default:
      return state;
  }
};

const initialState: ITransaction[] = [
  {
    amount: 500,
    category: "Salary",
    type: "Income",
    date: "2020-11-16",
    id: "44c68123-5b86-4cc8-b915-bb9e16cebe6a",
  },
  {
    amount: 75,
    category: "Shopping",
    type: "Expense",
    date: "2020-11-16",
    id: "33b295b8-a8cb-49f0-8f0d-bb268686de1a",
  },
  {
    amount: 125,
    category: "Car",
    type: "Expense",
    date: "2020-11-16",
    id: "0f72e66e-e144-4a72-bbc1-c3c92018635e",
  },
];

export const BudgetContext = createContext<{
  state: ITransaction[],
  dispatch: React.Dispatch<BudgetAction>
}>({state: initialState, dispatch: () => {}});

export const Provider = ({ children }: IProviderProps) => {
  const [state, dispatch] = useReducer(BudgetReducer, initialState);

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
