import React from 'react';
import { View, Text } from 'react-native';

interface EmptyStateProps {
  message: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, description }) => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50 px-6">
      <Text className="text-gray-400 text-6xl mb-4">📦</Text>
      <Text className="text-gray-700 text-xl font-semibold mb-2">{message}</Text>
      {description && (
        <Text className="text-gray-500 text-base text-center">{description}</Text>
      )}
    </View>
  );
};

export default EmptyState;
