import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../components/common/Card';
import SettingsScaffold from '../../components/settings/SettingsScaffold';
import { InputField } from '../../components/ui/InputField';
import { GradientButton } from '../../components/ui/GradientButton';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import type { User } from '../../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const PersonalInfoScreen = ({ navigation }: any) => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    addressLine1: user?.addressLine1 || '',
    addressLine2: user?.addressLine2 || '',
    city: user?.city || '',
    state: user?.state || '',
    postalCode: user?.postalCode || '',
    emergencyContactName: user?.emergencyContactName || '',
    emergencyContactPhone: user?.emergencyContactPhone || '',
  });

  useEffect(() => {
    setForm({
      name: user?.name || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      addressLine1: user?.addressLine1 || '',
      addressLine2: user?.addressLine2 || '',
      city: user?.city || '',
      state: user?.state || '',
      postalCode: user?.postalCode || '',
      emergencyContactName: user?.emergencyContactName || '',
      emergencyContactPhone: user?.emergencyContactPhone || '',
    });
  }, [user]);

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await api.put<ApiResponse<User>>('/auth/profile', form);
      setUser(response.data);
    } catch (error: any) {
      alert(`Unable to update personal information: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsScaffold
      title="Personal Information"
      subtitle="Keep your rider profile and emergency contact details accurate."
      navigation={navigation}
    >
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Identity</Text>
        <InputField
          label="Full Name"
          placeholder="e.g. Aman Verma"
          value={form.name}
          onChangeText={(value) => updateField('name', value)}
        />
        <View style={styles.readOnlyRow}>
          <Text style={styles.readOnlyLabel}>Account Email</Text>
          <Text style={styles.readOnlyValue}>
            {user?.email || 'No email linked to this account'}
          </Text>
        </View>
        <InputField
          label="Contact Phone"
          placeholder="e.g. +91 9876543210"
          value={form.phone}
          onChangeText={(value) => updateField('phone', value)}
          keyboardType="phone-pad"
        />
        <InputField
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          value={form.dateOfBirth}
          onChangeText={(value) => updateField('dateOfBirth', value)}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Address</Text>
        <InputField
          label="Address Line 1"
          placeholder="Flat, building or street"
          value={form.addressLine1}
          onChangeText={(value) => updateField('addressLine1', value)}
        />
        <InputField
          label="Address Line 2"
          placeholder="Area, landmark"
          value={form.addressLine2}
          onChangeText={(value) => updateField('addressLine2', value)}
        />
        <InputField
          label="City"
          placeholder="e.g. Bengaluru"
          value={form.city}
          onChangeText={(value) => updateField('city', value)}
        />
        <View style={styles.row}>
          <View style={styles.rowField}>
            <InputField
              label="State"
              placeholder="State"
              value={form.state}
              onChangeText={(value) => updateField('state', value)}
            />
          </View>
          <View style={styles.rowField}>
            <InputField
              label="Postal Code"
              placeholder="PIN"
              value={form.postalCode}
              onChangeText={(value) => updateField('postalCode', value)}
              keyboardType="numeric"
            />
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        <InputField
          label="Contact Name"
          placeholder="Who should we contact first?"
          value={form.emergencyContactName}
          onChangeText={(value) => updateField('emergencyContactName', value)}
        />
        <InputField
          label="Contact Phone"
          placeholder="Emergency phone number"
          value={form.emergencyContactPhone}
          onChangeText={(value) => updateField('emergencyContactPhone', value)}
          keyboardType="phone-pad"
        />
      </Card>

      <GradientButton
        title={loading ? 'Saving...' : 'Save Personal Info'}
        onPress={handleSave}
        disabled={loading}
      />
    </SettingsScaffold>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  readOnlyRow: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  readOnlyLabel: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelMd,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  readOnlyValue: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurface,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  rowField: {
    flex: 1,
  },
});

export default PersonalInfoScreen;
