import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { gradients } from '../../theme/gradients';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
  size?: 'md' | 'lg';
}

/**
 * Primary CTA with the Signature Gradient.
 * "Hero elements and primary CTAs should never be flat."
 * Gradient: #6a11cb → #2575fc at 135°
 */
export const GradientButton = ({
  title,
  onPress,
  disabled,
  fullWidth = true,
  style,
  icon,
  size = 'md',
}: GradientButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[fullWidth && styles.fullWidth, disabled && styles.disabled, style]}
    >
      <LinearGradient
        colors={[...gradients.primary.colors]}
        start={gradients.primary.start}
        end={gradients.primary.end}
        style={[
          styles.gradient,
          size === 'lg' && styles.gradientLg,
        ]}
      >
        {icon}
        <Text style={[styles.text, icon ? { marginLeft: 8 } : undefined]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    paddingVertical: spacing.buttonPaddingV,
    paddingHorizontal: spacing.buttonPaddingH,
    borderRadius: borderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...shadows.primaryTinted,
  },
  gradientLg: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  text: {
    color: colors.onPrimary,
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.bodyLg,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
