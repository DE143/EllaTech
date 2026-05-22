import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { registerUser } from '../store/slices/userSlice';

interface RegistrationScreenProps {
  onComplete: () => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onComplete }) => {
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { fullName?: string; email?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(registerUser({ fullName: fullName.trim(), email: email.trim() }));
      onComplete();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6 py-12">
          <View className="mb-8">
            <Text className="text-4xl font-bold text-gray-800 mb-2">Welcome! 👋</Text>
            <Text className="text-lg text-gray-600">
              Let's get started by creating your profile
            </Text>
          </View>

          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">Full Name</Text>
              <TextInput
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                placeholder="Enter your full name"
                className={`bg-gray-50 border ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                } rounded-lg px-4 py-3 text-base`}
                autoCapitalize="words"
              />
              {errors.fullName && (
                <Text className="text-red-500 text-sm mt-1">{errors.fullName}</Text>
              )}
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">Email Address</Text>
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                className={`bg-gray-50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg px-4 py-3 text-base`}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-600 py-4 rounded-lg shadow-sm"
            >
              <Text className="text-white text-center font-semibold text-base">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
