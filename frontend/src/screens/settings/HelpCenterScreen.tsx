import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common/Card';
import SettingsScaffold from '../../components/settings/SettingsScaffold';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const faqs = [
  {
    question: 'How do I activate coverage before a shift?',
    answer:
      'Open plan selection, choose the coverage window that matches your ride block, and complete payment. Coverage begins as soon as the policy becomes active.',
  },
  {
    question: 'What should I keep ready before filing a claim?',
    answer:
      'Have trip evidence, payment confirmation, incident photos, and a short written description ready before submitting the claim form.',
  },
  {
    question: 'How quickly is profile information synced?',
    answer:
      'Changes made in account settings are stored in MongoDB immediately after saving and become the default data for future policy and claim flows.',
  },
];

const HelpCenterScreen = ({ navigation }: any) => {
  return (
    <SettingsScaffold
      title="Help Center"
      subtitle="Fast answers for coverage, claims, and account setup."
      navigation={navigation}
    >
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Support Channels</Text>
        <View style={styles.channelRow}>
          <View style={styles.channelIcon}>
            <Ionicons name="mail-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.channelBody}>
            <Text style={styles.channelTitle}>Email Support</Text>
            <Text style={styles.channelText}>support@ridesure.app</Text>
          </View>
        </View>
        <View style={styles.channelRow}>
          <View style={styles.channelIcon}>
            <Ionicons name="call-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.channelBody}>
            <Text style={styles.channelTitle}>Claims Hotline</Text>
            <Text style={styles.channelText}>+91 1800 889 7788</Text>
          </View>
        </View>
        <View style={styles.channelRow}>
          <View style={styles.channelIcon}>
            <Ionicons name="time-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.channelBody}>
            <Text style={styles.channelTitle}>Response Window</Text>
            <Text style={styles.channelText}>8 AM to 10 PM IST, seven days a week</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Popular Questions</Text>
        {faqs.map((faq) => (
          <View key={faq.question} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </View>
        ))}
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
  channelRow: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surfaceContainerLow,
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelBody: {
    flex: 1,
  },
  channelTitle: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurface,
    marginBottom: 4,
  },
  channelText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: typography.lineHeight.bodyMd,
  },
  faqItem: {
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surfaceContainerLow,
  },
  faqQuestion: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurface,
    marginBottom: 6,
  },
  faqAnswer: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: typography.lineHeight.bodyMd,
  },
});

export default HelpCenterScreen;
