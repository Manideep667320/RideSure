import React, { useState, useEffect } from 'react';
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
import { ProgressRing } from '../../components/ui/ProgressRing';
import { Button } from '../../components/common/Button';

const ActiveProtectionScreen = ({ navigation }: any) => {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  // Simulated countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const progress = (timeRemaining.hours * 3600 + timeRemaining.minutes * 60 + timeRemaining.seconds) / (24 * 3600);

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
              <Text style={styles.timerUnit}>hours remaining</Text>
            </ProgressRing>
          </View>
        </Card>

        {/* ─── Policy Details ──────────────────────────────── */}
        <Card style={styles.policyCard}>
          <View style={styles.policyHeader}>
            <View style={styles.policyIconBg}>
              <Ionicons name="document-text" size={20} color={colors.primaryContainer} />
            </View>
            <Text style={styles.policyTitle}>Policy Number</Text>
          </View>
          <Text style={styles.policyNumber}>IG-2024-8842-TX</Text>
          <View style={styles.policyMeta}>
            <Text style={styles.policyMetaLabel}>Type:</Text>
            <Text style={styles.policyMetaValue}>Comprehensive Gig Liability</Text>
          </View>
        </Card>

        {/* ─── Coverage Zone ───────────────────────────────── */}
        <Card style={styles.coverageCard}>
          <View style={styles.coverageHeader}>
            <View style={styles.coverageIconBg}>
              <Ionicons name="location" size={20} color={colors.secondary} />
            </View>
            <Text style={styles.coverageTitle}>Coverage Zone</Text>
          </View>

          {/* Map placeholder */}
          <View style={styles.mapPlaceholder}>
            <LinearGradient
              colors={['rgba(37, 117, 252, 0.08)', 'rgba(106, 17, 203, 0.05)']}
              style={styles.mapGradient}
            >
              <Ionicons name="map-outline" size={48} color={colors.primaryContainer} />
              <Text style={styles.mapText}>Standard 25-mile Radius</Text>
            </LinearGradient>
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
            style={{ flex: 1 }}
          />
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

  // ─── Header ────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['2xl'],
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

  // ─── Hero ──────────────────────────────────────────
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  heroCheckContainer: {
    marginBottom: 16,
  },
  heroCheckBg: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
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

  // ─── Timer ─────────────────────────────────────────
  timerCard: {
    marginBottom: spacing.sectionGap,
    alignItems: 'center',
  },
  timerLabel: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelMd,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xl,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerValue: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    fontWeight: '800',
    color: colors.onSurface,
  },
  timerUnit: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.labelMd,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },

  // ─── Policy ────────────────────────────────────────
  policyCard: {
    marginBottom: spacing.sectionGap,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  policyIconBg: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  policyTitle: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.titleSm,
    fontWeight: '600',
    color: colors.onSurface,
  },
  policyNumber: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  policyMeta: {
    flexDirection: 'row',
    gap: 6,
  },
  policyMetaLabel: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
  },
  policyMetaValue: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },

  // ─── Coverage ──────────────────────────────────────
  coverageCard: {
    marginBottom: spacing.sectionGap,
  },
  coverageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  coverageIconBg: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.secondaryFixedDim + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverageTitle: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.titleSm,
    fontWeight: '600',
    color: colors.onSurface,
  },
  mapPlaceholder: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  mapGradient: {
    height: 160,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  mapText: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },

  // ─── Actions ───────────────────────────────────────
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.compactGap,
  },
});

export default ActiveProtectionScreen;
