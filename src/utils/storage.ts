import { WeekData, YearlyProgress, Achievement, LearningGoals, LearningPlan } from '../types/types';

const STORAGE_KEYS = {
  DATA: 'germanTracker_data',
  SETTINGS: 'germanTracker_settings'
};

interface StoredData {
  weekData: WeekData;
  streak: number;
  yearlyProgress: YearlyProgress[];
  achievements: Achievement[];
  goals: LearningGoals;
  learningPlan: LearningPlan;
}

export const getStoredData = (): StoredData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DATA);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading stored data:', error);
    return null;
  }
};

export const saveData = (data: StoredData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

interface Settings {
  darkMode: boolean;
  viewMode: 'today' | 'week' | 'progress';
}

export const getStoredSettings = (): Settings | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
};

export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const exportYearlyData = (year: number): string => {
  try {
    const stored = getStoredData();
    if (!stored) return '';
    
    const yearData = stored.yearlyProgress.find(y => y.year === year);
    if (!yearData) return '';
    
    const data = {
      yearlyProgress: yearData,
      achievements: stored.achievements,
      goals: stored.goals,
      exportDate: new Date().toISOString(),
      year
    };
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return '';
  }
};

export const importYearlyData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    const stored = getStoredData();
    if (!stored) return false;
    
    if (data.yearlyProgress) {
      // Update or add the yearly progress
      const existingIndex = stored.yearlyProgress.findIndex(y => y.year === data.year);
      if (existingIndex >= 0) {
        stored.yearlyProgress[existingIndex] = data.yearlyProgress;
      } else {
        stored.yearlyProgress.push(data.yearlyProgress);
      }
    }
    
    if (data.achievements) {
      stored.achievements = data.achievements;
    }
    
    if (data.goals) {
      stored.goals = data.goals;
    }
    
    saveData(stored);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

export const clearAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.DATA);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};