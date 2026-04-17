import React, { useState, useEffect } from 'react';
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
import { ProgressRing } from '../../components/ui/ProgressRing';
import { Button } from '../../components/common/Button';
import { policyService } from '../../services/policyService';

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

const ActiveProtectionScreen = ({ navigation }: any) => {
  const [policy, setPolicy] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivePolicy();
  }, []);

  const fetchActivePolicy = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await policyService.getActivePolicy();
      
      if (response && response.data) {
        setPolicy(response.data);
      } else {
        setError('No active protection found');
      }
    } catch (err: any) {
      console.error('Error fetching policy:', err);
      setError(err.message || 'Failed to load protection details');
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (!policy) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const endTime = new Date(policy.endTime).getTime();
      const remaining = Math.max(0, endTime - now);

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeRemaining({
        hours,
        minutes,
        seconds,
        totalSeconds: remaining / 1000,
      });

      if (remaining === 0) {
        clearInterval(timer);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [policy]);

  const totalDuration = policy
    ? (new Date(policy.endTime).getTime() - new Date(policy.startTime).getTime()) / 1000
    : 24 * 3600;
  const progress = Math.max(0, timeRemaining.totalSeconds / totalDuration);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryContainer} />
          <Text style={styles.loadingText}>Loading your protection...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !policy) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
          <Text style={styles.errorText}>{error || 'No active protection found'}</Text>
          <Button
            title="View Plans"
            onPress={() => navigation.navigate('PlanSelection')}
            style={{ marginTop: spacing.lg }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const startDate = new Date(policy.startTime).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const endDate = new Date(policy.endTime).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

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
          <View style={{ width: 40 }} />
        </View>

        {/* ─── Status Hero ─────────────────────────────────── */}
        <View style={styles.heroSection}>
          <View style={styles.heroCheckContainer}>
            <LinearGradient
              colors={[...gradients.success.colors]}
              style={styles.heroCheckBg}
            >
              <Ionicons name="checkmark" size={28} color="#fff" />
            </LinearGradient>
          </View>
          <Text style={styles.heroTitle}>You're Covered!</Text>
        </View>

        {/* ─── Timer Section ───────────────────────────────── */}
        <Card style={styles.timerCard}>
          <Text style={styles.timerLabel}>Time Remaining</Text>
          <View style={styles.timerContainer}>
            <ProgressRing progress={progress} size={180} strokeWidth={12}>
              <Text style={styles.timerValue}>
                {String(timeRemaining.hours).padStart(2, '0')}:
                {String(timeRemaining.minutes).padStart(2, '0')}:
                {String(timeRemaining.seconds).padStart(2, '0')}
              </Text>
              <Text style={styles.timerUnit}>
                {policy.type === 'daily' ? 'hours remaining' : 'hours remaining'}
              </Text>
            </ProgressRing>
          </View>
        </Card>

        {/* ─── Policy Details ──────────────────────────────── */}
        <Card style={styles.policyCard}>
          <View style={styles.policyHeader}>
            <View style={styles.policyIconBg}>
              <Ionicons name="document-text" size={20} color={colors.primaryContainer} />
            </View>
            <Text style={styles.policyTitle}>Policy Information</Text>
          </View>
          <View style={styles.policyMeta}>
            <Text style={styles.policyMetaLabel}>Policy ID:</Text>
            <Text style={styles.policyMetaValue}>{policy._id?.slice(-8).toUpperCase() || 'RIDESURE-001'}</Text>
          </View>
          <View style={styles.policyMeta}>
            <Text style={styles.policyMetaLabel}>Type:</Text>
            <Text style={styles.policyMetaValue}>
              {policy.type === 'daily' ? '24-Hour' : '7-Day'} Protection
            </Text>
          </View>
          <View style={styles.policyMeta}>
            <Text style={styles.policyMetaLabel}>Status:</Text>
            <View style={[styles.statusBadge, { backgroundColor: colors.successContainer }]}>
              <Text style={styles.statusBadgeText}>ACTIVE</Text>
            </View>
          </View>
        </Card>

        {/* ─── Coverage Period ──────────────────────────────– */}
        <Card style={styles.coverageCard}>
          <View style={styles.coverageHeader}>
            <View style={styles.coverageIconBg}>
              <Ionicons name="calendar-outline" size={20} color={colors.secondary} />
            </View>
            <Text style={styles.coverageTitle}>Coverage Period</Text>
          </View>

          <View style={styles.periodRow}>
            <View style={styles.periodItem}>
              <Text style={styles.periodLabel}>From</Text>
              <Text style={styles.periodValue}>{startDate}</Text>
            </View>
            <View style={styles.periodSeparator}>
              <View style={styles.periodLine} />
              <Ionicons name="arrow-forward" size={16} color={colors.onSurfaceVariant} />
              <View style={styles.periodLine} />
            </View>
            <View style={styles.periodItem}>
              <Text style={styles.periodLabel}>To</Text>
              <Text style={styles.periodValue}>{endDate}</Text>
            </View>
          </View>
        </Card>

        {/* ─── Actions ─────────────────────────────────────── */}
        <View style={styles.actionsRow}>
          <Button
            title="File a Claim"
            variant="secondary"
            onPress={() => navigation.navigate('ClaimForm')}
            style={{ flex: 1 }}
          />
          <Button
            title="View History"
            variant="outline"
            onPress={() => navigation.navigate('History')}
            style={{ flex: 1, marginLeft: spacing.md }}
          />
        </View>

        <View style={{ height: 20 }} />
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

  // ─── Loading State ─────────────────────────────────
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.lg,
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
  },

  // ─── Error State ───────────────────────────────────
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.screenPadding,
  },
  errorText: {
    marginTop: spacing.lg,
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    color: colors.error,
    textAlign: 'center',
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

  // ─── Hero Section ──────────────────────────────────
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  heroCheckContainer: {
    marginBottom: spacing.lg,
  },
  heroCheckBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6a11cb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 6,
  },
  heroTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.displaySm,
    fontWeight: '800',
    color: colors.onSurface,
  },

  // ─── Timer Card ────────────────────────────────────
  timerCard: {
    marginBottom: spacing['2xl'],
  },
  timerLabel: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerValue: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineLg,
    fontWeight: '800',
    color: colors.onSurface,
    textAlign: 'center',
  },
  timerUnit: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },

  // ─── Policy Card ───────────────────────────────────
  policyCard: {
    marginBottom: spacing.lg,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  policyIconBg: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  policyTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.onSurface,
  },
  policyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  policyMetaLabel: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
  },
  policyMetaValue: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  statusBadgeText: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodySm,
    fontWeight: '600',
    color: colors.onSuccess,
  },

  // ─── Coverage Card ─────────────────────────────────
  coverageCard: {
    marginBottom: spacing['2xl'],
  },
  coverageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  coverageIconBg: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverageTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.onSurface,
  },
  periodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  periodItem: {
    flex: 1,
    alignItems: 'center',
  },
  periodLabel: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  periodValue: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
  periodSeparator: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  periodLine: {
    width: 24,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },

  // ─── Actions Row ───────────────────────────────────
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});

export default ActiveProtectionScreen;
