import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { Transaction } from '../types';
import EmptyState from '../components/EmptyState';
import config from '../config/env';

const ITEMS_PER_PAGE = config.pagination.itemsPerPage;

const TransactionsScreen: React.FC = () => {
  const { transactions } = useAppSelector((state) => state.transactions);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View 
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
          <Text className="text-lg font-bold text-gray-900 mb-1">{item.itemName}</Text>
          <Text className="text-sm text-gray-500">{formatDate(item.timestamp)}</Text>
        </View>
        <View className={`px-4 py-2 rounded-full ${
          item.type === 'add' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <Text className={`text-base font-bold ${
            item.type === 'add' ? 'text-green-700' : 'text-red-700'
          }`}>
            {item.type === 'add' ? '+' : '-'}{item.quantity}
          </Text>
        </View>
      </View>
      
      <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <View>
          <Text className="text-xs text-gray-500 mb-1">Previous</Text>
          <Text className="text-base font-semibold text-gray-700">{item.previousQuantity}</Text>
        </View>
        <Text className="text-2xl text-gray-400">→</Text>
        <View>
          <Text className="text-xs text-gray-500 mb-1">New</Text>
          <Text className="text-base font-semibold text-blue-600">{item.newQuantity}</Text>
        </View>
        <View className="flex-1 items-end">
          <View className={`px-3 py-1 rounded-full ${
            item.type === 'add' ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <Text className={`text-xs font-semibold uppercase ${
              item.type === 'add' ? 'text-green-700' : 'text-red-700'
            }`}>
              {item.type === 'add' ? 'Added' : 'Removed'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (transactions.length === 0) {
    return (
      <View className="flex-1 bg-gradient-to-b from-blue-50 to-gray-50">
        <View className="bg-blue-600 px-6 pt-14 pb-8 shadow-lg">
          <Text className="text-3xl font-bold text-white mb-2">Transaction History</Text>
          <Text className="text-blue-100 text-base">Track all stock changes</Text>
        </View>
        <EmptyState
          message="No transactions yet"
          description="Stock changes will appear here when you update inventory"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Header */}
      <View className="bg-blue-600 px-6 pt-14 pb-8 shadow-lg">
        <Text className="text-3xl font-bold text-white mb-2">Transaction History</Text>
        <Text className="text-blue-100 text-base">{transactions.length} total transactions</Text>
        
        {/* Stats Card */}
        <View className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 mt-4 flex-row justify-around">
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">
              {transactions.filter(t => t.type === 'add').length}
            </Text>
            <Text className="text-blue-100 text-xs">Stock Added</Text>
          </View>
          <View className="w-px bg-white/30" />
          <View className="items-center">
            <Text className="text-white text-2xl font-bold">
              {transactions.filter(t => t.type === 'remove').length}
            </Text>
            <Text className="text-blue-100 text-xs">Stock Removed</Text>
          </View>
        </View>
      </View>

      {/* Transactions List */}
      <FlatList
        data={paginatedTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        ListFooterComponent={
          totalPages > 1 ? (
            <View className="mt-4">
              <View className="flex-row justify-between items-center bg-white rounded-2xl p-5 shadow-md">
                <TouchableOpacity
                  onPress={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-6 py-3 rounded-xl ${
                    currentPage === 1 ? 'bg-gray-200' : 'bg-blue-600'
                  }`}
                  style={{
                    shadowColor: currentPage === 1 ? 'transparent' : '#3b82f6',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: currentPage === 1 ? 0 : 3,
                  }}
                >
                  <Text className={`font-bold ${
                    currentPage === 1 ? 'text-gray-400' : 'text-white'
                  }`}>
                    ← Previous
                  </Text>
                </TouchableOpacity>

                <View className="bg-blue-50 px-4 py-2 rounded-xl">
                  <Text className="text-blue-600 font-bold">
                    {currentPage} / {totalPages}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-6 py-3 rounded-xl ${
                    currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-600'
                  }`}
                  style={{
                    shadowColor: currentPage === totalPages ? 'transparent' : '#3b82f6',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: currentPage === totalPages ? 0 : 3,
                  }}
                >
                  <Text className={`font-bold ${
                    currentPage === totalPages ? 'text-gray-400' : 'text-white'
                  }`}>
                    Next →
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default TransactionsScreen;
