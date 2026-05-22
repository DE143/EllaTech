import axios from 'axios';
import { InventoryItem, CreateInventoryItemDto } from '../types';
import config from '../config/env';

const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const inventoryApi = {
  // Fetch all inventory items
  getInventory: async (): Promise<InventoryItem[]> => {
    const response = await api.get<InventoryItem[]>('/inventory');
    return response.data;
  },

  // Fetch a single inventory item
  getInventoryItem: async (id: string): Promise<InventoryItem> => {
    const response = await api.get<InventoryItem>(`/inventory/${id}`);
    return response.data;
  },

  // Create a new inventory item
  createInventoryItem: async (item: CreateInventoryItemDto): Promise<InventoryItem> => {
    const newItem = {
      ...item,
      status: item.quantity === 0 
        ? 'out of stock' 
        : item.quantity < config.stock.lowStockThreshold 
          ? 'low stock' 
          : 'in stock',
      updatedAt: new Date().toISOString(),
    };
    const response = await api.post<InventoryItem>('/inventory', newItem);
    return response.data;
  },

  // Update an inventory item
  updateInventoryItem: async (id: string, updates: Partial<InventoryItem>): Promise<InventoryItem> => {
    const response = await api.put<InventoryItem>(`/inventory/${id}`, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },

  // Delete an inventory item
  deleteInventoryItem: async (id: string): Promise<void> => {
    await api.delete(`/inventory/${id}`);
  },
};

export default api;
