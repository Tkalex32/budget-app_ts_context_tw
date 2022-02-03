import { useContext } from "react";
import { BudgetContext } from "../../../context/BudgetContext";
import { AiFillDelete } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ITransaction } from "../../../types";

const List: React.FC = () => {
  const { state, dispatch } = useContext(BudgetContext);

  const deleteHandler: (transaction: ITransaction) => void = (transaction) => {
    dispatch({
      type: "DELETE",
      payload: transaction,
    });
  };

  return (
    <div className="flex flex-col w-full pt-3 mt-3 overflow-y-scroll text-lg border-t max-h-52 sm:w-10/12 sm:max-w-2xl lg:w-full">
      {state.map((i) => (
        <div key={i.id}>
          <div className="flex justify-between py-1 border-b">
            <div className="flex items-center w-full justify-evenly">
              {i.type === "Income" ? (
                <FaPlus className="text-green-500" />
              ) : (
                <FaMinus className="text-red-500" />
              )}
              <span className="w-2/12 mr-2 text-right">${i.amount}</span>
              <span className="w-3/12 mr-2">{i.category}</span>
              <span className="">{i.date}</span>
            </div>
            <div className="flex items-center">
              <AiFillDelete
                className="cursor-pointer hover:text-red-500"
                onClick={() => deleteHandler(i)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
