import React from 'react';
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
import { Button } from '../../components/common/Button';
import { GradientButton } from '../../components/ui/GradientButton';

const ClaimSuccessScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Logo ────────────────────────────────────────── */}
        <View style={styles.logoRow}>
          <LinearGradient
            colors={[...gradients.primary.colors]}
            style={styles.logoIcon}
          >
            <Ionicons name="shield-checkmark" size={16} color="#fff" />
          </LinearGradient>
          <Text style={styles.logoText}>RideSure</Text>
        </View>

        {/* ─── Success Hero ────────────────────────────────── */}
        <View style={styles.heroSection}>
          <View style={styles.successCheckContainer}>
            <LinearGradient
              colors={[...gradients.success.colors]}
              style={styles.successCheckBg}
            >
              <Ionicons name="checkmark" size={36} color="#fff" />
            </LinearGradient>
          </View>
          <Text style={styles.heroTitle}>Claim Approved ✅</Text>
        </View>

        {/* ─── Payout Card ─────────────────────────────────── */}
        <Card style={styles.payoutCard}>
          <LinearGradient
            colors={[...gradients.hero.colors]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.payoutGradient}
          >
            <Text style={styles.payoutLabel}>Amount Credited</Text>
            <Text style={styles.payoutAmount}>₹5,000</Text>
            <Text style={styles.payoutSubtext}>credited instantly</Text>
            <View style={styles.payoutBadge}>
              <Text style={styles.payoutBadgeText}>#TXN-88219403</Text>
            </View>
          </LinearGradient>
        </Card>

        {/* ─── Transaction Details ─────────────────────────── */}
        <Card style={styles.transactionCard}>
          {/* From */}
          <View style={styles.txRow}>
            <View style={styles.txIconBg}>
              <Ionicons name="business-outline" size={20} color={colors.primaryContainer} />
            </View>
            <View style={styles.txContent}>
              <Text style={styles.txLabel}>RideSure Payouts</Text>
              <Text style={styles.txValue}>Corporate Account •••• 9012</Text>
            </View>
          </View>

          {/* Arrow */}
          <View style={styles.txArrowContainer}>
            <View style={styles.txLine} />
            <View style={styles.txArrowBg}>
              <Ionicons name="arrow-down" size={16} color={colors.primaryContainer} />
            </View>
            <View style={styles.txLine} />
          </View>

          {/* To */}
          <View style={styles.txRow}>
            <View style={[styles.txIconBg, { backgroundColor: colors.secondaryFixedDim + '20' }]}>
              <Ionicons name="wallet-outline" size={20} color={colors.secondary} />
            </View>
            <View style={styles.txContent}>
              <Text style={styles.txLabel}>Your Bank Account</Text>
              <Text style={styles.txValue}>HDFC Bank •••• 4421</Text>
            </View>
          </View>
        </Card>

        {/* ─── Action Buttons ──────────────────────────────── */}
        <View style={styles.actionsContainer}>
          <Button
            title="Download Receipt"
            variant="secondary"
            onPress={() => { }}
            fullWidth
            icon={<Ionicons name="download-outline" size={18} color={colors.onPrimaryFixedVariant} />}
          />
          <Button
            title="Share Success"
            variant="outline"
            onPress={() => { }}
            fullWidth
            icon={<Ionicons name="share-outline" size={18} color={colors.onSurface} />}
          />
        </View>

        {/* ─── Home CTA ────────────────────────────────────── */}
        <GradientButton
          title="Back to Home"
          onPress={() => navigation.navigate('Home')}
          style={{ marginTop: spacing.lg }}
        />

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
    alignItems: 'center',
  },

  // ─── Logo ──────────────────────────────────────────
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing['4xl'],
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

  // ─── Hero ──────────────────────────────────────────
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  successCheckContainer: {
    marginBottom: 20,
  },
  successCheckBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primaryTinted,
  },
  heroTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    fontWeight: '800',
    color: colors.primaryContainer,
  },

  // ─── Payout Card ───────────────────────────────────
  payoutCard: {
    width: '100%',
    marginBottom: spacing.sectionGap,
    padding: 0,
    overflow: 'hidden',
  },
  payoutGradient: {
    padding: spacing['3xl'],
    alignItems: 'center',
    borderRadius: borderRadius['2xl'],
  },
  payoutLabel: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  payoutAmount: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.displaySm,
    fontWeight: '800',
    color: colors.onPrimary,
    marginBottom: 4,
  },
  payoutSubtext: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 16,
  },
  payoutBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  payoutBadgeText: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.labelMd,
    fontWeight: '600',
    color: colors.onPrimary,
    letterSpacing: 0.5,
  },

  // ─── Transaction ───────────────────────────────────
  transactionCard: {
    width: '100%',
    marginBottom: spacing.sectionGap,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txIconBg: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txContent: {
    flex: 1,
  },
  txLabel: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 2,
  },
  txValue: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
  },
  txArrowContainer: {
    alignItems: 'center',
    marginVertical: 8,
    marginLeft: 22,
  },
  txLine: {
    width: 1,
    height: 12,
    backgroundColor: colors.outlineVariant,
  },
  txArrowBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ─── Actions ───────────────────────────────────────
  actionsContainer: {
    width: '100%',
    gap: spacing.compactGap,
  },
});

export default ClaimSuccessScreen;
