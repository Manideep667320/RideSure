import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common/Card';
import SettingsScaffold from '../../components/settings/SettingsScaffold';
import { InputField } from '../../components/ui/InputField';
import { GradientButton } from '../../components/ui/GradientButton';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import type { PaymentMethod, User } from '../../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

type DraftType = 'upi' | 'card';

const emptyDraft = {
  label: '',
  holderName: '',
  upiId: '',
  cardBrand: '',
  cardLast4: '',
  expiryMonth: '',
  expiryYear: '',
};

const PaymentMethodsScreen = ({ navigation }: any) => {
  const { user, setUser } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    user?.paymentMethods || []
  );
  const [draftType, setDraftType] = useState<DraftType>('upi');
  const [draft, setDraft] = useState(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPaymentMethods(user?.paymentMethods || []);
  }, [user?.paymentMethods]);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const updateDraft = (key: keyof typeof draft, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const resetDraft = () => {
    setEditingId(null);
    setDraftType('upi');
    setDraft(emptyDraft);
  };

  const persistPaymentMethods = async (nextMethods: PaymentMethod[]) => {
    try {
      setLoading(true);
      const response = await api.put<ApiResponse<User>>('/auth/payment-methods', {
        paymentMethods: nextMethods,
      });

      setPaymentMethods(response.data.paymentMethods || []);
      setUser(response.data);
      resetDraft();
    } catch (error: any) {
      alert(`Unable to update payment methods: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const buildDraftMethod = (): PaymentMethod | null => {
    const existingMethod = paymentMethods.find((method) => method._id === editingId);

    if (!draft.label.trim()) {
      alert('Add a label so you can identify this payment method later.');
      return null;
    }

    if (draftType === 'upi' && !draft.upiId.trim()) {
      alert('Enter a valid UPI ID before saving.');
      return null;
    }

    if (draftType === 'card' && !draft.cardLast4.trim()) {
      alert('Enter the card last 4 digits before saving.');
      return null;
    }

    return {
      _id: editingId || undefined,
      type: draftType,
      label: draft.label.trim(),
      holderName: draft.holderName.trim(),
      upiId: draftType === 'upi' ? draft.upiId.trim() : '',
      cardBrand: draftType === 'card' ? draft.cardBrand.trim() : '',
      cardLast4:
        draftType === 'card'
          ? draft.cardLast4.replace(/\D/g, '').slice(-4)
          : '',
      expiryMonth: draftType === 'card' ? draft.expiryMonth.trim() : '',
      expiryYear: draftType === 'card' ? draft.expiryYear.trim() : '',
      isDefault: existingMethod?.isDefault ?? paymentMethods.length === 0,
    };
  };

  const handleAddOrUpdate = async () => {
    const nextMethod = buildDraftMethod();
    if (!nextMethod) {
      return;
    }

    const nextMethods = editingId
      ? paymentMethods.map((method) =>
          method._id === editingId ? { ...method, ...nextMethod } : method
        )
      : [...paymentMethods, nextMethod];

    await persistPaymentMethods(nextMethods);
  };

  const handleEdit = (method: PaymentMethod) => {
    setEditingId(method._id || null);
    setDraftType(method.type);
    setDraft({
      label: method.label || '',
      holderName: method.holderName || '',
      upiId: method.upiId || '',
      cardBrand: method.cardBrand || '',
      cardLast4: method.cardLast4 || '',
      expiryMonth: method.expiryMonth || '',
      expiryYear: method.expiryYear || '',
    });
  };

  const handleRemove = async (methodId?: string) => {
    const nextMethods = paymentMethods.filter((method) => method._id !== methodId);
    await persistPaymentMethods(
      nextMethods.map((method, index) => ({
        ...method,
        isDefault: index === 0 ? true : Boolean(method.isDefault && index !== 0),
      }))
    );
  };

  const handleSetDefault = async (methodId?: string) => {
    const nextMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method._id === methodId,
    }));
    await persistPaymentMethods(nextMethods);
  };

  return (
    <SettingsScaffold
      title="Payment Methods"
      subtitle="Save rider-friendly payment rails for faster checkout."
      navigation={navigation}
    >
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Saved Methods</Text>
        {paymentMethods.length === 0 ? (
          <Text style={styles.emptyText}>
            No saved methods yet. Add a UPI ID or card reference below.
          </Text>
        ) : (
          paymentMethods.map((method) => (
            <View key={method._id || `${method.type}-${method.label}`} style={styles.methodCard}>
              <View style={styles.methodHeader}>
                <View>
                  <Text style={styles.methodLabel}>{method.label}</Text>
                  <Text style={styles.methodMeta}>
                    {method.type === 'upi'
                      ? method.upiId
                      : `${method.cardBrand || 'Card'} ending in ${method.cardLast4 || '----'}`}
                  </Text>
                </View>
                {method.isDefault ? (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.methodActions}>
                <TouchableOpacity onPress={() => handleEdit(method)}>
                  <Text style={styles.linkText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSetDefault(method._id)}>
                  <Text style={styles.linkText}>Set Default</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemove(method._id)}>
                  <Text style={[styles.linkText, styles.destructiveLink]}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>
          {isEditing ? 'Edit Method' : 'Add New Method'}
        </Text>

        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segmentButton, draftType === 'upi' && styles.segmentButtonActive]}
            onPress={() => setDraftType('upi')}
          >
            <Text
              style={[styles.segmentText, draftType === 'upi' && styles.segmentTextActive]}
            >
              UPI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentButton, draftType === 'card' && styles.segmentButtonActive]}
            onPress={() => setDraftType('card')}
          >
            <Text
              style={[styles.segmentText, draftType === 'card' && styles.segmentTextActive]}
            >
              Card
            </Text>
          </TouchableOpacity>
        </View>

        <InputField
          label="Label"
          placeholder={draftType === 'upi' ? 'Primary UPI' : 'Work Card'}
          value={draft.label}
          onChangeText={(value) => updateDraft('label', value)}
        />
        <InputField
          label="Holder Name"
          placeholder="Account or card holder"
          value={draft.holderName}
          onChangeText={(value) => updateDraft('holderName', value)}
        />

        {draftType === 'upi' ? (
          <InputField
            label="UPI ID"
            placeholder="example@upi"
            value={draft.upiId}
            onChangeText={(value) => updateDraft('upiId', value)}
          />
        ) : (
          <>
            <InputField
              label="Card Brand"
              placeholder="Visa, RuPay, Mastercard"
              value={draft.cardBrand}
              onChangeText={(value) => updateDraft('cardBrand', value)}
            />
            <InputField
              label="Last 4 Digits"
              placeholder="1234"
              value={draft.cardLast4}
              onChangeText={(value) => updateDraft('cardLast4', value)}
              keyboardType="numeric"
            />
            <View style={styles.expiryRow}>
              <View style={styles.rowField}>
                <InputField
                  label="Expiry Month"
                  placeholder="MM"
                  value={draft.expiryMonth}
                  onChangeText={(value) => updateDraft('expiryMonth', value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.rowField}>
                <InputField
                  label="Expiry Year"
                  placeholder="YYYY"
                  value={draft.expiryYear}
                  onChangeText={(value) => updateDraft('expiryYear', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </>
        )}

        <GradientButton
          title={loading ? 'Saving...' : isEditing ? 'Update Method' : 'Add Method'}
          onPress={handleAddOrUpdate}
          disabled={loading}
        />

        {isEditing ? (
          <TouchableOpacity style={styles.secondaryAction} onPress={resetDraft}>
            <Ionicons name="close-circle-outline" size={18} color={colors.onSurfaceVariant} />
            <Text style={styles.secondaryActionText}>Cancel editing</Text>
          </TouchableOpacity>
        ) : null}
      </Card>
    </SettingsScaffold>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    color: colors.onSurface,
  },
  emptyText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: typography.lineHeight.bodyMd,
  },
  methodCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  methodLabel: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurface,
  },
  methodMeta: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  defaultBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryFixed,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  defaultBadgeText: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelMd,
    color: colors.primary,
  },
  methodActions: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  linkText: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyMd,
    color: colors.primary,
  },
  destructiveLink: {
    color: colors.error,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.full,
    padding: spacing.xs,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelLg,
    color: colors.onSurfaceVariant,
  },
  segmentTextActive: {
    color: colors.onPrimary,
  },
  expiryRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  rowField: {
    flex: 1,
  },
  secondaryAction: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  secondaryActionText: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
  },
});

export default PaymentMethodsScreen;
