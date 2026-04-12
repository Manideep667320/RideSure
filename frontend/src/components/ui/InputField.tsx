import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'numeric';
  secureTextEntry?: boolean;
  style?: ViewStyle;
  error?: string;
}

/**
 * Input field per design system:
 * - Default: surfaceContainerHighest fill, no border
 * - Focus: surfaceContainerLowest fill + primary ghost border at 20%
 */
export const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  secureTextEntry = false,
  style,
  error,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.outline}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          multiline && styles.multiline,
          error && styles.inputError,
        ]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.labelLg,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surfaceContainerHighest, // #e1e3e4
    borderRadius: borderRadius.lg,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurface,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputFocused: {
    backgroundColor: colors.surfaceContainerLowest, // #ffffff
    borderColor: 'rgba(0, 52, 127, 0.2)', // primary at 20% opacity — ghost border
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.labelMd,
    color: colors.error,
    marginTop: 4,
  },
});
