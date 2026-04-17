import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../components/common/Card';
import SettingsScaffold from '../../components/settings/SettingsScaffold';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const sections = [
  {
    title: 'Coverage Activation',
    body:
      'Coverage becomes effective only after payment confirmation and remains valid for the purchased duration. Claims outside the active coverage window may be rejected.',
  },
  {
    title: 'Claims Responsibility',
    body:
      'Trip details, incident summaries, and uploaded evidence must be truthful and complete. RideSure may request supporting proof before approving a payout.',
  },
  {
    title: 'Data Handling',
    body:
      'Editable profile data saved in account settings is stored in MongoDB and used to prefill onboarding, policy, and support flows inside the application.',
  },
  {
    title: 'Payment References',
    body:
      'Saved payment methods are convenience records for checkout context. Sensitive card details should never be stored in full; only masked references belong in the account.',
  },
  {
    title: 'Support and Escalation',
    body:
      'For account issues, policy questions, or claim disputes, contact RideSure support through the help center. Escalations are reviewed against the latest account and policy data.',
  },
];

const TermsPolicyScreen = ({ navigation }: any) => {
  return (
    <SettingsScaffold
      title="Terms & Policy"
      subtitle="Core usage rules and privacy expectations for the RideSure account."
      navigation={navigation}
    >
      {sections.map((section) => (
        <Card key={section.title} style={styles.card}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionBody}>{section.body}</Text>
        </Card>
      ))}
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
  },
  sectionBody: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: typography.lineHeight.bodyMd,
  },
});

export default TermsPolicyScreen;
