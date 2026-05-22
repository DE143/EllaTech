import {
  API_BASE_URL,
  APP_NAME,
  APP_VERSION,
  ENABLE_ANALYTICS,
  ENABLE_DEBUG_MODE,
  ITEMS_PER_PAGE,
  LOW_STOCK_THRESHOLD,
  OUT_OF_STOCK_THRESHOLD,
} from '@env';

export const config = {
  api: {
    baseUrl: API_BASE_URL || 'https://6a0d5281769682b8ee75f701.mockapi.io',
    timeout: 10000,
  },
  app: {
    name: APP_NAME || 'Inventory Manager',
    version: APP_VERSION || '1.0.0',
  },
  features: {
    analytics: ENABLE_ANALYTICS === 'true',
    debugMode: ENABLE_DEBUG_MODE === 'true',
  },
  pagination: {
    itemsPerPage: parseInt(ITEMS_PER_PAGE || '10', 10),
  },
  stock: {
    lowStockThreshold: parseInt(LOW_STOCK_THRESHOLD || '10', 10),
    outOfStockThreshold: parseInt(OUT_OF_STOCK_THRESHOLD || '0', 10),
  },
};

export default config;
