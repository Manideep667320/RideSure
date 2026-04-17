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
import { HistoryCard } from '../../components/ui/HistoryCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { claimService } from '../../services/claimService';
import { policyService } from '../../services/policyService';
import { formatCurrency } from '../../utils/formatCurrency';

type FilterTab = 'all' | 'policies' | 'claims';

interface HistoryItem {
  id: string;
  title: string;
  subtitle: string;
  policyNumber: string;
  amount: string;
  amountLabel: string;
  date: string;
  status: 'active' | 'approved' | 'expired' | 'processing';
  statusLabel: string;
  icon: string;
  type: 'policy' | 'claim';
  createdAt: string;
}

const HistoryScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'policies', label: 'Policies' },
    { id: 'claims', label: 'Claims' },
  ];

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both claims and policies
      const [claimsRes, policiesRes] = await Promise.all([
        claimService.getClaims().catch(err => {
          console.warn('Claims fetch error:', err);
          return { data: [] };
        }),
        policyService.getPolicies().catch(err => {
          console.warn('Policies fetch error:', err);
          return { data: [] };
        }),
      ]);

      const items: HistoryItem[] = [];

      // Transform claims data
      if (claimsRes && claimsRes.data) {
        const claims = Array.isArray(claimsRes.data) ? claimsRes.data : [];
        claims.forEach((claim: any) => {
          items.push({
            id: claim._id,
            title: 'Claim Submission',
            subtitle: claim.description || 'Claim submitted',
            policyNumber: claim.policyId ? `#${claim.policyId._id?.slice(-6).toUpperCase()}` : 'No Policy',
            amount: '$0.00',
            amountLabel: 'Status',
            date: new Date(claim.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            status: claim.status?.toLowerCase() === 'approved' ? 'approved' : 
                    claim.status?.toLowerCase() === 'pending' ? 'processing' : 'active',
            statusLabel: claim.status || 'PENDING',
            icon: 'medkit-outline',
            type: 'claim',
            createdAt: claim.createdAt,
          });
        });
      }

      // Transform policies data
      if (policiesRes && policiesRes.data) {
        const policies = Array.isArray(policiesRes.data) ? policiesRes.data : [];
        policies.forEach((policy: any) => {
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
          
          items.push({
            id: policy._id,
            title: policy.type === 'daily' ? 'Daily Protection' : 'Weekly Protection',
            subtitle: `${policy.type === 'daily' ? '24-hour' : '7-day'} coverage • #${policy._id?.slice(-6).toUpperCase()}`,
            policyNumber: `#${policy._id?.slice(-6).toUpperCase()}`,
            amount: '$0.00',
            amountLabel: 'Coverage',
            date: `${startDate} - ${endDate}`,
            status: (policy.status as any) || 'active',
            statusLabel: policy.status?.charAt(0).toUpperCase() + policy.status?.slice(1) || 'Active',
            icon: 'shield-outline',
            type: 'policy',
            createdAt: policy.createdAt,
          });
        });
      }

      // Sort by creation date (newest first)
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setHistoryItems(items);
    } catch (err: any) {
      console.error('Error fetching history:', err);
      setError(err.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = historyItems.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'claims') return item.type === 'claim';
    if (activeTab === 'policies') return item.type === 'policy';
    return true;
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

        {/* ─── Loading State ───────────────────────────────── */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primaryContainer} />
            <Text style={styles.loadingText}>Loading your history...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchHistoryData}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="inbox-outline" size={48} color={colors.onSurfaceVariant} />
            <Text style={styles.emptyText}>
              {activeTab === 'claims'
                ? 'No claims yet'
                : activeTab === 'policies'
                ? 'No policies yet'
                : 'No activity yet'}
            </Text>
          </View>
        ) : (
          <>
            {/* ─── Activity List ───────────────────────────────── */}
            <Text style={styles.listTitle}>Recent Activity</Text>

            {filteredItems.map((item) => (
              <HistoryCard
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                policyNumber={item.policyNumber}
                amount={item.amount}
                amountLabel={item.amountLabel}
                date={item.date}
                status={item.status}
                statusLabel={item.statusLabel}
                icon={item.icon}
                style={{ marginBottom: spacing.lg }}
              />
            ))}
          </>
        )}

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

  // ─── Loading State ─────────────────────────────────
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
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
    minHeight: 300,
  },
  errorText: {
    marginTop: spacing.lg,
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    color: colors.error,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryContainer,
  },
  retryButtonText: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onPrimary,
  },

  // ─── Empty State ───────────────────────────────────
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  emptyText: {
    marginTop: spacing.lg,
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
  },
});

export default HistoryScreen;

