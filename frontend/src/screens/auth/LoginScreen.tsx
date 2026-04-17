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
import { configureGoogleSignIn, signInWithGoogle } from '../../services/googleSignInService';

type AuthMode = 'phone' | 'email';

const LoginScreen = ({ navigation }: any) => {
  const [authMode, setAuthMode] = useState<AuthMode>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // We use the Native FirebaseAuthTypes confirmation result now! 
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login } = useAuth();
  
  // Initialize Google Sign-In on component mount
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleAuthenticatedUser = async (firebaseToken: string) => {
    const user = await login(firebaseToken);

    if (!user.name) {
      navigation.replace('SignUpDetails');
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.MAIN.HOME }],
    });
  };

  const switchAuthMode = (mode: AuthMode) => {
    setAuthMode(mode);
    setConfirm(null);
    setCode('');
  };

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
         await handleAuthenticatedUser(token);
      }

    } catch (err: any) {
      alert(`Invalid OTP Code: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      setLoading(true);
      const credential = await auth().signInWithEmailAndPassword(
        email.trim(),
        password
      );

      const token = await credential.user.getIdToken();
      await handleAuthenticatedUser(token);
    } catch (err: any) {
      alert(`Email Login Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithGoogle();
      
      if (result && result.token) {
        await handleAuthenticatedUser(result.token);
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
            <Text style={styles.welcomeTitle}>
              {authMode === 'phone' && confirm ? 'Enter OTP' : 'Welcome back'}
            </Text>

            <View style={styles.authModeSwitch}>
              <TouchableOpacity
                style={[
                  styles.authModeTab,
                  authMode === 'phone' && styles.authModeTabActive,
                ]}
                onPress={() => switchAuthMode('phone')}
              >
                <Text
                  style={[
                    styles.authModeLabel,
                    authMode === 'phone' && styles.authModeLabelActive,
                  ]}
                >
                  Phone Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.authModeTab,
                  authMode === 'email' && styles.authModeTabActive,
                ]}
                onPress={() => switchAuthMode('email')}
              >
                <Text
                  style={[
                    styles.authModeLabel,
                    authMode === 'email' && styles.authModeLabelActive,
                  ]}
                >
                  Email Login
                </Text>
              </TouchableOpacity>
            </View>
            
            {authMode === 'phone' ? (
              !confirm ? (
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
              )
            ) : (
              <>
                <View style={styles.inputWrapper}>
                  <InputField
                    label="Email Address"
                    placeholder="e.g. rider@ridesure.app"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <InputField
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <GradientButton
                  title={loading ? 'Signing in...' : 'Login with Email'}
                  onPress={handleEmailSignIn}
                  style={{ marginTop: 8 }}
                />

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Or use Google</Text>
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
  authModeSwitch: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.full,
    padding: spacing.xs,
    marginBottom: spacing.lg,
  },
  authModeTab: {
    flex: 1,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authModeTabActive: {
    backgroundColor: colors.primary,
  },
  authModeLabel: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelLg,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  authModeLabelActive: {
    color: colors.onPrimary,
  },
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
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelLg,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
