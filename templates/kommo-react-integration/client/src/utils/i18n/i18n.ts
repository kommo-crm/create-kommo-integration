import { I18n } from './i18n.types';

/**
 * The method for retrieving translations for the current locale.
 */
export let i18n: I18n;

export const initializeI18n = (callback: I18n) => {
  i18n = (key) => callback(key) || key;
};
