import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LanguageKeys } from '~constants/languages';
import { en } from './en';

const resources = {
  en,
};

/**
 * Initializes i18next with resources and other settings
 */
export function initI18Next(): Promise<i18next.TFunction> {
  return i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: LanguageKeys.en,
      interpolation: {
        escapeValue: false, // React already safe from xss
      },
    });
}
