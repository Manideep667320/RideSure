import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { gradients } from '../../theme/gradients';
import { shadows } from '../../theme/shadows';
import { Card } from '../../components/common/Card';

const ClaimProcessingScreen = ({ navigation }: any) => {
  const [spinAnim] = useState(new Animated.Value(0));
  const [progressAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Spin animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();

    // Navigate to success after processing
    const timeout = setTimeout(() => {
      navigation.replace('ClaimSuccess');
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const steps = [
    { label: 'Uploading Evidence', done: true },
    { label: 'Validating Policy Coverage', done: false, current: true },
    { label: 'AI Risk Assessment', done: false },
    { label: 'Generating Decision', done: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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

        {/* ─── Processing Animation ────────────────────────── */}
        <View style={styles.animationContainer}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <LinearGradient
              colors={[...gradients.primary.colors]}
              style={styles.spinnerOuter}
            >
              <View style={styles.spinnerInner}>
                <Ionicons name="analytics-outline" size={32} color={colors.primaryContainer} />
              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* ─── Title ───────────────────────────────────────── */}
        <Text style={styles.title}>Analyzing your claim...</Text>
        <Text style={styles.subtitle}>This will take a few seconds</Text>

        {/* ─── Progress Bar ────────────────────────────────── */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth as any }]}>
            <LinearGradient
              colors={[...gradients.primary.colors]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressGradient}
            />
          </Animated.View>
        </View>

        {/* ─── Current Task ────────────────────────────────── */}
        <Card style={styles.taskCard}>
          <Text style={styles.taskLabel}>Current Task</Text>
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <View
                  style={[
                    styles.stepDot,
                    step.done && styles.stepDotDone,
                    step.current && styles.stepDotCurrent,
                  ]}
                >
                  {step.done && (
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  )}
                </View>
                <Text
                  style={[
                    styles.stepText,
                    step.done && styles.stepTextDone,
                    step.current && styles.stepTextCurrent,
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* ─── Upload Confirmation ─────────────────────────── */}
        <Card variant="surface" level="low" style={styles.confirmCard}>
          <View style={styles.confirmRow}>
            <View style={styles.confirmIconBg}>
              <Ionicons name="checkmark-circle" size={20} color={colors.primaryContainer} />
            </View>
            <View style={styles.confirmContent}>
              <Text style={styles.confirmTitle}>Assets uploaded successfully</Text>
              <Text style={styles.confirmDesc}>
                3 High-res images and 1 incident report synced with our server.
              </Text>
            </View>
          </View>
        </Card>
      </View>
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
    padding: spacing.screenPadding,
    alignItems: 'center',
    justifyContent: 'center',
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

  // ─── Animation ─────────────────────────────────────
  animationContainer: {
    marginBottom: spacing['3xl'],
  },
  spinnerOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00347f',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 6,
  },
  spinnerInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ─── Title ─────────────────────────────────────────
  title: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing['3xl'],
  },

  // ─── Progress ──────────────────────────────────────
  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceVariant,
    marginBottom: spacing['3xl'],
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressGradient: {
    flex: 1,
    borderRadius: 3,
  },

  // ─── Task Steps ────────────────────────────────────
  taskCard: {
    width: '100%',
    marginBottom: spacing.sectionGap,
  },
  taskLabel: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelMd,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  stepsContainer: {
    gap: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotDone: {
    backgroundColor: colors.primaryContainer,
  },
  stepDotCurrent: {
    backgroundColor: colors.secondary,
  },
  stepText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
  },
  stepTextDone: {
    color: colors.onSurface,
    textDecorationLine: 'line-through',
  },
  stepTextCurrent: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontWeight: '600',
    color: colors.onSurface,
  },

  // ─── Confirmation ──────────────────────────────────
  confirmCard: {
    width: '100%',
  },
  confirmRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  confirmIconBg: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmContent: {
    flex: 1,
  },
  confirmTitle: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 4,
  },
  confirmDesc: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
});

export default ClaimProcessingScreen;
