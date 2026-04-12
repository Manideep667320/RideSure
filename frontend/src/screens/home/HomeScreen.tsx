import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';
import { gradients } from '../../theme/gradients';
import { Card } from '../../components/common/Card';
import { GradientButton } from '../../components/ui/GradientButton';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useAuth } from '../../context/AuthContext';

const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
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
          <Text style={styles.greetingSubtitle}>Ready for your next shift?</Text>
        </View>

        {/* ─── Protection Status Card ──────────────────────── */}
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
              <Text style={styles.coverageAmount}>₹50,000</Text>
              <Text style={styles.coverageDesc}>accident protection included</Text>
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
          <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.secondary} />
          <Text style={styles.testimonialText}>
            "RideSure has saved me ₹4,500 in medical bills last month."
          </Text>
          <Text style={styles.testimonialAuthor}>- Sumit, Delivery Partner</Text>
        </Card>

        {/* ─── Bottom spacing ──────────────────────────────── */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ─── Bottom Navigation ─────────────────────────────── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color={colors.primary} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('PlanSelection')}
        >
          <Ionicons name="shield-outline" size={22} color={colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ClaimForm')}
        >
          <Ionicons name="document-text-outline" size={22} color={colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Claims</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('History')}
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
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.titleLg,
    fontWeight: '800',
    color: colors.onSurface,
  },
  profileButton: {
    padding: 4,
  },

  // ─── Greeting ──────────────────────────────────────
  greetingSection: {
    marginBottom: spacing['2xl'],
  },
  greetingTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineMd,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurfaceVariant,
  },

  // ─── Protection Status ─────────────────────────────
  protectionCard: {
    marginBottom: spacing.sectionGap,
    padding: 0,
    overflow: 'hidden',
  },
  protectionGradient: {
    padding: spacing.cardPadding,
    borderRadius: borderRadius['2xl'],
  },
  protectionIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  protectionIconBg: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.errorContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  protectionTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.titleLg,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 6,
  },
  protectionDesc: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
  },

  // ─── Plan Bento Grid ───────────────────────────────
  planSection: {
    marginBottom: spacing.sectionGap,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleLg,
    color: colors.onSurface,
  },
  planBadge: {
    backgroundColor: colors.primaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  planBadgeText: {
    fontFamily: typography.fontFamily.bodyBold,
    fontSize: typography.fontSize.bodySm,
    fontWeight: '700',
    color: colors.primary,
  },
  planGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  bentoCard: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    gap: 8,
  },
  coverageCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  bentoLabel: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelSm,
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
  bentoPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  bentoPrice: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.displaySm,
    fontWeight: '800',
    color: colors.primary,
  },
  bentoPeriod: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
  },
  bentoNoteBox: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 8,
    borderRadius: borderRadius.md,
    marginTop: 4,
  },
  bentoNoteText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: 10,
    color: colors.onSurfaceVariant,
    lineHeight: 14,
  },
  coverageAmount: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    color: colors.onSurface,
    lineHeight: 28,
  },
  coverageDesc: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: 10,
    color: colors.onSurfaceVariant,
    lineHeight: 12,
    marginTop: -4,
  },

  // ─── Smart Activation ──────────────────────────────
  smartCard: {
    marginBottom: spacing.sectionGap,
  },
  smartIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
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

  // ─── Testimonial ───────────────────────────────────
  testimonialCard: {
    marginBottom: spacing.sectionGap,
  },
  testimonialText: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.bodyLg,
    fontWeight: '500',
    color: colors.onSurface,
    fontStyle: 'italic',
    marginTop: 12,
    marginBottom: 8,
    lineHeight: 24,
  },
  testimonialAuthor: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },

  // ─── Bottom Navigation ─────────────────────────────
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.md,
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
