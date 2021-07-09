import * as localize from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import ru from './ru';

const resources = {
  en,
  ru,
  'ru-RU': ru,
  'en-US': en,
};

const getLanguageCode = () => {
  const languageCode = localize.locale;
  if (languageCode in resources) {
    return languageCode;
  }
  return Object.keys(resources)[0];
};

i18n
  .use(initReactI18next)
  .init({ resources, lng: getLanguageCode(), fallbackLng: 'en' });

export default i18n;
