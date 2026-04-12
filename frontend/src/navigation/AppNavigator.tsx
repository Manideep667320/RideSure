import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/routes';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import SignUpDetailsScreen from '../screens/auth/SignUpDetailsScreen';

// Main Screens
import HomeScreen from '../screens/home/HomeScreen';
import PlanSelectionScreen from '../screens/plans/PlanSelectionScreen';
import PaymentScreen from '../screens/payment/PaymentScreen';
import ActiveProtectionScreen from '../screens/protection/ActiveProtectionScreen';
import ClaimFormScreen from '../screens/claims/ClaimFormScreen';
import ClaimProcessingScreen from '../screens/claims/ClaimProcessingScreen';
import ClaimSuccessScreen from '../screens/claims/ClaimSuccessScreen';
import HistoryScreen from '../screens/history/HistoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.AUTH.SPLASH}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f8f9fa' },
        gestureEnabled: true,
      }}
    >
      {/* ─── Auth Screens ─────────────────────────────── */}
      <Stack.Screen
        name={ROUTES.AUTH.SPLASH}
        component={SplashScreen}
      />
      <Stack.Screen
        name={ROUTES.AUTH.LOGIN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={ROUTES.AUTH.SIGNUP}
        component={SignupScreen}
      />
      <Stack.Screen
        name="SignUpDetails"
        component={SignUpDetailsScreen}
      />

      {/* ─── Main Screens ─────────────────────────────── */}
      <Stack.Screen
        name={ROUTES.MAIN.HOME}
        component={HomeScreen}
      />
      <Stack.Screen
        name={ROUTES.MAIN.PLAN_SELECTION}
        component={PlanSelectionScreen}
      />
      <Stack.Screen
        name={ROUTES.MAIN.PAYMENT}
        component={PaymentScreen}
      />
      <Stack.Screen
        name={ROUTES.MAIN.ACTIVE_PROTECTION}
        component={ActiveProtectionScreen}
      />
      <Stack.Screen
        name={ROUTES.MAIN.CLAIM_FORM}
        component={ClaimFormScreen}
      />
      <Stack.Screen
        name={ROUTES.MAIN.CLAIM_PROCESSING}
        component={ClaimProcessingScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.MAIN.CLAIM_SUCCESS}
        component={ClaimSuccessScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.MAIN.HISTORY}
        component={HistoryScreen}
      />
      <Stack.Screen
        name={ROUTES.MAIN.PROFILE}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};
