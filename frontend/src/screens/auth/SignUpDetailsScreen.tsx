import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { InputField } from '../../components/ui/InputField';
import { GradientButton } from '../../components/ui/GradientButton';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const SignUpDetailsScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, user } = useAuth();

  const handleSave = async () => {
    if (!name.trim()) {
       alert("Please enter a valid name.");
       return;
    }
    try {
      setLoading(true);
      // Synchronize with our MongoDB backend route we just created using standard secure requests
      const response = await api.put('/auth/profile', { name });
      
      if (response && response.data && response.data.success) {
         // Update Local Context
         if (user) {
            setUser({ ...user, name });
         }
         
         // Navigate Home
         navigation.reset({
           index: 0,
           routes: [{ name: ROUTES.MAIN.HOME }],
         });
      }
    } catch (err: any) {
      alert(`Error updating profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <View style={styles.logoBg}>
                <Ionicons name="person-add" size={24} color={colors.primary} />
              </View>
              <Text style={styles.logoText}>Almost Done!</Text>
            </View>
            <Text style={styles.brandDesc}>Firebase verified your phone successfully. Let's setup your RideSure identity.</Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputWrapper}>
              <InputField
                label="Full Name"
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChangeText={setName}
              />
            </View>

            <GradientButton 
              title={loading ? "Saving..." : "Complete Setup"} 
              onPress={handleSave} 
              style={{ marginTop: 8 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: spacing.screenPadding, justifyContent: 'center' },
  header: { marginBottom: spacing['3xl'] },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  logoBg: { width: 48, height: 48, borderRadius: borderRadius.md, backgroundColor: colors.primaryFixed, alignItems: 'center', justifyContent: 'center' },
  logoText: { fontFamily: typography.fontFamily.headlineBold, fontSize: typography.fontSize.titleLg, color: colors.primary },
  brandDesc: { fontFamily: typography.fontFamily.bodyMedium, fontSize: typography.fontSize.bodyLg, color: colors.onSurfaceVariant, lineHeight: 24 },
  formSection: { backgroundColor: colors.surfaceContainerLowest, padding: spacing.xl, borderRadius: borderRadius['2xl'], shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 2, marginBottom: spacing.xl },
  inputWrapper: { marginBottom: spacing.lg },
});

export default SignUpDetailsScreen;
