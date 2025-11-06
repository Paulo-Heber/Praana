import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DebugModal() {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState<string>('');

  const simulateYesterday = async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    
    await AsyncStorage.setItem('lastCompleted', yesterdayString);
    Alert.alert('Simulado!', `lastCompleted = ${yesterdayString}`);
    router.dismiss();
  };

  const simulateTwoDaysAgo = async () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const twoDaysAgoString = twoDaysAgo.toISOString().split('T')[0];
    
    await AsyncStorage.setItem('lastCompleted', twoDaysAgoString);
    Alert.alert('Simulado!', `lastCompleted = ${twoDaysAgoString}`);
    router.dismiss();
  };

  const resetLastCompleted = async () => {
    await AsyncStorage.setItem('lastCompleted', '');
    Alert.alert('Resetado!', 'lastCompleted = ""');
    router.dismiss();
  };

  const setSpecificDay = async () => {
    const day = parseInt(currentDay);
    if (isNaN(day) || day < 0) {
      Alert.alert('Erro', 'Digite um número válido');
      return;
    }
    
    await AsyncStorage.setItem('currentDay', day.toString());
    Alert.alert('Alterado!', `currentDay = ${day}`);
    router.dismiss();
  };

  const showCurrentData = async () => {
    const currentDay = await AsyncStorage.getItem('currentDay');
    const lastCompleted = await AsyncStorage.getItem('lastCompleted');
    const today = new Date().toISOString().split('T')[0];
    
    Alert.alert(
      'Dados Atuais',
      `currentDay: ${currentDay}\nlastCompleted: ${lastCompleted}\nhoje: ${today}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>🧪 Debug</Text>
        
        <TouchableOpacity style={styles.debugButton} onPress={simulateYesterday}>
          <Text style={styles.debugButtonText}>Simular Ontem</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.debugButton} onPress={simulateTwoDaysAgo}>
          <Text style={styles.debugButtonText}>Simular 2 Dias Atrás</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.debugButton} onPress={resetLastCompleted}>
          <Text style={styles.debugButtonText}>Resetar Last Completed</Text>
        </TouchableOpacity>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.dayInput}
            placeholder="Novo currentDay"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={currentDay}
            onChangeText={setCurrentDay}
          />
          <TouchableOpacity style={styles.debugButton} onPress={setSpecificDay}>
            <Text style={styles.debugButtonText}>Setar Dia</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.debugButton} onPress={showCurrentData}>
          <Text style={styles.debugButtonText}>Ver Dados Atuais</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.debugButton, styles.closeButton]} onPress={() => router.dismiss()}>
          <Text style={styles.debugButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  debugButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#667eea',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#d69e2e',
  },
  debugButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 10,
  },
  dayInput: {
    borderWidth: 1,
    borderColor: '#667eea',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
});