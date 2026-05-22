import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../../types';

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id' | 'timestamp'>>) => {
      const transaction: Transaction = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      state.transactions.unshift(transaction); // Add to beginning for recent-first order
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const { addTransaction, clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
