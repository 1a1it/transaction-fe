import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}