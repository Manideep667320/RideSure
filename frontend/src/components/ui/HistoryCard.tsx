import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';
import { StatusBadge } from './StatusBadge';

interface HistoryCardProps {
  title: string;
  subtitle: string;
  policyNumber: string;
  amount: string;
  amountLabel: string;
  date?: string;
  status: 'active' | 'approved' | 'expired' | 'processing';
  statusLabel: string;
  icon?: string;
  style?: ViewStyle;
}

/**
 * History card using tonal layering.
 * surfaceContainerLowest on surfaceContainerLow base.
 * No dividers — uses spacing for separation.
 */
export const HistoryCard = ({
  title,
  subtitle,
  policyNumber,
  amount,
  amountLabel,
  date,
  status,
  statusLabel,
  icon = 'shield-checkmark-outline',
  style,
}: HistoryCardProps) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon as any}
            size={22}
            color={colors.primaryContainer}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <StatusBadge status={status} label={statusLabel} />
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{amountLabel}</Text>
          <Text style={styles.detailValue}>{amount}</Text>
        </View>
        {date && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{date}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius['2xl'],
    padding: spacing.cardPadding,
    ...shadows.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.titleSm,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: spacing['2xl'],
  },
  detailItem: {},
  detailLabel: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelMd,
    color: colors.onSurfaceVariant,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
});
