import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50 px-6">
      <View className="bg-red-50 border border-red-200 rounded-lg p-6 w-full max-w-md">
        <Text className="text-red-800 text-lg font-semibold mb-2">Error</Text>
        <Text className="text-red-600 text-base mb-4">{message}</Text>
        {onRetry && (
          <TouchableOpacity
            onPress={onRetry}
            className="bg-red-600 py-3 px-6 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">Try Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ErrorMessage;
