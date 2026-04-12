import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button = ({
  title,
  onPress,
  loading,
  variant = 'primary',
  disabled,
  fullWidth = false,
  size = 'md',
  style,
  textStyle,
  icon,
}: ButtonProps) => {
  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primaryContainer,
        };
      case 'secondary':
        return {
          backgroundColor: colors.primaryFixedDim,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.outlineVariant + '26', // 15% opacity ghost border
        };
      default:
        return {};
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'primary':
        return { color: colors.onPrimary };
      case 'secondary':
        return { color: colors.onPrimaryFixedVariant };
      case 'ghost':
        return { color: colors.primary };
      case 'outline':
        return { color: colors.onSurface };
      default:
        return {};
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: 10,
          paddingHorizontal: 20,
        };
      case 'lg':
        return {
          paddingVertical: 18,
          paddingHorizontal: 36,
        };
      default:
        return {
          paddingVertical: spacing.buttonPaddingV,
          paddingHorizontal: spacing.buttonPaddingH,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.container,
        getContainerStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'ghost' ? colors.primary : colors.onPrimary}
          size="small"
        />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              getTextStyle(),
              icon ? { marginLeft: 8 } : undefined,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24, // xl roundedness per design system
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyLg,
    fontWeight: '600',
  },
});
