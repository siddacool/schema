import type { DatePickerFormat } from '@flightlesslabs/dodo-ui-date';

export type DateFormatMode = 'DD/MM/YYYY' | 'MM/DD/YYYY';

export type DateFormatOption = {
  label: string;
  value: DateFormatMode;
  valueDatePickerFormat: DatePickerFormat;
};

export type ThemeMode = 'light' | 'dark' | 'auto';

export type ThemeOption = {
  value: ThemeMode;
  label: string;
};

export const enum ThemeAppBarColors {
  LIGHT = '#ffffff',
  DARK = '#1d161e',
}

export type SettingsConfig = {
  theme: ThemeMode;
  dateFormat: DateFormatMode;
};
