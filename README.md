# Inventory Management App

A React Native inventory management application built with Expo, TypeScript, Redux Toolkit, and NativeWind for the Ellatech Frontend Developer interview.

## 🚀 Features

### ✅ Implemented Requirements

- **User Registration**: Capture and store user's full name and email locally
- **Inventory List**: Fetch and display inventory items from the API with refresh capability
- **Inventory Item Details**: Display SKU, name, category, quantity, status, supplier, and last updated time
- **Register a Product**: Create new inventory items via the API
- **Update Product Stock**: Add or remove stock with validation (stock cannot go below zero)
- **Product Status**: Automatic status calculation (in stock, low stock, out of stock)
- **Transaction History**: Track all stock changes locally with pagination (10 items per page)
- **Loading States**: Loading spinners for all async operations
- **Empty States**: User-friendly messages when no data is available
- **Error Handling**: Comprehensive error handling with retry options
- **Form Validation**: Client-side validation for all forms

## 🛠️ Tech Stack

- **React Native** with **Expo SDK 56**
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **RTK Query patterns** for async API integration
- **NativeWind** (Tailwind CSS) for styling
- **React Navigation** for navigation
- **Axios** for API calls

## 📁 Project Structure

```
inventory-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── EmptyState.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── StatusBadge.tsx
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/             # Screen components
│   │   ├── AddProductScreen.tsx
│   │   ├── InventoryListScreen.tsx
│   │   ├── ItemDetailScreen.tsx
│   │   ├── RegistrationScreen.tsx
│   │   └── TransactionsScreen.tsx
│   ├── services/            # API integration
│   │   └── api.ts
│   ├── store/               # Redux store and slices
│   │   ├── slices/
│   │   │   ├── inventorySlice.ts
│   │   │   ├── transactionSlice.ts
│   │   │   └── userSlice.ts
│   │   ├── hooks.ts
│   │   └── index.ts
│   └── types/               # TypeScript type definitions
│       └── index.ts
├── App.tsx                  # Root component
├── babel.config.js          # Babel configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

## 🏃 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DE143/EllaTech.git
cd EllaTech
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
   - Press `a` for Android
   - Press `i` for iOS (macOS only)
   - Press `w` for web
   - Scan the QR code with Expo Go app

## 📱 App Flow

1. **Registration Screen**: First-time users enter their full name and email
2. **Inventory List**: View all inventory items with status badges
3. **Add Product**: Create new inventory items with validation
4. **Item Details**: View detailed information and update stock levels
5. **Transaction History**: View all stock changes with pagination

## 🎨 Design Decisions

### Architecture

- **Separation of Concerns**: Clear separation between UI components, business logic (Redux), and API layer
- **Component Reusability**: Shared components for loading, errors, and empty states
- **Type Safety**: Comprehensive TypeScript types for all data structures
- **State Management**: Redux Toolkit for predictable state management with async thunks

### API Integration

- **Centralized API Service**: Single source of truth for all API calls
- **Error Handling**: Consistent error handling with user-friendly messages
- **Optimistic Updates**: Immediate UI feedback with proper error recovery

### Styling

- **NativeWind**: Utility-first CSS approach for rapid development
- **Consistent Design**: Color-coded status badges and consistent spacing
- **Responsive**: Works on various screen sizes

### Status Logic

- **In Stock**: Quantity ≥ 10
- **Low Stock**: 1 ≤ Quantity < 10
- **Out of Stock**: Quantity = 0

## 🔄 State Management

### Redux Slices

1. **inventorySlice**: Manages inventory items, loading states, and errors
2. **userSlice**: Stores user registration information
3. **transactionSlice**: Tracks all stock change transactions

### Async Operations

- `fetchInventory`: Get all inventory items
- `fetchInventoryItem`: Get single item details
- `createInventoryItem`: Create new product
- `updateInventoryStock`: Update product quantity

## ⚠️ Trade-offs

1. **Local Storage vs Persistence**: User data and transactions are stored in Redux (memory) rather than AsyncStorage. This was chosen for simplicity but means data is lost on app restart.

2. **Pagination Implementation**: Simple offset-based pagination for transactions. Could be improved with cursor-based pagination for better performance with large datasets.

3. **Status Calculation**: Status is calculated client-side based on quantity thresholds. In a production app, this might be server-driven for consistency.

4. **Form Validation**: Basic client-side validation only. Production apps would need server-side validation as well.

5. **Error Recovery**: Basic retry mechanisms. Could be enhanced with exponential backoff and more sophisticated error recovery strategies.

## 🚀 Future Improvements

Given more time, I would implement:

1. **Persistence Layer**:
   - AsyncStorage or SQLite for offline data persistence
   - Redux Persist for automatic state rehydration

2. **Enhanced Features**:
   - Search and filter functionality for inventory
   - Sorting options (by name, quantity, status, date)
   - Bulk operations (update multiple items)
   - Export transaction history to CSV
   - Barcode scanning for SKU input

3. **Authentication**:
   - Proper authentication flow with JWT tokens
   - Secure token storage
   - Session management

4. **Testing**:
   - Unit tests for Redux slices and utilities
   - Integration tests for API calls
   - E2E tests with Detox

5. **Performance Optimizations**:
   - Memoization for expensive computations
   - Virtual lists for large datasets
   - Image optimization and caching

6. **UX Enhancements**:
   - Pull-to-refresh animations
   - Skeleton loaders instead of spinners
   - Toast notifications for actions
   - Confirmation dialogs for destructive actions
   - Dark mode support

7. **Developer Experience**:
   - ESLint and Prettier configuration
   - Husky pre-commit hooks
   - CI/CD pipeline
   - Environment variable management

8. **Accessibility**:
   - Screen reader support
   - Proper ARIA labels
   - Keyboard navigation
   - High contrast mode

## 🐛 Known Limitations

- No offline support
- Data is lost on app restart
- No image upload for products
- Limited error recovery options
- No real-time updates

## 📝 API Endpoints Used

- `GET /inventory` - Fetch all inventory items
- `GET /inventory/:id` - Fetch single item
- `POST /inventory` - Create new item
- `PUT /inventory/:id` - Update item
- `DELETE /inventory/:id` - Delete item (bonus feature)

## 👤 Author

**Derese**

Developed as part of the Ellatech Frontend Developer interview process.

## 📄 License

This project is created for interview purposes.

---

**Time Spent**: Approximately 6-7 hours
- Project setup and configuration: 1 hour
- Redux store and API integration: 1.5 hours
- UI components and screens: 3 hours
- Testing and bug fixes: 1 hour
- Documentation: 0.5 hours
