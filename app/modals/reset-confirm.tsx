import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../(tabs)/colors';
import { Colors, ColorScheme } from '../(tabs)/types';

export default function ResetConfirmModal() {
  const colorScheme = useColorScheme() as ColorScheme;
  const router = useRouter();
  const params = useLocalSearchParams();
  const currentDay = params.currentDay ? parseInt(params.currentDay as string) : 0;
  
  const currentColors: Colors = colorScheme ? colors[colorScheme] : colors.light;

  const resetProgress = async () => {
    await AsyncStorage.multiRemove(['currentDay', 'lastCompleted', 'hasSeenWelcome']);
    router.dismiss();
    router.push('/modals/welcome');
  };

  const cancelReset = () => {
    router.dismiss();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.bgPrimary }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={[styles.modalContent, { backgroundColor: currentColors.bgContainer }]}>
        <View style={styles.resetIcon}>
          <Ionicons name="warning" size={48} color={currentColors.warningColor} />
        </View>
        
        <Text style={[styles.modalTitle, { color: currentColors.textPrimary }]}>
          Redefinir Progresso?
        </Text>
        
        <Text style={[styles.modalDescription, { color: currentColors.textSecondary }]}>
          Você está no dia {currentDay}. Perdeu a batalha? Redefina o dia, mas não desista de vencer a guerra!
        </Text>

        <Text style={[styles.resetWarning, { color: currentColors.warningColor }]}>
          ⚠️ Esta ação não pode ser desfeita!
        </Text>

        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.secondaryButton, { 
              borderColor: currentColors.milestoneBg 
            }]}
            onPress={cancelReset}
          >
            <Text style={[styles.secondaryButtonText, { color: currentColors.textSecondary }]}>
              Cancelar
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.modalButton, styles.warningButton, { 
              backgroundColor: currentColors.warningColor 
            }]}
            onPress={resetProgress}
          >
            <Text style={styles.primaryButtonText}>
              Redefinir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  resetIcon: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  resetWarning: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  warningButton: {
    // backgroundColor é definido inline
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});