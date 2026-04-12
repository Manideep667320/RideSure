import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

/**
 * Reusable section header.
 * Uses Plus Jakarta Sans for headline authority.
 * Subtitle in Manrope for editorial warmth.
 */
export const SectionHeader = ({ title, subtitle, style }: SectionHeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurfaceVariant,
    marginTop: 6,
    lineHeight: 24,
  },
});
