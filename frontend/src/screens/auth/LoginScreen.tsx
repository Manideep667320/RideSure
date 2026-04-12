import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'; // <--- NATIVE DEPENDENCY
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { InputField } from '../../components/ui/InputField';
import { GradientButton } from '../../components/ui/GradientButton';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { configureGoogleSignIn, signInWithGoogle } from '../../services/googleSignInService';

const LoginScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  // We use the Native FirebaseAuthTypes confirmation result now! 
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login } = useAuth();
  
  // Initialize Google Sign-In on component mount
  useEffect(() => {
    configureGoogleSignIn();
  }, []);
  
  // Notice we completely dropped the Web SDK `RecaptchaVerifier`!

  const sendVerification = async () => {
    try {
      setLoading(true);
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      
      // Hardware-bound Native Verification Request
      const confirmation = await auth().signInWithPhoneNumber(formattedPhone);
      setConfirm(confirmation);

    } catch (err: any) {
      alert(`Error sending SMS: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const confirmCode = async () => {
    try {
      setLoading(true);
      if (!confirm) return;

      // Native Confirmation Verification Object
      const result = await confirm.confirm(code);
      if (result && result.user) {
         const token = await result.user.getIdToken();
         
         // Pass token to Backend to get Mongo Data
         await login(token);
         
         const freshUserResponse = await api.get<any>('/auth/me');
         
         if (!freshUserResponse.data.data.name) {
            navigation.replace('SignUpDetails');
         } else {
            navigation.reset({
               index: 0,
               routes: [{ name: ROUTES.MAIN.HOME }],
            });
         }
      }

    } catch (err: any) {
      alert(`Invalid OTP Code: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithGoogle();
      
      if (result && result.token) {
        // Pass token to Backend to get Mongo Data
        await login(result.token);
        
        const freshUserResponse = await api.get<any>('/auth/me');
        
        if (!freshUserResponse.data.data.name) {
          navigation.replace('SignUpDetails');
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: ROUTES.MAIN.HOME }],
          });
        }
      }
    } catch (err: any) {
      alert(`Google Sign-In Error: ${err.message}`);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <View style={styles.logoBg}>
                <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
              </View>
              <Text style={styles.logoText}>RideSure</Text>
            </View>
            <Text style={styles.brandDesc}>Always active protection synced with Native Firebase.</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.welcomeTitle}>{confirm ? "Enter OTP" : "Welcome back"}</Text>
            
            {!confirm ? (
              <>
                <View style={styles.inputWrapper}>
                  <InputField
                    label="Phone Number"
                    placeholder="e.g. 98765 43210 (exclude +91)"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>

                <GradientButton 
                  title={loading ? "Sending..." : "Send Secure OTP"} 
                  onPress={sendVerification} 
                  style={{ marginTop: 8 }}
                />

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Google Sign-In Button */}
                <TouchableOpacity 
                  style={styles.googleButton}
                  onPress={handleGoogleSignIn}
                  disabled={googleLoading}
                >
                  <Ionicons name="logo-google" size={20} color={colors.primary} />
                  <Text style={styles.googleButtonText}>
                    {googleLoading ? "Signing in..." : "Sign in with Google"}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
               <>
                <View style={styles.inputWrapper}>
                   <InputField
                    label="OTP Code from SMS"
                    placeholder="123456"
                    value={code}
                    onChangeText={setCode}
                    keyboardType="numeric"
                  />
                </View>

                <GradientButton 
                  title={loading ? "Verifying..." : "Verify & Seamless Login"} 
                  onPress={confirmCode} 
                  style={{ marginTop: 8 }}
                />
               </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: spacing.screenPadding, justifyContent: 'center' },
  header: { marginBottom: spacing['3xl'] },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  logoBg: { width: 48, height: 48, borderRadius: borderRadius.md, backgroundColor: colors.primaryFixed, alignItems: 'center', justifyContent: 'center' },
  logoText: { fontFamily: typography.fontFamily.headlineBold, fontSize: typography.fontSize.titleLg, color: colors.primary },
  brandDesc: { fontFamily: typography.fontFamily.bodyMedium, fontSize: typography.fontSize.bodyLg, color: colors.onSurfaceVariant, lineHeight: 24 },
  formSection: { backgroundColor: colors.surfaceContainerLowest, padding: spacing.xl, borderRadius: borderRadius['2xl'], shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 2, marginBottom: spacing.xl },
  welcomeTitle: { fontFamily: typography.fontFamily.headlineBold, fontSize: typography.fontSize.headlineMd, color: colors.onSurface, marginBottom: 16 },
  inputWrapper: { marginBottom: spacing.lg },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  dividerText: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.outline,
    backgroundColor: colors.surface,
    gap: 12,
  },
  googleButtonText: {
    fontFamily: typography.fontFamily.labelLarge,
    fontSize: typography.fontSize.labelLg,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
