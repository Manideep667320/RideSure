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
import { HistoryCard } from '../../components/ui/HistoryCard';
import { SectionHeader } from '../../components/ui/SectionHeader';

type FilterTab = 'all' | 'policies' | 'claims';

const HistoryScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'policies', label: 'Policies' },
    { id: 'claims', label: 'Claims' },
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

        {/* ─── Title ───────────────────────────────────────── */}
        <SectionHeader
          title="History"
          subtitle="Your journey and protection overview"
        />

        {/* ─── Filter Tabs ─────────────────────────────────── */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={[
                styles.tab,
                activeTab === tab.id && styles.tabActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ─── Activity List ───────────────────────────────── */}
        <Text style={styles.listTitle}>Recent Activity</Text>

        <HistoryCard
          title="Vehicle Liability"
          subtitle="Gig-Ride Protect • #P-89221"
          policyNumber="#P-89221"
          amount="$42.00"
          amountLabel="Premium Paid"
          date="Oct 24, 2023"
          status="expired"
          statusLabel="Ended"
          icon="car-outline"
          style={{ marginBottom: spacing.lg }}
        />

        <HistoryCard
          title="Injury Claim"
          subtitle="Courier Shield • #C-77410"
          policyNumber="#C-77410"
          amount="$1,250.00"
          amountLabel="Payout Sent to Wallet"
          date="Sep 12, 2023"
          status="approved"
          statusLabel="Approved"
          icon="medkit-outline"
          style={{ marginBottom: spacing.lg }}
        />

        <HistoryCard
          title="Equipment Transit"
          subtitle="Asset Guard • #P-89255"
          policyNumber="#P-89255"
          amount="$5,000.00"
          amountLabel="Coverage"
          status="active"
          statusLabel="Active"
          icon="cube-outline"
          style={{ marginBottom: spacing.lg }}
        />

        <HistoryCard
          title="Liability Coverage"
          subtitle="Service Shield • #P-81109"
          policyNumber="#P-81109"
          amount="$120.00"
          amountLabel="Premium"
          date="Jul 2023 - Aug 2023"
          status="expired"
          statusLabel="Expired"
          icon="shield-outline"
          style={{ marginBottom: spacing.lg }}
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

  // ─── Tabs ──────────────────────────────────────────
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing['2xl'],
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerHigh,
  },
  tabActive: {
    backgroundColor: colors.primaryContainer,
  },
  tabText: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  tabTextActive: {
    color: colors.onPrimary,
  },

  // ─── List ──────────────────────────────────────────
  listTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.lg,
  },
});

export default HistoryScreen;
