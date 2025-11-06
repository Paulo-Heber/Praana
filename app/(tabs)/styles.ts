// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mainContainer: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  dayCounter: {
    alignItems: 'center',
    marginVertical: 32,
  },
  dayNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    lineHeight: 72,
  },
  dayLabel: {
    fontSize: 18,
    marginTop: 8,
  },
  milestoneContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 24,
  },
  milestone: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  milestoneSpecial: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  milestoneCompleted: {
    transform: [{ scale: 1.2 }],
  },
  completeButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 24,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  phaseInfo: {
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  phaseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  symptomsList: {
    marginTop: 8,
  },
  symptomItem: {
    paddingVertical: 6,
  },
  symptomText: {
    fontSize: 14,
  },
  goalSection: {
    padding: 12,
    marginTop: 16,
    borderRadius: 4,
    borderLeftWidth: 4,
  },
  goalTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  goalText: {
    fontSize: 14,
    lineHeight: 20,
  },
  resetButton: {
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  debugButton: {
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  debugButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});