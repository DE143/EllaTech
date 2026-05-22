import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchInventoryItem, updateInventoryStock, clearSelectedItem } from '../store/slices/inventorySlice';
import { addTransaction } from '../store/slices/transactionSlice';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

interface ItemDetailScreenProps {
  route: any;
  navigation: any;
}

const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({ route, navigation }) => {
  const { itemId } = route.params;
  const dispatch = useAppDispatch();
  const { selectedItem, loading, error } = useAppSelector((state) => state.inventory);
  const [stockChange, setStockChange] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchInventoryItem(itemId));
    return () => {
      dispatch(clearSelectedItem());
    };
  }, [dispatch, itemId]);

  const handleStockUpdate = async (type: 'add' | 'remove') => {
    if (!selectedItem) return;

    const changeAmount = parseInt(stockChange);
    if (isNaN(changeAmount) || changeAmount <= 0) {
      Alert.alert('⚠️ Invalid Input', 'Please enter a valid positive number');
      return;
    }

    const newQuantity = type === 'add' 
      ? selectedItem.quantity + changeAmount 
      : selectedItem.quantity - changeAmount;

    if (newQuantity < 0) {
      Alert.alert('⚠️ Invalid Operation', 'Stock cannot go below zero');
      return;
    }

    setIsUpdating(true);
    try {
      await dispatch(updateInventoryStock({ id: selectedItem.id, quantity: newQuantity })).unwrap();
      
      // Add transaction
      dispatch(addTransaction({
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        type,
        quantity: changeAmount,
        previousQuantity: selectedItem.quantity,
        newQuantity,
      }));

      setStockChange('');
      Alert.alert('✅ Success', `Stock ${type === 'add' ? 'added' : 'removed'} successfully`);
    } catch (err) {
      Alert.alert('❌ Error', 'Failed to update stock');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading && !selectedItem) {
    return <LoadingSpinner message="Loading item details..." />;
  }

  if (error && !selectedItem) {
    return <ErrorMessage message={error} onRetry={() => dispatch(fetchInventoryItem(itemId))} />;
  }

  if (!selectedItem) {
    return <EmptyState message="Item not found" description="" />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Header Card */}
      <View className="bg-blue-600 px-6 py-8 shadow-lg">
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1 mr-4">
            <Text className="text-3xl font-bold text-white mb-2">{selectedItem.name}</Text>
            <Text className="text-blue-100 text-base">SKU: {selectedItem.sku}</Text>
          </View>
          <StatusBadge status={selectedItem.status} />
        </View>
        
        {/* Quick Stats */}
        <View className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 mt-4">
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-white text-3xl font-bold">{selectedItem.quantity}</Text>
              <Text className="text-blue-100 text-xs mt-1">Current Stock</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="px-6 py-6">
        {/* Item Details Card */}
        <View 
          className="bg-white rounded-3xl p-6 mb-6 shadow-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
          }}
        >
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-2">📋</Text>
            <Text className="text-xl font-bold text-gray-800">Item Details</Text>
          </View>
          
          <View className="space-y-4">
            <View className="flex-row justify-between py-4 border-b border-gray-100">
              <Text className="text-gray-600 text-base">Category</Text>
              <Text className="font-bold text-gray-800 text-base">{selectedItem.category}</Text>
            </View>
            
            <View className="flex-row justify-between py-4 border-b border-gray-100">
              <Text className="text-gray-600 text-base">Quantity</Text>
              <View className="bg-blue-100 px-4 py-2 rounded-full">
                <Text className="font-bold text-blue-600 text-lg">{selectedItem.quantity}</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between py-4 border-b border-gray-100">
              <Text className="text-gray-600 text-base">Supplier</Text>
              <Text className="font-bold text-gray-800 text-base">{selectedItem.supplier}</Text>
            </View>
            
            <View className="flex-row justify-between py-4">
              <Text className="text-gray-600 text-base">Last Updated</Text>
              <Text className="font-semibold text-gray-700 text-sm">{formatDate(selectedItem.updatedAt)}</Text>
            </View>
          </View>
        </View>

        {/* Stock Management Card */}
        <View 
          className="bg-white rounded-3xl p-6 shadow-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
          }}
        >
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-2">📦</Text>
            <Text className="text-xl font-bold text-gray-800">Update Stock</Text>
          </View>
          
          <View className="mb-5">
            <Text className="text-gray-700 font-semibold mb-2 text-base">Quantity</Text>
            <TextInput
              value={stockChange}
              onChangeText={setStockChange}
              placeholder="Enter quantity to add or remove"
              keyboardType="numeric"
              className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-base"
            />
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => handleStockUpdate('add')}
              disabled={isUpdating || !stockChange}
              className={`flex-1 py-4 rounded-xl ${
                isUpdating || !stockChange ? 'bg-gray-300' : 'bg-green-600'
              }`}
              style={{
                shadowColor: isUpdating || !stockChange ? 'transparent' : '#16a34a',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: isUpdating || !stockChange ? 0 : 5,
              }}
            >
              <Text className="text-white text-center font-bold text-base">
                {isUpdating ? '⏳ Updating...' : '➕ Add Stock'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleStockUpdate('remove')}
              disabled={isUpdating || !stockChange}
              className={`flex-1 py-4 rounded-xl ${
                isUpdating || !stockChange ? 'bg-gray-300' : 'bg-red-600'
              }`}
              style={{
                shadowColor: isUpdating || !stockChange ? 'transparent' : '#dc2626',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: isUpdating || !stockChange ? 0 : 5,
              }}
            >
              <Text className="text-white text-center font-bold text-base">
                {isUpdating ? '⏳ Updating...' : '➖ Remove Stock'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ItemDetailScreen;
