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
import { PlanCard } from '../../components/ui/PlanCard';
import { GradientButton } from '../../components/ui/GradientButton';
import { SectionHeader } from '../../components/ui/SectionHeader';

const PlanSelectionScreen = ({ navigation, route }: any) => {
  const [selectedPlan, setSelectedPlan] = useState<'daily' | 'weekly'>('weekly');

  const handleActivate = () => {
    navigation.navigate('Payment', { planType: selectedPlan });
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
          >
            <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <View style={styles.logoRow}>
            <LinearGradient
              colors={[...gradients.primary.colors]}
              style={styles.logoIcon}
            >
              <Ionicons name="shield-checkmark" size={16} color="#fff" />
            </LinearGradient>
            <Text style={styles.logoText}>RideSure</Text>
          </View>
          <View style={{ width: 32 }} />
        </View>

        {/* ─── Title Section ───────────────────────────────── */}
        <SectionHeader
          title="Choose your protection"
          subtitle="Select a plan that fits your gig work schedule. Instant activation, zero paperwork."
        />

        {/* ─── Daily Plan Card ─────────────────────────────── */}
        <PlanCard
          name="Daily Plan"
          price="₹10"
          period="day"
          features={[
            { text: '24-hour full coverage' },
            { text: 'Accidental disability cover' },
          ]}
          isSelected={selectedPlan === 'daily'}
          onSelect={() => setSelectedPlan('daily')}
          style={{ marginBottom: spacing.lg }}
        />

        {/* ─── Weekly Plan Card (Recommended) ──────────────── */}
        <PlanCard
          name="Weekly Plan"
          price="₹49"
          period="week"
          features={[
            { text: '7 days continuous protection' },
            { text: 'Medical expense reimbursement' },
            { text: 'Save 30% over daily plans' },
          ]}
          isRecommended
          isSelected={selectedPlan === 'weekly'}
          onSelect={() => setSelectedPlan('weekly')}
          style={{ marginBottom: spacing['2xl'] }}
        />

        {/* ─── Earnings Shield Section ─────────────────────── */}
        <View style={styles.earningsShield}>
          <LinearGradient
            colors={[...gradients.surfaceGlow.colors]}
            style={styles.earningsGradient}
          >
            <View style={styles.earningsIconRow}>
              <View style={styles.earningsIconBg}>
                <Ionicons name="shield-checkmark" size={20} color={colors.secondary} />
              </View>
              <Text style={styles.earningsTitle}>Earnings Shield Active</Text>
            </View>
            <Text style={styles.earningsDesc}>
              Your policy documentation will be generated instantly and sent to your registered email.
            </Text>
          </LinearGradient>
        </View>

        {/* ─── Activate Button ─────────────────────────────── */}
        <GradientButton
          title={`Activate ${selectedPlan === 'daily' ? 'Daily' : 'Weekly'} Plan`}
          onPress={handleActivate}
          style={{ marginBottom: spacing.lg }}
        />

        {/* ─── Terms ───────────────────────────────────────── */}
        <Text style={styles.terms}>
          By clicking activate, you agree to the{' '}
          <Text style={styles.termsLink}>Terms & Conditions</Text>
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
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '800',
    color: colors.onSurface,
  },

  // ─── Earnings Shield ───────────────────────────────
  earningsShield: {
    marginBottom: spacing['2xl'],
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
  },
  earningsGradient: {
    padding: spacing.cardPadding,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(106, 17, 203, 0.1)',
  },
  earningsIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  earningsIconBg: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.secondaryFixedDim + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  earningsTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.onSurface,
  },
  earningsDesc: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
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

export default PlanSelectionScreen;
