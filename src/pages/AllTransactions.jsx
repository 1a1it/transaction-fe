import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../store/transactionSlice";
import Pagination from "../components/Pagination";
import TransactionTable from "../components/TransactionTable";

export default function AllTransactions() {
  const dispatch = useDispatch();
  const {
    data: transactions,
    status,
    error,
  } = useSelector((state) => state.transactions.allTransactions);

  // const totalPages = 5;
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    if (!transactions.results || transactions.results.length === 0) {
      dispatch(fetchTransactions(currentPage));
    }
  }, [dispatch, currentPage, transactions.results]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchTransactions(page));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Transactions</h1>
      <div className="overflow-x-auto">
        <div className="min-w-full overflow-hidden">
          <TransactionTable transactions={transactions} />
          <Pagination
            totalPages={transactions.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
