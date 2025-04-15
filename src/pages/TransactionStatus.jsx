import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactionByCollectId,
  updateTransactionStatus,
} from "../store/transactionSlice";

export default function TransactionStatus() {
  const dispatch = useDispatch();
  const {
    data: transactionData,
    status,
    error,
  } = useSelector((state) => state.transactions.transactionByCollectId);

  const {
    data: updatedTransaction,
    status: updateStatus,
    error: updateError,
  } = useSelector((state) => state.transactions.updatedTransaction);

  const [collectId, setCollectId] = useState("");
  const [amount, setAmount] = useState("");
  const [statusValue, setStatusValue] = useState("SUCCESS");

  useEffect(() => {
    if (collectId.length === 24) {
      dispatch(fetchTransactionByCollectId(collectId));
    }
  }, [collectId, dispatch]);

  useEffect(() => {
    if (transactionData) {
      setAmount(transactionData.transaction_amount || "");
      setStatusValue(transactionData.status || "SUCCESS");
    }
  }, [transactionData]);

  const handleSubmit = () => {
    const transactionPayload = {
      collect_id: collectId,
      status: statusValue,
      transaction_amount: Number(amount),
    };

    dispatch(updateTransactionStatus(transactionPayload));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction Status</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Collect ID
        </label>
        <input
          type="text"
          value={collectId}
          onChange={(e) => setCollectId(e.target.value)}
          placeholder="Enter Collect ID"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <p>
        Note: Only Amount and Status can be updated. Collect ID is used to fetch
        the transaction details.
      </p>
      <div className="flex flex-wrap gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <select
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILURE">FAILURE</option>
            <option value="PENDING">PENDING</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Update Transaction
      </button>
      {transactionData && status !== "failed" && (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Fetched Transaction Data:</h2>
          <pre className="text-sm text-gray-700">
            {JSON.stringify(transactionData, null, 2)}
          </pre>
        </div>
      )}
      {error && status === "failed" && (
        <div className="mt-4 text-red-500">
          <p>Error fetching transaction: {error}</p>
        </div>
      )}
      {updateStatus === "succeeded" && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          Transaction updated successfully:{" "}
          <pre>{JSON.stringify(updatedTransaction, null, 2)}</pre>
        </div>
      )}
      {updateStatus === "failed" && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Failed to update transaction: {updateError}
        </div>
      )}
    </div>
  );
}
