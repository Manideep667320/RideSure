import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';
import { Card } from '../../components/common/Card';
import { InputField } from '../../components/ui/InputField';
import { GradientButton } from '../../components/ui/GradientButton';

const ClaimFormScreen = ({ navigation }: any) => {
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Header ──────────────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>File a Claim</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* ─── Claim Evidence Section ──────────────────────── */}
        <Text style={styles.sectionTitle}>Claim Evidence</Text>
        <Text style={styles.sectionDesc}>
          Please provide visual evidence of the incident and a brief description.
        </Text>

        {/* ─── Upload Area ─────────────────────────────────── */}
        <TouchableOpacity activeOpacity={0.8}>
          <Card variant="outlined" style={styles.uploadCard}>
            <View style={styles.uploadIconContainer}>
              <Ionicons name="cloud-upload-outline" size={40} color={colors.primaryContainer} />
            </View>
            <Text style={styles.uploadTitle}>Upload Photos</Text>
            <Text style={styles.uploadDesc}>
              Tap to select images from your gallery or camera
            </Text>
            <View style={styles.uploadFormats}>
              <Text style={styles.uploadFormatText}>JPG, PNG up to 10MB each</Text>
            </View>
          </Card>
        </TouchableOpacity>

        {/* ─── Uploaded Items Preview ──────────────────────── */}
        <View style={styles.uploadedGrid}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.uploadedItem}>
              <View style={styles.uploadedImagePlaceholder}>
                <Ionicons name="image-outline" size={24} color={colors.onSurfaceVariant} />
              </View>
              <TouchableOpacity style={styles.uploadedRemove}>
                <Ionicons name="close-circle" size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ─── Description ─────────────────────────────────── */}
        <InputField
          label="Incident Description"
          placeholder="Describe what happened, including date, time, and location..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
        />

        {/* ─── Incident Type Selector ──────────────────────── */}
        <Text style={styles.fieldLabel}>Incident Type</Text>
        <View style={styles.typeGrid}>
          {['Accident', 'Vehicle Damage', 'Medical', 'Equipment Loss'].map(
            (type, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.typeChip,
                  index === 0 && styles.typeChipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.typeChipText,
                    index === 0 && styles.typeChipTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* ─── Submit Button ───────────────────────────────── */}
        <GradientButton
          title="Submit Claim"
          onPress={() => navigation.navigate('ClaimProcessing')}
          style={{ marginTop: spacing['2xl'] }}
        />

        {/* ─── Disclaimer ─────────────────────────────────── */}
        <Text style={styles.disclaimer}>
          By submitting, you confirm that all information provided is accurate and truthful. Fraudulent claims are subject to legal action.
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.screenPadding,
  },

  // ─── Header ────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.titleLg,
    fontWeight: '700',
    color: colors.onSurface,
  },

  // ─── Section ───────────────────────────────────────
  sectionTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 8,
  },
  sectionDesc: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
    marginBottom: spacing['2xl'],
  },

  // ─── Upload ────────────────────────────────────────
  uploadCard: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    marginBottom: spacing.sectionGap,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: colors.outlineVariant,
  },
  uploadIconContainer: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 6,
  },
  uploadDesc: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 12,
  },
  uploadFormats: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  uploadFormatText: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelMd,
    color: colors.onSurfaceVariant,
  },

  // ─── Uploaded Items ────────────────────────────────
  uploadedGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: spacing['2xl'],
  },
  uploadedItem: {
    position: 'relative',
  },
  uploadedImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedRemove: {
    position: 'absolute',
    top: -6,
    right: -6,
  },

  // ─── Incident Type ─────────────────────────────────
  fieldLabel: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.labelLg,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: spacing.lg,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerHigh,
  },
  typeChipSelected: {
    backgroundColor: colors.primaryContainer,
  },
  typeChipText: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.bodyMd,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  typeChipTextSelected: {
    color: colors.onPrimary,
  },

  // ─── Disclaimer ────────────────────────────────────
  disclaimer: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.lg,
    lineHeight: 18,
  },
});

export default ClaimFormScreen;
