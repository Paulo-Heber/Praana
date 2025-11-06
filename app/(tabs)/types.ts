// types.ts
export type ColorScheme = 'light' | 'dark' | null | undefined;

export type Colors = {
  bgPrimary: string;
  bgSecondary: string;
  bgContainer: string;
  textPrimary: string;
  textSecondary: string;
  accentPrimary: string;
  accentSecondary: string;
  accentButton: string;
  milestoneBg: string;
  milestoneSpecial: string;
  phaseBg: string;
  goalBg: string;
  positiveColor: string;
  warningColor: string;
};

export type ColorPalette = {
  light: Colors;
  dark: Colors;
};

export type Symptom = {
  text: string;
  type: 'positive' | 'warning' | 'title';
};

export type PhaseData = {
  title: string;
  description: string;
  symptoms: Symptom[];
  goal?: string;
};

export type PhaseDataMap = {
  phase0to4: PhaseData;
  phase5to9: PhaseData;
  phase10to30: PhaseData;
  phase30to90: PhaseData;
  phase90plus: PhaseData;
};

export type SpecialDayMessages = {
  [key: number]: string;
};