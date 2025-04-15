import React from "react";

export default function TransactionTable({ transactions }) {
  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
      <thead>
        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <th className="py-2 px-4 border-b">School ID</th>
          <th className="py-2 px-4 border-b">Collect ID</th>
          <th className="py-2 px-4 border-b">Status</th>
          <th className="py-2 px-4 border-b">Payment Method</th>
          <th className="py-2 px-4 border-b">Gateway</th>
          <th className="py-2 px-4 border-b">Amount</th>
          <th className="py-2 px-4 border-b">Bank Reference</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.results?.length > 0 ? (
          transactions.results.map((txn) => (
            <tr
              key={txn._id}
              className="transform transition-all duration-200 hover:scale-[1.01] hover:shadow-sm hover:bg-gray-50 text-sm"
            >
              <td className="py-2 px-4 border-b">{txn.school_id}</td>
              <td className="py-2 px-4 border-b">{txn.collect_id}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    txn.status === "SUCCESS"
                      ? "bg-green-100 text-green-700"
                      : txn.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {txn.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b capitalize">
                {txn.payment_method}
              </td>
              <td className="py-2 px-4 border-b">{txn.gateway}</td>
              <td className="py-2 px-4 border-b">
                ₹{txn.transaction_amount.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">{txn.bank_refrence}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
              No transactions found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}