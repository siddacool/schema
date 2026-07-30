import { getLocalStoreData } from '$lib/utils/storage';
import type { DateFormatMode, ThemeMode } from '../types';
import { DEFAULT_DATE_FORMAT, LOCAL_STORE_SETTINGS_CONFIG } from '../const';

export type SettingsConfig = {
  theme: ThemeMode;
  dateFormat: DateFormatMode;
};

const defaultStorageData: SettingsConfig = {
  theme: 'auto',
  dateFormat: DEFAULT_DATE_FORMAT,
};

const dataFromStorage = getLocalStoreData<SettingsConfig>('local', LOCAL_STORE_SETTINGS_CONFIG);

function createSettingsStore() {
  let settings: SettingsConfig = $state({ ...defaultStorageData, ...dataFromStorage });

  return {
    get settings() {
      return settings;
    },
    update(value: SettingsConfig) {
      settings = value;
    },
  };
}

export const settingsStore = createSettingsStore();
