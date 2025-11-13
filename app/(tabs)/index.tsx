// index.tsx (HomeScreen refatorado)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

// Importações dos arquivos separados
import { styles } from './styles';
import { colors } from './colors';
import { phaseData, milestones, specialDayMessages } from './constants';
import {
  Colors,
  ColorScheme,
  PhaseData
} from './types';

export default function HomeScreen() {
  const colorScheme = useColorScheme() as ColorScheme;
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [lastCompleted, setLastCompleted] = useState<string>('');
  const [isTodayCompleted, setIsTodayCompleted] = useState<boolean>(false);

  const router = useRouter();

  const currentColors: Colors = colorScheme ? colors[colorScheme] : colors.light;

  const getPhaseInfo = (day: number): PhaseData => {
    if (day <= 4) return phaseData.phase0to4;
    if (day <= 9) return phaseData.phase5to9;
    if (day <= 30) return phaseData.phase10to30;
    if (day <= 90) return phaseData.phase30to90;
    return phaseData.phase90plus;
  };

  // Hooks de efeito e focus
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const loadDataOnFocus = async () => {
        try {
          const savedDay = await AsyncStorage.getItem('currentDay');
          const savedLastCompleted = await AsyncStorage.getItem('lastCompleted');

          if (isActive) {
            if (savedDay) setCurrentDay(parseInt(savedDay));
            if (savedLastCompleted) setLastCompleted(savedLastCompleted);
          }
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        }
      };

      loadDataOnFocus();

      return () => {
        isActive = false;
      };
    }, [])
  );

  useEffect(() => {
    const checkFirstLoad = async () => {
      try {
        const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) router.push('/modals/welcome');
      } catch (error) {
        console.error('Erro ao verificar primeira carga:', error);
      }
    };
    checkFirstLoad();
  }, []);

  useEffect(() => {
    checkIfTodayCompleted();
  }, [lastCompleted]);

  const checkIfTodayCompleted = (): void => {
    if (!lastCompleted) {
      setIsTodayCompleted(false);
      return;
    }

    const lastCompletedDate = new Date(lastCompleted);
    const now = new Date();

    // Converte ambas as datas para YYYY-MM-DD para comparar apenas o dia
    const lastCompletedDay = lastCompletedDate.toISOString().split('T')[0];
    const currentDay = now.toISOString().split('T')[0];

    setIsTodayCompleted(lastCompletedDay === currentDay);
  };

  const confirmReset = () => {
    router.push(`/modals/reset-confirm?currentDay=${currentDay}`);
  };

  const completeDay = async (): Promise<void> => {
    if (isTodayCompleted) return;

    const today = new Date().toISOString().split('T')[0];

    if (currentDay <= 1) {
      try {
        await AsyncStorage.setItem('lastCompleted', today);
        setLastCompleted(today);
        setIsTodayCompleted(true);
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
      }
      return;
    }

    const newDay = currentDay + 1;
    try {
      await AsyncStorage.setItem('currentDay', newDay.toString());
      await AsyncStorage.setItem('lastCompleted', today);

      setCurrentDay(newDay);
      setLastCompleted(today);
      setIsTodayCompleted(true);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  // Componentes de renderização
  const renderMilestones = () => {
    const dots: React.JSX.Element[] = [];
    for (let i = 1; i <= 90; i++) {
      const isSpecial = milestones.includes(i);
      const isCompleted = i <= currentDay;

      dots.push(
        <View
          key={i}
          style={[
            styles.milestone,
            {
              backgroundColor: isCompleted ? currentColors.accentPrimary : currentColors.milestoneBg,
            },
            isSpecial && styles.milestoneSpecial,
            isCompleted && styles.milestoneCompleted
          ]}
        />
      );
    }

    return <View style={styles.milestoneContainer}>{dots}</View>;
  };

  const renderPhaseInfo = () => {
    const phase = getPhaseInfo(currentDay);
    const specialMessage = specialDayMessages[currentDay];

    return (
      <View style={[styles.phaseInfo, { backgroundColor: currentColors.phaseBg }]}>
        <Text style={[styles.phaseTitle, { color: currentColors.textPrimary }]}>
          {phase.title}
        </Text>

        <Text style={[styles.phaseDescription, { color: currentColors.textSecondary }]}>
          {phase.description}
        </Text>

        {specialMessage && (
          <View style={[styles.goalSection, { backgroundColor: currentColors.goalBg, borderLeftColor: currentColors.accentPrimary }]}>
            <Text style={[styles.goalTitle, { color: currentColors.textPrimary }]}>
              🎯 Marco Especial do Dia {currentDay}
            </Text>
            <Text style={[styles.goalText, { color: currentColors.textSecondary }]}>
              {specialMessage}
            </Text>
          </View>
        )}

        {phase.symptoms && phase.symptoms.length > 0 && (
          <View style={styles.symptomsList}>
            {phase.symptoms.map((item, index) => (
              <View key={index} style={styles.symptomItem}>
                <Text style={[
                  styles.symptomText,
                  {
                    color: item.type === 'positive' ? currentColors.positiveColor :
                      item.type === 'warning' ? currentColors.warningColor :
                        item.type === 'title' ? currentColors.textPrimary :
                          currentColors.textSecondary,
                    fontWeight: item.type === 'title' ? 'bold' : 'normal',
                    fontSize: item.type === 'title' ? 16 : 14,
                  }
                ]}>
                  {item.type === 'title' ? item.text : `• ${item.text}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {phase.goal && (
          <View style={[styles.goalSection, { backgroundColor: currentColors.goalBg, borderLeftColor: currentColors.accentPrimary }]}>
            <Text style={[styles.goalTitle, { color: currentColors.textPrimary }]}>
              🎯 Meta desta Fase
            </Text>
            <Text style={[styles.goalText, { color: currentColors.textSecondary }]}>
              {phase.goal}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View>
          <Text style={[styles.title, { color: currentColors.textPrimary }]}>
            Contador de Dias
          </Text>
          <Text style={[styles.subtitle, { color: currentColors.textSecondary }]}>
            Sua jornada de transformação
          </Text>
        </View>
        <View style={styles.headerButtons}>
          {/* <TouchableOpacity
            style={[styles.debugButton, { backgroundColor: currentColors.goalBg }]}
            onPress={() => router.push('/modals/debug')}
          >
            <Text style={styles.debugButtonText}>🐛</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: currentColors.phaseBg }]}
            onPress={confirmReset}
          >
            <Ionicons name="refresh" size={20} color={currentColors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.bgPrimary }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.mainContainer, { backgroundColor: currentColors.bgContainer }]}>
          {renderHeader()}

          <View style={styles.dayCounter}>
            <Text style={[styles.dayNumber, { color: currentColors.accentPrimary }]}>
              {currentDay}
            </Text>
            <Text style={[styles.dayLabel, { color: currentColors.textSecondary }]}>
              dias
            </Text>
          </View>

          {renderMilestones()}

          <TouchableOpacity
            style={[
              styles.completeButton,
              {
                backgroundColor: isTodayCompleted ? currentColors.milestoneBg : currentColors.accentButton,
              }
            ]}
            onPress={completeDay}
            disabled={isTodayCompleted}
          >
            <Text style={styles.completeButtonText}>
              {isTodayCompleted
                ? '✓ Dia Completo - Volte amanhã!'
                : currentDay <= 1
                  ? '🎯 Iniciar Jornada'
                  : 'Marcar Dia Completo'
              }
            </Text>
          </TouchableOpacity>

          {renderPhaseInfo()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}