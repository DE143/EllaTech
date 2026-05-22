import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createInventoryItem } from '../store/slices/inventorySlice';
import { CreateInventoryItemDto } from '../types';

interface AddProductScreenProps {
  navigation: any;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.inventory);

  const [formData, setFormData] = useState<CreateInventoryItemDto>({
    sku: '',
    name: '',
    category: '',
    quantity: 0,
    supplier: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateInventoryItemDto, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateInventoryItemDto, string>> = {};

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (formData.sku.trim().length < 3) {
      newErrors.sku = 'SKU must be at least 3 characters';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Product name must be at least 2 characters';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }

    if (!formData.supplier.trim()) {
      newErrors.supplier = 'Supplier is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await dispatch(createInventoryItem(formData)).unwrap();
        Alert.alert(
          '✅ Success!',
          'Product added successfully',
          [{ text: 'OK', onPress: () => navigation.navigate('InventoryTab') }]
        );
      } catch (error) {
        Alert.alert('❌ Error', 'Failed to add product. Please try again.');
      }
    }
  };

  const updateField = (field: keyof CreateInventoryItemDto, value: string | number) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-b from-blue-50 to-gray-50"
    >
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="px-6 py-6">
          <View className="bg-white rounded-3xl p-6 shadow-lg" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
          }}>
            <View className="items-center mb-6">
              <View className="bg-blue-100 w-16 h-16 rounded-full items-center justify-center mb-3">
                <Text className="text-4xl">📦</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800">Add New Product</Text>
              <Text className="text-gray-500 text-sm mt-1">Fill in the details below</Text>
            </View>

            {/* SKU */}
            <View className="mb-5">
              <Text className="text-gray-700 font-semibold mb-2 text-base">SKU *</Text>
              <TextInput
                value={formData.sku}
                onChangeText={(text) => updateField('sku', text)}
                placeholder="e.g., PROD-001"
                className={`bg-gray-50 border-2 ${
                  errors.sku ? 'border-red-400' : 'border-gray-200'
                } rounded-xl px-4 py-4 text-base`}
                autoCapitalize="characters"
              />
              {errors.sku && (
                <Text className="text-red-500 text-sm mt-2">⚠️ {errors.sku}</Text>
              )}
            </View>

            {/* Product Name */}
            <View className="mb-5">
              <Text className="text-gray-700 font-semibold mb-2 text-base">Product Name *</Text>
              <TextInput
                value={formData.name}
                onChangeText={(text) => updateField('name', text)}
                placeholder="e.g., Wireless Mouse"
                className={`bg-gray-50 border-2 ${
                  errors.name ? 'border-red-400' : 'border-gray-200'
                } rounded-xl px-4 py-4 text-base`}
              />
              {errors.name && (
                <Text className="text-red-500 text-sm mt-2">⚠️ {errors.name}</Text>
              )}
            </View>

            {/* Category */}
            <View className="mb-5">
              <Text className="text-gray-700 font-semibold mb-2 text-base">Category *</Text>
              <TextInput
                value={formData.category}
                onChangeText={(text) => updateField('category', text)}
                placeholder="e.g., Electronics"
                className={`bg-gray-50 border-2 ${
                  errors.category ? 'border-red-400' : 'border-gray-200'
                } rounded-xl px-4 py-4 text-base`}
              />
              {errors.category && (
                <Text className="text-red-500 text-sm mt-2">⚠️ {errors.category}</Text>
              )}
            </View>

            {/* Quantity */}
            <View className="mb-5">
              <Text className="text-gray-700 font-semibold mb-2 text-base">Initial Quantity *</Text>
              <TextInput
                value={formData.quantity.toString()}
                onChangeText={(text) => updateField('quantity', parseInt(text) || 0)}
                placeholder="0"
                keyboardType="numeric"
                className={`bg-gray-50 border-2 ${
                  errors.quantity ? 'border-red-400' : 'border-gray-200'
                } rounded-xl px-4 py-4 text-base`}
              />
              {errors.quantity && (
                <Text className="text-red-500 text-sm mt-2">⚠️ {errors.quantity}</Text>
              )}
            </View>

            {/* Supplier */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2 text-base">Supplier *</Text>
              <TextInput
                value={formData.supplier}
                onChangeText={(text) => updateField('supplier', text)}
                placeholder="e.g., Tech Supplies Inc."
                className={`bg-gray-50 border-2 ${
                  errors.supplier ? 'border-red-400' : 'border-gray-200'
                } rounded-xl px-4 py-4 text-base`}
              />
              {errors.supplier && (
                <Text className="text-red-500 text-sm mt-2">⚠️ {errors.supplier}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              className={`py-5 rounded-xl ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
              style={{
                shadowColor: loading ? 'transparent' : '#3b82f6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: loading ? 0 : 5,
              }}
            >
              <Text className="text-white text-center font-bold text-lg">
                {loading ? '⏳ Adding Product...' : '✨ Add Product'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProductScreen;
