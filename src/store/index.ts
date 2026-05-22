import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './slices/inventorySlice';
import userReducer from './slices/userSlice';
import transactionReducer from './slices/transactionSlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    user: userReducer,
    transactions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
