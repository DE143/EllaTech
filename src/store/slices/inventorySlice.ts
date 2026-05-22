import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { InventoryItem, CreateInventoryItemDto } from '../../types';
import { inventoryApi } from '../../services/api';
import config from '../../config/env';

interface InventoryState {
  items: InventoryItem[];
  selectedItem: InventoryItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (_, { rejectWithValue }) => {
    try {
      const data = await inventoryApi.getInventory();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch inventory');
    }
  }
);

export const fetchInventoryItem = createAsyncThunk(
  'inventory/fetchInventoryItem',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await inventoryApi.getInventoryItem(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch item');
    }
  }
);

export const createInventoryItem = createAsyncThunk(
  'inventory/createInventoryItem',
  async (item: CreateInventoryItemDto, { rejectWithValue }) => {
    try {
      const data = await inventoryApi.createInventoryItem(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create item');
    }
  }
);

export const updateInventoryStock = createAsyncThunk(
  'inventory/updateInventoryStock',
  async ({ id, quantity }: { id: string; quantity: number }, { rejectWithValue }) => {
    try {
      // Determine status based on quantity using config thresholds
      const status = quantity === config.stock.outOfStockThreshold 
        ? 'out of stock' 
        : quantity < config.stock.lowStockThreshold 
          ? 'low stock' 
          : 'in stock';
      const data = await inventoryApi.updateInventoryItem(id, { quantity, status });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update stock');
    }
  }
);

export const deleteInventoryItem = createAsyncThunk(
  'inventory/deleteInventoryItem',
  async (id: string, { rejectWithValue }) => {
    try {
      await inventoryApi.deleteInventoryItem(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete item');
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch inventory
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action: PayloadAction<InventoryItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch single item
    builder
      .addCase(fetchInventoryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryItem.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchInventoryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create item
    builder
      .addCase(createInventoryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInventoryItem.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createInventoryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update stock
    builder
      .addCase(updateInventoryStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInventoryStock.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedItem?.id === action.payload.id) {
          state.selectedItem = action.payload;
        }
      })
      .addCase(updateInventoryStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete item
    builder
      .addCase(deleteInventoryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInventoryItem.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteInventoryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedItem } = inventorySlice.actions;
export default inventorySlice.reducer;
