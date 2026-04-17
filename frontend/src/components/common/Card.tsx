import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';

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
        return colors.surfaceContainerLowest;
      case 'low':
        return colors.surfaceContainerLow;
      case 'default':
        return colors.surfaceContainer;
      case 'high':
        return colors.surfaceContainerHigh;
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return styles.elevatedVariant;
      case 'surface':
        return styles.surfaceVariant;
      case 'outlined':
        return styles.outlinedVariant;
      default:
        return styles.surfaceVariant;
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: getBackgroundColor() },
        getVariantStyle(),
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius['2xl'],
    padding: spacing.cardPadding,
  },
  elevatedVariant: {
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  surfaceVariant: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  outlinedVariant: {
    borderWidth: 1,
    borderColor: 'rgba(205, 194, 215, 0.15)',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});
