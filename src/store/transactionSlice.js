import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://school-transaction-api.onrender.com"

// Thunk to fetch transactions by page
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (pageNumber = 1) => {
    const response = await axios.get(
      `${baseURL}/transactions?page=${pageNumber}`
    );
    console.log("All Transaction Response: ", response.data);
    return response.data;
  }
);

// Thunk to fetch transactions by school ID
export const fetchTransactionsBySchoolId = createAsyncThunk(
  "transactions/fetchTransactionsBySchoolId",
  async (schoolId) => {
    const response = await axios.get(
      `${baseURL}5000/transactions/school_id/${schoolId}`
    );
    console.log("Transaction by School ID Response: ", response.data);
    return { results: response.data };
  }
);

// Thunk to fetch transaction by collect ID
export const fetchTransactionByCollectId = createAsyncThunk(
  "transactions/fetchTransactionByCollectId",
  async (collectId) => {
    const response = await axios.get(
      `${baseURL}/transactions/collect/${collectId}`
    );
    console.log("Transaction by Collect ID Response: ", response.data);
    return response.data;
  }
);

// Thunk to update transaction status
export const updateTransactionStatus = createAsyncThunk(
  "transactions/updateTransactionStatus",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "${baseURL}/transactions/webhook/status-update",
        {
          order_info: transactionData,
        }
      );
      console.log("Update Transaction Response: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating transaction:", error);
      return rejectWithValue(error.response?.data || "Failed to update transaction");
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    allTransactions: {
      data: [],
      status: "idle",
      error: null,
    },
    transactionsBySchoolId: {
      data: [],
      status: "idle",
      error: null,
    },
    updatedTransaction: {
      data: null, // New state for the updated transaction response
      status: "idle",
      error: null,
    },
    transactionByCollectId: {
      data: null, // New state for transaction by collect ID
      status: "idle",
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // All Transactions
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.allTransactions.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.allTransactions.status = "succeeded";
        state.allTransactions.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.allTransactions.status = "failed";
        state.allTransactions.error = action.error.message;
      });

    // Transactions by School ID
    builder
      .addCase(fetchTransactionsBySchoolId.pending, (state) => {
        state.transactionsBySchoolId.status = "loading";
      })
      .addCase(fetchTransactionsBySchoolId.fulfilled, (state, action) => {
        state.transactionsBySchoolId.status = "succeeded";
        state.transactionsBySchoolId.data = action.payload;
      })
      .addCase(fetchTransactionsBySchoolId.rejected, (state, action) => {
        state.transactionsBySchoolId.status = "failed";
        state.transactionsBySchoolId.error = action.error.message;
      });

    // Transaction by Collect ID
    builder
      .addCase(fetchTransactionByCollectId.pending, (state) => {
        state.transactionByCollectId.status = "loading";
      })
      .addCase(fetchTransactionByCollectId.fulfilled, (state, action) => {
        state.transactionByCollectId.status = "succeeded";
        state.transactionByCollectId.data = action.payload;
      })
      .addCase(fetchTransactionByCollectId.rejected, (state, action) => {
        state.transactionByCollectId.status = "failed";
        state.transactionByCollectId.error = action.error.message;
      });

    // Update Transaction Status
    builder
      .addCase(updateTransactionStatus.pending, (state) => {
        state.updatedTransaction.status = "loading";
        state.updatedTransaction.error = null;
      })
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        state.updatedTransaction.status = "succeeded";
        state.updatedTransaction.data = action.payload;
      })
      .addCase(updateTransactionStatus.rejected, (state, action) => {
        state.updatedTransaction.status = "failed";
        state.updatedTransaction.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
