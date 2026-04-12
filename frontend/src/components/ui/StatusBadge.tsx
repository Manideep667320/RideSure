import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type BadgeStatus = 'active' | 'pending' | 'expired' | 'processing' | 'approved' | 'rejected' | 'not_protected';

interface StatusBadgeProps {
  status: BadgeStatus;
  label: string;
}

/**
 * Status badge using design system semantic colors.
 * Success: primaryContainer bg + onPrimaryContainer text
 * Alert: errorContainer bg + onErrorContainer text
 */
export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const getColors = (): { bg: string; text: string } => {
    switch (status) {
      case 'active':
      case 'approved':
        return {
          bg: colors.primaryFixed,           // #d9e2ff
          text: colors.onPrimaryFixedVariant, // #00419c
        };
      case 'pending':
      case 'processing':
        return {
          bg: colors.secondaryFixedDim + '33', // violet at 20%
          text: colors.secondary,              // #782ad9
        };
      case 'expired':
      case 'rejected':
        return {
          bg: colors.errorContainer,     // #ffdad6
          text: colors.onErrorContainer, // #93000a
        };
      case 'not_protected':
        return {
          bg: colors.errorContainer,
          text: colors.error,
        };
      default:
        return {
          bg: colors.surfaceContainerHigh,
          text: colors.onSurfaceVariant,
        };
    }
  };

  const badgeColors = getColors();

  return (
    <View style={[styles.container, { backgroundColor: badgeColors.bg }]}>
      <Text style={[styles.text, { color: badgeColors.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.labelMd,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
