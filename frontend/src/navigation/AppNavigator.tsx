import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/routes';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';

const createDeferredScreen = (
  loader: () => Promise<{ default: React.ComponentType<any> }>
) => {
  return function DeferredScreen(props: any) {
    const [ScreenComponent, setScreenComponent] = useState<React.ComponentType<any> | null>(null);

    useEffect(() => {
      let isMounted = true;

      loader()
        .then((module) => {
          if (isMounted) {
            setScreenComponent(() => module.default);
          }
        })
        .catch((error) => {
          console.error('Failed to load screen:', error);
        });

      return () => {
        isMounted = false;
      };
    }, []);

    if (!ScreenComponent) {
      return null;
    }

    return <ScreenComponent {...props} />;
  };
};

const LoginScreen = createDeferredScreen(() => import('../screens/auth/LoginScreen'));
const SignupScreen = createDeferredScreen(() => import('../screens/auth/SignupScreen'));
const SignUpDetailsScreen = createDeferredScreen(() => import('../screens/auth/SignUpDetailsScreen'));
const HomeScreen = createDeferredScreen(() => import('../screens/home/HomeScreen'));
const PlanSelectionScreen = createDeferredScreen(() => import('../screens/plans/PlanSelectionScreen'));
const PaymentScreen = createDeferredScreen(() => import('../screens/payment/PaymentScreen'));
const ActivationSuccessScreen = createDeferredScreen(() => import('../screens/protection/ActivationSuccessScreen'));
const ActiveProtectionScreen = createDeferredScreen(() => import('../screens/protection/ActiveProtectionScreen'));
const ClaimFormScreen = createDeferredScreen(() => import('../screens/claims/ClaimFormScreen'));
const ClaimProcessingScreen = createDeferredScreen(() => import('../screens/claims/ClaimProcessingScreen'));
const ClaimSuccessScreen = createDeferredScreen(() => import('../screens/claims/ClaimSuccessScreen'));
const HistoryScreen = createDeferredScreen(() => import('../screens/history/HistoryScreen'));
const ProfileScreen = createDeferredScreen(() => import('../screens/profile/ProfileScreen'));
const PersonalInfoScreen = createDeferredScreen(() => import('../screens/settings/PersonalInfoScreen'));
const PaymentMethodsScreen = createDeferredScreen(() => import('../screens/settings/PaymentMethodsScreen'));
const InsuranceDocumentsScreen = createDeferredScreen(() => import('../screens/settings/InsuranceDocumentsScreen'));
const HelpCenterScreen = createDeferredScreen(() => import('../screens/settings/HelpCenterScreen'));
const TermsPolicyScreen = createDeferredScreen(() => import('../screens/settings/TermsPolicyScreen'));

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
          name="ActivationSuccess"
          component={ActivationSuccessScreen}
          options={{ gestureEnabled: false }}
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
        <Stack.Screen
          name={ROUTES.MAIN.PERSONAL_INFO}
          component={PersonalInfoScreen}
        />
        <Stack.Screen
          name={ROUTES.MAIN.PAYMENT_METHODS}
          component={PaymentMethodsScreen}
        />
        <Stack.Screen
          name={ROUTES.MAIN.INSURANCE_DOCUMENTS}
          component={InsuranceDocumentsScreen}
        />
        <Stack.Screen
          name={ROUTES.MAIN.HELP_CENTER}
          component={HelpCenterScreen}
        />
        <Stack.Screen
          name={ROUTES.MAIN.TERMS_POLICY}
          component={TermsPolicyScreen}
        />
    </Stack.Navigator>
  );
};
