import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { InputField } from '../../components/ui/InputField';
import { GradientButton } from '../../components/ui/GradientButton';
import { ROUTES } from '../../constants/routes';

const SignupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = () => {
    // Navigate straight to home for this flow
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.MAIN.HOME }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
            </TouchableOpacity>
            <View style={styles.logoRow}>
              <View style={styles.logoBg}>
                <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
              </View>
              <Text style={styles.logoText}>RideSure</Text>
            </View>
            <Text style={styles.brandDesc}>
              Join thousands of gig workers protected daily.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            <Text style={styles.welcomeTitle}>Create account</Text>
            <Text style={styles.welcomeSubtitle}>
              Let's get your specialized dashboard set up.
            </Text>

            <View style={styles.inputWrapper}>
              <InputField
                label="Full Name"
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChangeText={setName}
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <InputField
                label="Phone Number"
                placeholder="e.g. 98765 43210"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputWrapper}>
              <InputField
                label="Primary Role"
                placeholder="e.g. Delivery Partner"
                value={role}
                onChangeText={setRole}
              />
            </View>

            <GradientButton 
              title="Join RideSure" 
              onPress={handleSignup} 
              style={{ marginTop: 8 }}
            />
            
            <View style={styles.signUpRow}>
              <Text style={styles.signUpText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.AUTH.LOGIN)}>
                <Text style={styles.signUpLink}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.termsText}>
            By signing up, you agree to our Terms of Service and Privacy Policy. Standard SMS rates may apply.
          </Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.screenPadding,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing['3xl'],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  logoBg: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.titleLg,
    fontWeight: '800',
    color: colors.primary,
  },
  brandDesc: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
  },
  formSection: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.xl,
    borderRadius: borderRadius['2xl'],
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    marginBottom: spacing.xl,
  },
  welcomeTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineMd,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  inputWrapper: {
    marginBottom: spacing.lg,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  signUpText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
  },
  signUpLink: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    color: colors.primary,
    fontWeight: '600',
  },
  footer: {
    padding: spacing.screenPadding,
    paddingBottom: spacing['2xl'],
  },
  termsText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SignupScreen;
