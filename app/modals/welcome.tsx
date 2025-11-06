import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../(tabs)/colors';
import { Colors, ColorScheme } from '../(tabs)/types';

export default function WelcomeModal() {
  const colorScheme = useColorScheme() as ColorScheme;
  const [initialDayInput, setInitialDayInput] = useState<string>('');
  const router = useRouter();

  const currentColors: Colors = colorScheme ? colors[colorScheme] : colors.light;

  const handleInitialDaySubmit = async () => {
    const day = parseInt(initialDayInput);

    if (isNaN(day) || day < 0 || day > 365) {
      Alert.alert('Dia inválido', 'Por favor, digite um número entre 0 e 365');
      return;
    }

    const completedDays = Math.max(0, day - 1);
    const currentDayToSave = completedDays;

    const today = new Date().toISOString().split('T')[0];
    const lastCompletedValue = day <= 1 ? '' : today;

    await AsyncStorage.setItem('currentDay', currentDayToSave.toString());
    await AsyncStorage.setItem('lastCompleted', lastCompletedValue);
    await AsyncStorage.setItem('hasSeenWelcome', 'true');

    router.dismiss();
    router.replace('/');

    if (day > 0) {
      Alert.alert(
        'Progresso salvo!',
        `Você está no dia ${day}. ${completedDays} dias completos registrados. O botão estará disponível amanhã! 💪`
      );
    } else {
      Alert.alert(
        'Jornada iniciada!',
        'Começando do dia 0. Boa sorte na sua jornada! 🌟'
      );
    }
  };

  const skipInitialDay = async () => {
    await AsyncStorage.setItem('currentDay', '0');
    await AsyncStorage.setItem('lastCompleted', '');
    await AsyncStorage.setItem('hasSeenWelcome', 'true');
    router.dismiss();
    router.replace('/');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.bgPrimary }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.modalContent, { backgroundColor: currentColors.bgContainer }]}>
        <Text style={[styles.modalTitle, { color: currentColors.textPrimary }]}>
          🎯 Bem-vindo à Sua Jornada!
        </Text>

        <Text style={[styles.modalDescription, { color: currentColors.textSecondary }]}>
          Em qual dia da retenção você está atualmente?
        </Text>

        <TextInput
          style={[styles.dayInput, {
            borderColor: currentColors.accentPrimary,
            backgroundColor: currentColors.bgSecondary,
            color: currentColors.textPrimary
          }]}
          placeholder="Digite o dia atual, não os completos"
          placeholderTextColor={currentColors.textSecondary}
          keyboardType="numeric"
          value={initialDayInput}
          onChangeText={setInitialDayInput}
          maxLength={3}
        />

        <Text style={[styles.explanationText, {
          color: currentColors.textSecondary,
          backgroundColor: currentColors.phaseBg
        }]}>
          • Se estiver começando agora clique em "Começar Jornada"{'\n'}
          • Digite em qual dia de retenção está, (Ex: 9º dia){'\n'}
          no contador mostrará 8, pois será apenas os dias vencidos.
        </Text>

        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.secondaryButton, {
              borderColor: currentColors.accentPrimary
            }]}
            onPress={skipInitialDay}
          >
            <Text style={[styles.secondaryButtonText, { color: currentColors.accentPrimary }]}>
              Começar Jornada
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, styles.primaryButton, {
              backgroundColor: initialDayInput ? currentColors.accentButton : currentColors.milestoneBg
            }]}
            onPress={handleInitialDaySubmit}
            disabled={!initialDayInput}
          >
            <Text style={styles.primaryButtonText}>
              Confirmar Dia
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
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  dayInput: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
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
  primaryButton: {
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