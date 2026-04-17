import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';
import { gradients } from '../../theme/gradients';

interface PlanFeature {
  text: string;
}

interface PlanCardProps {
  name: string;
  price: string;
  period: string;
  features: PlanFeature[];
  isRecommended?: boolean;
  isSelected?: boolean;
  onSelect: () => void;
  style?: ViewStyle;
}

/**
 * Plan selection card with features list.
 * Uses tonal layering — surfaceContainerLowest on surfaceContainerLow base.
 * Recommended variant gets a subtle gradient border glow.
 */
export const PlanCard = ({
  name,
  price,
  period,
  features,
  isRecommended = false,
  isSelected = false,
  onSelect,
  style,
}: PlanCardProps) => {
  const badgeLabel = isSelected ? 'SELECTED' : isRecommended ? 'RECOMMENDED' : null;

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      style={[style]}
    >
      {isRecommended && isSelected ? (
        <LinearGradient
          colors={[...gradients.primary.colors]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.innerCard}>
            {badgeLabel && (
              <View
                style={[
                  styles.recommendedBadge,
                  isSelected && styles.selectedBadge,
                ]}
              >
                <Text
                  style={[
                    styles.recommendedText,
                    isSelected && styles.selectedBadgeText,
                  ]}
                >
                  {badgeLabel}
                </Text>
              </View>
            )}
            {renderContent()}
          </View>
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.card,
            isSelected && styles.selectedCard,
          ]}
        >
          {badgeLabel && (
            <View
              style={[
                styles.recommendedBadge,
                isSelected && styles.selectedBadge,
              ]}
            >
              <Text
                style={[
                  styles.recommendedText,
                  isSelected && styles.selectedBadgeText,
                ]}
              >
                {badgeLabel}
              </Text>
            </View>
          )}
          {renderContent()}
        </View>
      )}
    </TouchableOpacity>
  );

  function renderContent() {
    return (
      <>
        <Text style={styles.planName}>{name}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.period}>/{period}</Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={colors.primaryContainer}
              />
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius['2xl'],
    padding: spacing.cardPadding,
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    backgroundColor: colors.surfaceContainerLowest,
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 4,
  },
  gradientBorder: {
    borderRadius: borderRadius['2xl'],
    padding: 2,
  },
  innerCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius['2xl'] - 2,
    padding: spacing.cardPadding,
  },
  recommendedBadge: {
    backgroundColor: colors.gradientStart,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  selectedBadge: {
    backgroundColor: colors.primaryContainer,
  },
  recommendedText: {
    color: colors.onPrimary,
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.labelSm,
    fontWeight: '700',
    letterSpacing: 1,
  },
  selectedBadgeText: {
    color: colors.onPrimary,
  },
  planName: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.titleLg,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    fontWeight: '800',
    color: colors.primary,
  },
  period: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    marginLeft: 4,
  },
  featuresContainer: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurface,
    flex: 1,
  },
});
