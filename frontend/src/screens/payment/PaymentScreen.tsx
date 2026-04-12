import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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

type UPIOption = 'gpay' | 'phonepe' | 'paytm' | 'bhim';

const PaymentScreen = ({ navigation }: any) => {
  const [selectedUPI, setSelectedUPI] = useState<UPIOption>('gpay');

  const upiOptions: { id: UPIOption; name: string; icon: string }[] = [
    { id: 'gpay', name: 'Google Pay', icon: 'logo-google' },
    { id: 'phonepe', name: 'PhonePe', icon: 'phone-portrait-outline' },
    { id: 'paytm', name: 'Paytm', icon: 'wallet-outline' },
    { id: 'bhim', name: 'BHIM UPI', icon: 'card-outline' },
  ];

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
            <Text style={styles.amountValue}>₹10</Text>
            <Text style={styles.amountPlan}>Daily Gig Protection Plan</Text>
          </LinearGradient>
        </Card>

        {/* ─── UPI Options ─────────────────────────────────── */}
        <Text style={styles.sectionTitle}>UPI Options</Text>

        <View style={styles.upiGrid}>
          {upiOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedUPI(option.id)}
              activeOpacity={0.8}
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
          title="Pay Now — ₹10"
          onPress={() => navigation.navigate('ActiveProtection')}
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
    fontSize: typography.fontSize.titleLg,
    fontWeight: '700',
    color: colors.onSurface,
  },

  // ─── Amount Card ───────────────────────────────────
  amountCard: {
    marginBottom: spacing['2xl'],
    padding: 0,
    overflow: 'hidden',
  },
  amountGradient: {
    padding: spacing['3xl'],
    alignItems: 'center',
    borderRadius: borderRadius['2xl'],
  },
  amountLabel: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  amountValue: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.displaySm,
    fontWeight: '800',
    color: colors.onPrimary,
    marginBottom: 4,
  },
  amountPlan: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: 'rgba(255,255,255,0.7)',
  },

  // ─── UPI Section ───────────────────────────────────
  sectionTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.lg,
  },
  upiGrid: {
    gap: spacing.compactGap,
  },
  upiOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  upiOptionSelected: {
    backgroundColor: colors.primaryFixed,
    borderWidth: 1.5,
    borderColor: colors.primaryContainer,
  },
  upiIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  upiIconContainerSelected: {
    backgroundColor: colors.surfaceContainerLowest,
  },
  upiLabel: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyLg,
    fontWeight: '600',
    color: colors.onSurface,
    flex: 1,
  },
  upiLabelSelected: {
    color: colors.primary,
  },
  checkIcon: {
    marginLeft: 8,
  },

  // ─── Terms ─────────────────────────────────────────
  terms: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.lg,
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default PaymentScreen;
