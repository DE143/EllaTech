export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  status: 'in stock' | 'low stock' | 'out of stock';
  supplier: string;
  updatedAt: string;
}

export interface User {
  fullName: string;
  email: string;
}

export interface Transaction {
  id: string;
  itemId: string;
  itemName: string;
  type: 'add' | 'remove';
  quantity: number;
  timestamp: string;
  previousQuantity: number;
  newQuantity: number;
}

export interface CreateInventoryItemDto {
  sku: string;
  name: string;
  category: string;
  quantity: number;
  supplier: string;
}

export interface UpdateInventoryItemDto {
  quantity: number;
}
