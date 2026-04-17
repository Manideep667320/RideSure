import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { gradients } from '../../theme/gradients';
import { Card } from '../../components/common/Card';
import { GradientButton } from '../../components/ui/GradientButton';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { policyService } from '../../services/policyService';
import { ROUTES } from '../../constants/routes';

const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [activePolicy, setActivePolicy] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchActivePolicy();
  }, []);

  const fetchActivePolicy = async () => {
    try {
      setLoading(true);
      const response = await policyService.getActivePolicy();
      if (response && response.data) {
        setActivePolicy(response.data);
      } else {
        setActivePolicy(null);
      }
    } catch (err) {
      console.error('Error fetching active policy:', err);
      setActivePolicy(null);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchActivePolicy();
    setRefreshing(false);
  };

  // Update countdown timer
  useEffect(() => {
    if (!activePolicy) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const endTime = new Date(activePolicy.endTime).getTime();
      const remaining = Math.max(0, endTime - now);

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [activePolicy]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* ─── Header ──────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoRow}>
              <LinearGradient
                colors={[...gradients.primary.colors]}
                style={styles.logoIcon}
              >
                <Ionicons name="shield-checkmark" size={18} color="#fff" />
              </LinearGradient>
              <Text style={styles.logoText}>RideSure</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle-outline" size={32} color={colors.onSurface} />
          </TouchableOpacity>
        </View>

        {/* ─── Greeting ────────────────────────────────────── */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>Hi {user?.name ? user.name.split(' ')[0] : 'Rider'} 👋</Text>
          <Text style={styles.greetingSubtitle}>
            {activePolicy ? "You're protected today!" : 'Ready for your next shift?'}
          </Text>
        </View>

        {/* ─── Protection Status Card ──────────────────────── */}
        {loading ? (
          <Card style={styles.protectionCard}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="small" color={colors.primaryContainer} />
              <Text style={styles.loadingText}>Checking protection status...</Text>
            </View>
          </Card>
        ) : activePolicy ? (
          <Card variant="surface" style={styles.protectionCard}>
            <LinearGradient
              colors={['rgba(76, 175, 80, 0.08)', 'rgba(76, 175, 80, 0.02)']}
              style={styles.protectionGradient}
            >
              <View style={styles.protectionIconRow}>
                <View style={styles.protectionIconBg}>
                  <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
                </View>
                <StatusBadge status="active" label="PROTECTED" />
              </View>
              <Text style={styles.protectionTitle}>You are Protected</Text>
              <Text style={styles.protectionDesc}>
                Your {activePolicy.type === 'daily' ? '24-hour' : '7-day'} coverage is active
              </Text>

              {/* ─── Time Remaining Display ──────────────────– */}
              <View style={styles.timeRemainingBox}>
                <View style={styles.timeItem}>
                  <Text style={styles.timeValue}>{String(timeRemaining.hours).padStart(2, '0')}</Text>
                  <Text style={styles.timeLabel}>Hours</Text>
                </View>
                <View style={styles.timeSeparator}>
                  <Text style={styles.timeDots}>:</Text>
                </View>
                <View style={styles.timeItem}>
                  <Text style={styles.timeValue}>{String(timeRemaining.minutes).padStart(2, '0')}</Text>
                  <Text style={styles.timeLabel}>Min</Text>
                </View>
                <View style={styles.timeSeparator}>
                  <Text style={styles.timeDots}>:</Text>
                </View>
                <View style={styles.timeItem}>
                  <Text style={styles.timeValue}>{String(timeRemaining.seconds).padStart(2, '0')}</Text>
                  <Text style={styles.timeLabel}>Sec</Text>
                </View>
              </View>

              {/* ─── View Details Button ──────────────────── */}
              <GradientButton
                title="View Protection Details"
                onPress={() => navigation.navigate('ActiveProtection')}
                style={{ marginTop: 16 }}
              />
            </LinearGradient>
          </Card>
        ) : (
          <Card variant="surface" style={styles.protectionCard}>
            <LinearGradient
              colors={['rgba(186, 26, 26, 0.08)', 'rgba(186, 26, 26, 0.02)']}
              style={styles.protectionGradient}
            >
              <View style={styles.protectionIconRow}>
                <View style={styles.protectionIconBg}>
                  <Ionicons name="alert-circle" size={24} color={colors.error} />
                </View>
                <StatusBadge status="not_protected" label="NOT PROTECTED" />
              </View>
              <Text style={styles.protectionTitle}>You are NOT Protected</Text>
              <Text style={styles.protectionDesc}>
                Your current activities are not insured.
              </Text>
              <GradientButton
                title="Get Protected Now"
                onPress={() => navigation.navigate('PlanSelection')}
                style={{ marginTop: 16 }}
              />
            </LinearGradient>
          </Card>
        )}

        {/* ─── Plan Details Bento Grid ─────────────────────── */}
        <View style={styles.planSection}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>Standard Plan</Text>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>Gig-Worker Special</Text>
            </View>
          </View>
          
          <View style={styles.planGrid}>
            {/* Daily Cost Card */}
            <Card variant="surface" level="lowest" style={styles.bentoCard}>
              <Text style={styles.bentoLabel}>DAILY COST</Text>
              <View style={styles.bentoPriceRow}>
                <Text style={styles.bentoPrice}>₹10</Text>
                <Text style={styles.bentoPeriod}>/day</Text>
              </View>
              <View style={styles.bentoNoteBox}>
                <Text style={styles.bentoNoteText}>Pay only when you are active.</Text>
              </View>
            </Card>

            {/* Coverage Card */}
            <Card variant="surface" level="lowest" style={[styles.bentoCard, styles.coverageCard]}>
              <Text style={styles.bentoLabel}>PROTECTION</Text>
              <Text style={styles.bentoAmountLarge}>₹50,000</Text>
              <Text style={styles.bentoDesc}>accident protection included</Text>
            </Card>
          </View>
        </View>

        {/* ─── Smart Activation Card ───────────────────────── */}
        <Card style={styles.smartCard}>
          <View style={styles.smartIconRow}>
            <View style={styles.smartIconBg}>
              <Ionicons name="flash" size={20} color={colors.secondary} />
            </View>
            <Text style={styles.smartTitle}>Smart Activation</Text>
          </View>
          <Text style={styles.smartDesc}>
            Automatically starts when you begin your trip via connected apps.
          </Text>
        </Card>

        {/* ─── Testimonial Card ────────────────────────────── */}
        <Card variant="surface" level="low" style={styles.testimonialCard}>
          <View style={styles.testimonialRow}>
            <Text style={styles.testimonialText} numberOfLines={2}>
              "Finally, protection that lets me work without worry. Recommend to all gig workers." 
            </Text>
            <Text style={styles.testimonialAuthor}>— Akshay M.</Text>
          </View>
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ─── Bottom Navigation ───────────────────────────── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color={colors.primary} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(ROUTES.MAIN.PLAN_SELECTION)}
        >
          <Ionicons name="shield-outline" size={22} color={colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(ROUTES.MAIN.CLAIM_FORM)}
        >
          <Ionicons name="document-text-outline" size={22} color={colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Claims</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate(ROUTES.MAIN.HISTORY)}
        >
          <Ionicons name="time-outline" size={22} color={colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>History</Text>
        </TouchableOpacity>
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
  headerLeft: {
    flexDirection: 'row',
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
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ─── Greeting Section ──────────────────────────────
  greetingSection: {
    marginBottom: spacing['2xl'],
  },
  greetingTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.displayXs,
    fontWeight: '800',
    color: colors.onSurface,
  },
  greetingSubtitle: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
  },

  // ─── Protection Card ───────────────────────────────
  protectionCard: {
    borderWidth: 1,
    borderColor: colors.outline,
    marginBottom: spacing['2xl'],
    overflow: 'hidden',
  },
  protectionGradient: {
    padding: spacing.lg,
  },
  loadingContent: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  loadingText: {
    marginTop: spacing.md,
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
  },
  protectionIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  protectionIconBg: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  protectionTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  protectionDesc: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },

  // ─── Time Remaining Display ────────────────────────
  timeRemainingBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  timeItem: {
    alignItems: 'center',
    minWidth: 50,
  },
  timeValue: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineMd,
    fontWeight: '800',
    color: colors.primaryContainer,
  },
  timeLabel: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  timeSeparator: {
    marginHorizontal: spacing.sm,
  },
  timeDots: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineMd,
    fontWeight: '800',
    color: colors.primaryContainer,
  },

  // ─── Plan Section ──────────────────────────────────
  planSection: {
    marginBottom: spacing['2xl'],
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  planTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    fontWeight: '700',
    color: colors.onSurface,
  },
  planBadge: {
    backgroundColor: colors.errorContainer,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: 4,
  },
  planBadgeText: {
    fontFamily: typography.fontFamily.labelSemiBold,
    fontSize: typography.fontSize.labelMd,
    fontWeight: '600',
    color: colors.error,
  },
  planGrid: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  bentoCard: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: borderRadius['2xl'],
  },
  bentoLabel: {
    fontFamily: typography.fontFamily.labelSemiBold,
    fontSize: typography.fontSize.labelSm,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bentoPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  bentoPrice: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineLg,
    fontWeight: '800',
    color: colors.onSurface,
  },
  bentoPeriod: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    marginLeft: 4,
  },
  bentoAmountLarge: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineLg,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 6,
  },
  bentoDesc: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  bentoNoteBox: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bentoNoteText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
  },
  coverageCard: {
    justifyContent: 'space-between',
  },

  // ─── Smart Card ────────────────────────────────────
  smartCard: {
    marginBottom: spacing.lg,
  },
  smartIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: spacing.md,
  },
  smartIconBg: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.secondaryFixedDim + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smartTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.onSurface,
  },
  smartDesc: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },

  // ─── Testimonial Card ──────────────────────────────
  testimonialCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  testimonialRow: {
    gap: spacing.md,
  },
  testimonialText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurface,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  testimonialAuthor: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.primary,
  },

  // ─── Bottom Navigation ─────────────────────────────
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: colors.surfaceContainerLowest,
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 4,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelSm,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  navLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});

export default HomeScreen;
