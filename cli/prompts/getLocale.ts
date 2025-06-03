import inquirer from 'inquirer';

import { i18n, setLocale } from '../utils/i18n.js';
import { AvailableLocale } from '../types.js';

import { safePromptWrapper } from './utils/safePromptWrapper.js';

const LOCALE_CODE_REGEX = /[a-z]{2}/;

export const detectSystemLocale = (): AvailableLocale | null => {
  const envLang =
    process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || '';
  const lowerCaseLang = envLang.toLowerCase();

  const match = lowerCaseLang.match(LOCALE_CODE_REGEX);

  if (!match) {
    return null;
  }

  const langCode = match[0];

  return (
    Object.values(AvailableLocale).find(
      (locale) => locale.toLowerCase() === langCode
    ) ?? null
  );
};

type ForcedLocales = Partial<
  Record<
    | AvailableLocale.English
    | AvailableLocale.Portuguese
    | AvailableLocale.Spanish,
    boolean
  >
>;

export const getLocale = async (forcedLocales: ForcedLocales) => {
  const { es, pt, en } = forcedLocales;

  let locale = AvailableLocale.English;

  switch (true) {
    case es:
      locale = AvailableLocale.Spanish;
      break;

    case pt:
      locale = AvailableLocale.Portuguese;
      break;

    case en:
      locale = AvailableLocale.English;
      break;

    default: {
      const systemLocale = detectSystemLocale();

      locale = systemLocale || AvailableLocale.English;

      setLocale(locale);

      const { language } = await safePromptWrapper(
        inquirer.prompt([
          {
            type: 'list',
            name: 'language',
            message: i18n('Choose preferred language:'),
            choices: [
              { name: 'English', value: AvailableLocale.English },
              { name: 'Español', value: AvailableLocale.Spanish },
              { name: 'Português', value: AvailableLocale.Portuguese },
            ],
            theme: {
              helpMode: 'never',
            },
            default: systemLocale || AvailableLocale.English,
          },
        ])
      );

      locale = language;
    }
  }

  return locale;
};
