import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllTransactions from "./pages/AllTransactions";
import TransactionById from "./pages/TransactionById";
import TransactionStatus from "./pages/TransactionStatus";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <AllTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction-by-id"
          element={
            <ProtectedRoute>
              <TransactionById />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-transaction"
          element={
            <ProtectedRoute>
              <TransactionStatus />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
