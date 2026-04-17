import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { gradients } from '../../theme/gradients';
import { shadows } from '../../theme/shadows';
import { Card } from '../../components/common/Card';
import { GradientButton } from '../../components/ui/GradientButton';
import { policyService } from '../../services/policyService';

type UPIOption = 'gpay' | 'phonepe' | 'paytm' | 'bhim';

const PaymentScreen = ({ navigation, route }: any) => {
  const [selectedUPI, setSelectedUPI] = useState<UPIOption>('gpay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const planType = route?.params?.planType || 'weekly';
  const planDetails: Record<string, { amount: string; name: string }> = {
    daily: { amount: '₹10', name: 'Daily Gig Protection Plan' },
    weekly: { amount: '₹49', name: 'Weekly Gig Protection Plan' },
  };

  const upiOptions: { id: UPIOption; name: string; icon: string }[] = [
    { id: 'gpay', name: 'Google Pay', icon: 'logo-google' },
    { id: 'phonepe', name: 'PhonePe', icon: 'phone-portrait-outline' },
    { id: 'paytm', name: 'Paytm', icon: 'wallet-outline' },
    { id: 'bhim', name: 'BHIM UPI', icon: 'card-outline' },
  ];

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create policy via API
      const response = await policyService.createPolicy(planType as 'daily' | 'weekly');
      
      if (response && response.data) {
        // Navigate to success screen
        navigation.replace('ActivationSuccess', { policy: response.data, planType });
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Header ──────────────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            disabled={loading}
          >
            <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* ─── Amount Section ──────────────────────────────── */}
        <Card style={styles.amountCard}>
          <LinearGradient
            colors={[...gradients.hero.colors]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.amountGradient}
          >
            <Text style={styles.amountLabel}>Amount to Pay</Text>
            <Text style={styles.amountValue}>{planDetails[planType]?.amount}</Text>
            <Text style={styles.amountPlan}>{planDetails[planType]?.name}</Text>
          </LinearGradient>
        </Card>

        {/* ─── Error Message ──────────────────────────────── */}
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color={colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* ─── UPI Options ─────────────────────────────────── */}
        <Text style={styles.sectionTitle}>UPI Options</Text>

        <View style={styles.upiGrid}>
          {upiOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedUPI(option.id)}
              activeOpacity={0.8}
              disabled={loading}
              style={[
                styles.upiOption,
                selectedUPI === option.id && styles.upiOptionSelected,
              ]}
            >
              <View
                style={[
                  styles.upiIconContainer,
                  selectedUPI === option.id && styles.upiIconContainerSelected,
                ]}
              >
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color={
                    selectedUPI === option.id
                      ? colors.primaryContainer
                      : colors.onSurfaceVariant
                  }
                />
              </View>
              <Text
                style={[
                  styles.upiLabel,
                  selectedUPI === option.id && styles.upiLabelSelected,
                ]}
              >
                {option.name}
              </Text>
              {selectedUPI === option.id && (
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.primaryContainer} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ─── Pay Button ──────────────────────────────────── */}
        <GradientButton
          title={loading ? 'Processing...' : `Pay Now — ${planDetails[planType]?.amount}`}
          onPress={handlePayment}
          disabled={loading}
          size="lg"
          style={{ marginTop: spacing['2xl'] }}
        />

        {/* ─── Terms ───────────────────────────────────────── */}
        <Text style={styles.terms}>
          By clicking "Pay Now", you agree to the{' '}
          <Text style={styles.termsLink}>Terms & Conditions</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Policy Wording</Text>.
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  contentContainer: {
    padding: spacing.screenPadding,
  },

  // ─── Header ────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.onSurface,
  },

  // ─── Amount Card ───────────────────────────────────
  amountCard: {
    marginBottom: spacing['2xl'],
    overflow: 'hidden',
  },
  amountGradient: {
    padding: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountLabel: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  amountValue: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.displaySm,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  amountPlan: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  // ─── Error Message ─────────────────────────────────
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorContainer,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    gap: 12,
  },
  errorText: {
    flex: 1,
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.error,
  },

  // ─── Section Title ─────────────────────────────────
  sectionTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.headlineSm,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.lg,
  },

  // ─── UPI Grid ──────────────────────────────────────
  upiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  upiOption: {
    flex: 1,
    minWidth: '45%',
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.outline,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upiOptionSelected: {
    borderColor: colors.primaryContainer,
    backgroundColor: colors.primaryContainer + '10',
  },
  upiIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  upiIconContainerSelected: {
    backgroundColor: colors.primaryFixedDim,
  },
  upiLabel: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodySm,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  upiLabelSelected: {
    color: colors.onSurface,
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },

  // ─── Terms ─────────────────────────────────────────
  terms: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default PaymentScreen;
