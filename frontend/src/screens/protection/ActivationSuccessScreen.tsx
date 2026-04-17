import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { gradients } from '../../theme/gradients';
import { shadows } from '../../theme/shadows';
import { Card } from '../../components/common/Card';

const ActivationSuccessScreen = ({ navigation, route }: any) => {
  const policy = route?.params?.policy;
  const planType = route?.params?.planType || 'weekly';

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const getPlanStatus = () => {
    const type = planType === 'daily' ? '24-hour' : '7-day';
    const amount = planType === 'daily' ? '₹10' : '₹49';
    return { type, amount };
  };

  const planStatus = getPlanStatus();
  const startDate = policy?.startTime ? new Date(policy.startTime) : new Date();
  const endDate = policy?.endTime ? new Date(policy.endTime) : new Date();

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
              <Ionicons name="checkmark" size={48} color="#fff" />
            </LinearGradient>
          </View>
          <Text style={styles.heroTitle}>Protection Activated</Text>
          <Text style={styles.heroSubtitle}>You're now covered!</Text>
        </View>

        {/* ─── Coverage Details ────────────────────────────── */}
        <Card style={styles.protectionCard}>
          <View style={styles.protectionRow}>
            <View style={styles.protectionIcon}>
              <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
            </View>
            <View style={styles.protectionContent}>
              <Text style={styles.protectionLabel}>Coverage Duration</Text>
              <Text style={styles.protectionValue}>{planStatus.type} {planType} Plan</Text>
            </View>
          </View>
        </Card>

        {/* ─── Policy Details ──────────────────────────────– */}
        <Card style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Policy Details</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Text style={styles.detailLabelText}>Policy ID</Text>
            </View>
            <Text style={styles.detailValue}>{policy?._id?.slice(-8).toUpperCase() || 'RIDESURE-001'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Text style={styles.detailLabelText}>Amount Paid</Text>
            </View>
            <Text style={styles.detailValue}>{planStatus.amount}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Text style={styles.detailLabelText}>Valid Till</Text>
            </View>
            <Text style={styles.detailValue}>
              {endDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </Card>

        {/* ─── Next Steps ────────────────────────────────── */}
        <Card variant="surface" level="low" style={styles.stepsCard}>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Policy document sent</Text>
              <Text style={styles.stepDesc}>Check your email for details</Text>
            </View>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Coverage is active now</Text>
              <Text style={styles.stepDesc}>Begin your trips with confidence</Text>
            </View>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
              </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>File claims anytime</Text>
              <Text style={styles.stepDesc}>Easy claim submission process</Text>
            </View>
          </View>
        </Card>

        {/* ─── Auto-redirect Message ───────────────────────── */}
        <View style={styles.redirectMessage}>
          <Ionicons name="information-circle" size={20} color={colors.primaryContainer} />
          <Text style={styles.redirectText}>Redirecting to home in 5 seconds...</Text>
        </View>

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

  // ─── Logo ──────────────────────────────────────────
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing['3xl'],
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

  // ─── Hero Section ──────────────────────────────────
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  successCheckContainer: {
    marginBottom: spacing.lg,
  },
  successCheckBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.displaySm,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurfaceVariant,
  },

  // ─── Protection Card ───────────────────────────────
  protectionCard: {
    marginBottom: spacing.lg,
  },
  protectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  protectionIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  protectionContent: {
    flex: 1,
  },
  protectionLabel: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  protectionValue: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.onSurface,
  },

  // ─── Details Card ──────────────────────────────────
  detailsCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  detailsTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  detailLabel: {
    flex: 1,
  },
  detailLabelText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
  },
  detailValue: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
  },

  // ─── Steps Card ────────────────────────────────────
  stepsCard: {
    marginBottom: spacing.lg,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 4,
  },
  stepDesc: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
  },

  // ─── Redirect Message ──────────────────────────────
  redirectMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryContainer + '15',
  },
  redirectText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.primaryContainer,
  },
});

export default ActivationSuccessScreen;
