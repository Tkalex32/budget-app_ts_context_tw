
import List from "./List/List";
import Form from "./Form/Form";
import Balance from "./Balance/Balance";

const Main: React.FC  = () => {
  return (
    <div className="order-1 pt-2 rounded-md sm:col-span-2 bg-gradient-to-r from-blue-600 to-red-600 lg:order-2">
      <div className="flex flex-col items-center justify-center p-3 shadow-sm rounded-b-md bg-slate-50 shadow-slate-800">
        <Balance />
        <List />
        <Form />
      </div>
    </div>
  );
}

export default Main;
