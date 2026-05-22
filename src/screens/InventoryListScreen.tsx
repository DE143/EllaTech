import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchInventory } from '../store/slices/inventorySlice';
import { InventoryItem } from '../types';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

interface InventoryListScreenProps {
  navigation: any;
}

const InventoryListScreen: React.FC<InventoryListScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.inventory);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchInventory());
  };

  const handleItemPress = (item: InventoryItem) => {
    navigation.navigate('ItemDetail', { itemId: item.id });
  };

  if (loading && items.length === 0) {
    return <LoadingSpinner message="Loading inventory..." />;
  }

  if (error && items.length === 0) {
    return <ErrorMessage message={error} onRetry={handleRefresh} />;
  }

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <TouchableOpacity
      onPress={() => handleItemPress(item)}
      className="bg-white rounded-2xl p-5 mb-4 shadow-md border border-gray-100"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text className="text-xl font-bold text-gray-900 mb-1">{item.name}</Text>
          <Text className="text-sm text-gray-500">SKU: {item.sku}</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>
      
      <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <View className="flex-1">
          <Text className="text-xs text-gray-500 mb-1">Category</Text>
          <Text className="text-sm font-semibold text-gray-800">{item.category}</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-xs text-gray-500 mb-1">Quantity</Text>
          <View className="bg-blue-50 px-3 py-1 rounded-full">
            <Text className="text-base font-bold text-blue-600">{item.quantity}</Text>
          </View>
        </View>
        <View className="flex-1 items-end">
          <Text className="text-xs text-gray-500 mb-1">Supplier</Text>
          <Text className="text-sm font-semibold text-gray-800">{item.supplier}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 pt-14 pb-8 shadow-lg">
        <Text className="text-3xl font-bold text-white mb-2">Inventory</Text>
        <Text className="text-blue-100 text-base">Welcome back, {user?.fullName}! 👋</Text>
        
        {/* Stats Card */}
        <View className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 mt-4 flex-row justify-around">
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">{items.length}</Text>
            <Text className="text-blue-100 text-xs">Total Items</Text>
          </View>
          <View className="w-px bg-white/30" />
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">
              {items.filter(i => i.status === 'in stock').length}
            </Text>
            <Text className="text-blue-100 text-xs">In Stock</Text>
          </View>
          <View className="w-px bg-white/30" />
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">
              {items.filter(i => i.status === 'low stock').length}
            </Text>
            <Text className="text-blue-100 text-xs">Low Stock</Text>
          </View>
        </View>
      </View>

      {/* Inventory List */}
      {items.length === 0 ? (
        <EmptyState
          message="No inventory items"
          description="Tap the + button below to add your first product"
        />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} colors={['#3b82f6']} />
          }
        />
      )}
    </View>
  );
};

export default InventoryListScreen;
