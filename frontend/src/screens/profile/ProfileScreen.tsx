import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Card } from '../../components/common/Card';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';

const ProfileItem = ({ icon, title, subtitle, onPress, isDestructive = false }: any) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.profileItemLeft}>
      <View style={[styles.iconBg, isDestructive && { backgroundColor: colors.errorContainer }]}>
        <Ionicons name={icon} size={20} color={isDestructive ? colors.error : colors.primary} />
      </View>
      <View>
        <Text style={[styles.itemTitle, isDestructive && { color: colors.error }]}>{title}</Text>
        {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.onSurfaceVariant} />
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.AUTH.LOGIN }],
    });
  };

  const getInitials = (name?: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarInitials}>{getInitials(user?.name)}</Text>
          </LinearGradient>
          <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.userRole}>{user?.phone || 'No Phone Registered'}</Text>
        </View>

        {/* Stats Card */}
        <Card style={styles.statsCard}>
          <View style={styles.statColumn}>
            <Text style={styles.statValue}>14</Text>
            <Text style={styles.statLabel}>Active Days</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statColumn}>
            <Text style={styles.statValue}>Standard</Text>
            <Text style={styles.statLabel}>Current Plan</Text>
          </View>
        </Card>

        {/* Settings Links */}
        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <Card variant="surface" level="lowest" style={styles.linksCard}>
            <ProfileItem 
              icon="person-outline" 
              title="Personal Information" 
              subtitle="Update your name, phone" 
            />
            <View style={styles.linkDivider} />
            <ProfileItem 
              icon="card-outline" 
              title="Payment Methods" 
              subtitle="Manage UPI and cards" 
            />
            <View style={styles.linkDivider} />
            <ProfileItem 
              icon="shield-checkmark-outline" 
              title="Insurance Documents" 
              subtitle="View policy PDFs" 
            />
          </Card>
        </View>

        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Card variant="surface" level="lowest" style={styles.linksCard}>
            <ProfileItem 
              icon="help-buoy-outline" 
              title="Help Center" 
            />
            <View style={styles.linkDivider} />
            <ProfileItem 
              icon="document-text-outline" 
              title="Terms & Privacy" 
            />
          </Card>
        </View>

        <View style={styles.linksSection}>
          <Card variant="surface" level="low" style={styles.linksCard}>
            <ProfileItem 
              icon="log-out-outline" 
              title="Log Out" 
              isDestructive={true}
              onPress={handleLogout}
            />
          </Card>
        </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleLg,
    color: colors.onSurface,
  },
  content: {
    padding: spacing.screenPadding,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    marginTop: spacing.md,
  },
  avatarGradient: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarInitials: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.displaySm,
    color: '#fff',
  },
  userName: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.headlineSm,
    color: colors.onSurface,
    marginBottom: 4,
  },
  userRole: {
    fontFamily: typography.fontFamily.bodyMedium,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurfaceVariant,
  },
  statsCard: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginBottom: spacing['2xl'],
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.surfaceVariant,
  },
  statValue: {
    fontFamily: typography.fontFamily.headlineBold,
    fontSize: typography.fontSize.titleLg,
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: typography.fontFamily.labelMedium,
    fontSize: typography.fontSize.labelMd,
    color: colors.onSurfaceVariant,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.headlineSemiBold,
    fontSize: typography.fontSize.titleMd,
    color: colors.onSurface,
    marginBottom: 12,
  },
  linksSection: {
    marginBottom: spacing.xl,
  },
  linksCard: {
    padding: 0,
    overflow: 'hidden',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontFamily: typography.fontFamily.bodySemiBold,
    fontSize: typography.fontSize.bodyLg,
    color: colors.onSurface,
  },
  itemSubtitle: {
    fontFamily: typography.fontFamily.bodyRegular,
    fontSize: typography.fontSize.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  linkDivider: {
    height: 1,
    backgroundColor: colors.surfaceContainerHighest,
    marginHorizontal: 16,
  },
});

export default ProfileScreen;
