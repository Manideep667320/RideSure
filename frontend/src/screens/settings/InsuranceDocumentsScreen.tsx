import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common/Card';
import SettingsScaffold from '../../components/settings/SettingsScaffold';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface Policy {
  _id: string;
  type: 'daily' | 'weekly';
  status: 'active' | 'expired' | 'cancelled';
  startTime: string;
  endTime: string;
}

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleDateString() : 'Not available';

const InsuranceDocumentsScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolicy = async () => {
      try {
        const response = await api.get<ApiResponse<Policy | null>>('/policy/status');
        setPolicy(response.data);
      } catch (error) {
        console.warn('Unable to fetch policy documents context.');
      } finally {
        setLoading(false);
      }
    };

    loadPolicy();
  }, []);

  return (
    <SettingsScaffold
      title="Insurance Documents"
      subtitle="Review the policy details and records currently linked to your account."
      navigation={navigation}
    >
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Account Record</Text>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Insured Name</Text>
          <Text style={styles.dataValue}>{user?.name || 'Pending profile completion'}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Contact</Text>
          <Text style={styles.dataValue}>{user?.phone || user?.email || 'Not available'}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Emergency Contact</Text>
          <Text style={styles.dataValue}>
            {user?.emergencyContactName || 'Not provided'}
          </Text>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Active Coverage</Text>
        {loading ? (
          <Text style={styles.helperText}>Loading your coverage details...</Text>
        ) : policy ? (
          <>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Plan Type</Text>
              <Text style={styles.dataValue}>
                {policy.type === 'daily' ? 'Daily Protection' : 'Weekly Protection'}
              </Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Status</Text>
              <Text style={styles.dataValue}>{policy.status}</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Starts</Text>
              <Text style={styles.dataValue}>{formatDate(policy.startTime)}</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Ends</Text>
              <Text style={styles.dataValue}>{formatDate(policy.endTime)}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.helperText}>
            No active policy was found. Purchase a plan to generate a live policy schedule.
          </Text>
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Document Pack</Text>
        <View style={styles.documentRow}>
          <View style={styles.documentIcon}>
            <Ionicons name="document-text-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.documentBody}>
            <Text style={styles.documentTitle}>Policy Schedule</Text>
            <Text style={styles.documentText}>
              Generated from the active plan selection and shown here once coverage starts.
            </Text>
          </View>
        </View>
        <View style={styles.documentRow}>
          <View style={styles.documentIcon}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.documentBody}>
            <Text style={styles.documentTitle}>Verification Snapshot</Text>
            <Text style={styles.documentText}>
              Uses the profile, contact, and identity fields saved to your RideSure account.
            </Text>
          </View>
        </View>
        <View style={styles.documentRow}>
          <View style={styles.documentIcon}>
            <Ionicons name="receipt-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.documentBody}>
            <Text style={styles.documentTitle}>Claims Checklist</Text>
            <Text style={styles.documentText}>
              Keep trip evidence, payment proof, and incident photos ready for faster claims.
            </Text>
          </View>
        </View>
      </Card>
    </SettingsScaffold>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    color: colors.onSurface,
  },
  helperText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: typography.lineHeight.bodyMd,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  dataLabel: {
    flex: 1,
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelLg,
    color: colors.onSurfaceVariant,
  },
  dataValue: {
    flex: 1,
    textAlign: 'right',
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurface,
  },
  documentRow: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surfaceContainerLow,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentBody: {
    flex: 1,
  },
  documentTitle: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurface,
    marginBottom: 4,
  },
  documentText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: typography.lineHeight.bodyMd,
  },
});

export default InsuranceDocumentsScreen;
