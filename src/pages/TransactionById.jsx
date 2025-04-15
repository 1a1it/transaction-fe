import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionsBySchoolId } from "../store/transactionSlice";
import TransactionTable from "../components/TransactionTable";

export default function TransactionById() {
  const dispatch = useDispatch();
  const { data: transactions, status, error } = useSelector(
    (state) => state.transactions.transactionsBySchoolId
  );

  const [schoolId, setSchoolId] = useState("");

  const handleSearch = () => {
    console.log("School ID: ", schoolId);

    if (schoolId.trim()) {
      dispatch(fetchTransactionsBySchoolId(schoolId));
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction By ID</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          placeholder="Enter School ID"
          className="border border-gray-300 rounded px-4 py-2 mr-2 w-60"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-200 active:bg-blue-700"
        >
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full overflow-hidden">
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}