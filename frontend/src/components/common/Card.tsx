import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'surface' | 'outlined';
  level?: 'lowest' | 'low' | 'default' | 'high';
}

/**
 * Card component using Tonal Layering (no 1px borders).
 * Depth is achieved by stacking surface tiers.
 */
export const Card = ({
  children,
  style,
  variant = 'elevated',
  level = 'lowest',
}: CardProps) => {
  const getBackgroundColor = (): string => {
    switch (level) {
      case 'lowest':
        return colors.surfaceContainerLowest; // #ffffff - max lift
      case 'low':
        return colors.surfaceContainerLow;    // #f3f4f5
      case 'default':
        return colors.surfaceContainer;       // #edeeef
      case 'high':
        return colors.surfaceContainerHigh;   // #e7e8e9
    }
  };

  const getShadow = () => {
    switch (variant) {
      case 'elevated':
        return shadows.sm;
      case 'surface':
        return shadows.none;
      case 'outlined':
        return shadows.none;
      default:
        return shadows.none;
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: getBackgroundColor() },
        getShadow(),
        variant === 'outlined' && styles.outlined,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius['2xl'], // 24px — primary card radius
    padding: spacing.cardPadding,
  },
  outlined: {
    // Ghost Border: outlineVariant at 15% opacity
    borderWidth: 1,
    borderColor: 'rgba(205, 194, 215, 0.15)',
  },
});
