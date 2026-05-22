import React from 'react';
import { View, Text } from 'react-native';

interface StatusBadgeProps {
  status: 'in stock' | 'low stock' | 'out of stock';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'in stock':
        return 'bg-green-100 border-green-500';
      case 'low stock':
        return 'bg-yellow-100 border-yellow-500';
      case 'out of stock':
        return 'bg-red-100 border-red-500';
    }
  };

  const getTextStyles = () => {
    switch (status) {
      case 'in stock':
        return 'text-green-700';
      case 'low stock':
        return 'text-yellow-700';
      case 'out of stock':
        return 'text-red-700';
    }
  };

  return (
    <View className={`px-3 py-1 rounded-full border ${getStatusStyles()}`}>
      <Text className={`text-xs font-semibold uppercase ${getTextStyles()}`}>
        {status}
      </Text>
    </View>
  );
};

export default StatusBadge;
