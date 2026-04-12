import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';

import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="dark" />
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
