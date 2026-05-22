import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { useAppSelector } from './src/store/hooks';
import RegistrationScreen from './src/screens/RegistrationScreen';
import AppNavigator from './src/navigation/AppNavigator';

function AppContent() {
  const isRegistered = useAppSelector((state) => state.user.isRegistered);
  const [showApp, setShowApp] = useState(false);

  if (!isRegistered && !showApp) {
    return <RegistrationScreen onComplete={() => setShowApp(true)} />;
  }

  return <AppNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <AppContent />
    </Provider>
  );
}
