import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transactionsReducer from "./transactionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
  },
});

export default store;