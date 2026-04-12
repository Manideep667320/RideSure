import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Card } from '../../components/common/Card';
import { GradientButton } from '../../components/ui/GradientButton';

const SplashScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Top Spacer / Visual Area */}
        <View style={styles.topSection}>
          <LinearGradient
            colors={[...gradients.primary.colors]}
            style={styles.logoIconLarge}
          >
            <Ionicons name="shield-checkmark" size={64} color="#fff" />
          </LinearGradient>
        </View>

        {/* Content Area */}
        <View style={styles.contentSection}>
          <Text style={styles.brandTitle}>RideSure</Text>
          <Text style={styles.tagline}>Daily Protection for Your Work</Text>
          
          <Card variant="surface" style={styles.statusCard}>
             <Text style={styles.statusLabel}>Current Status</Text>
             <View style={styles.statusBadge}>
                <Ionicons name="checkmark-circle" size={16} color={colors.secondary} />
                <Text style={styles.statusActive}>Active Coverage</Text>
             </View>
          </Card>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomSection}>
          <GradientButton 
             title="Get Started" 
             onPress={() => navigation.navigate('Login')} 
          />
          <Text style={styles.termsText}>
            By tapping Get Started, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

// Let's import gradients correctly
import { gradients } from '../../theme/gradients';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
    padding: spacing.screenPadding,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconLarge: {
    width: 120,
    height: 120,
    borderRadius: borderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.displayMd,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  tagline: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.titleMd,
    color: colors.onSurfaceVariant,
    marginBottom: spacing['2xl'],
    textAlign: 'center',
  },
  statusCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: borderRadius['2xl'],
  },
  statusLabel: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelMd,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusActive: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyLg,
    color: colors.secondary,
  },
  bottomSection: {
    paddingBottom: spacing.xl,
  },
  termsText: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 20,
  },
});

export default SplashScreen;
