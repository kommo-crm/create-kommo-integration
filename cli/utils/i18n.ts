import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { AvailableLocale } from '../types.js';

const translations: Record<string, string> = {};
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const setLocale = (locale: AvailableLocale): void => {
  const localesPath = path.join(__dirname, '..', 'locales', `${locale}.json`);

  if (fs.existsSync(localesPath)) {
    Object.assign(
      translations,
      JSON.parse(fs.readFileSync(localesPath, 'utf8')) as Record<string, string>
    );
  }
};

export const i18n = (
  key: string,
  params: Record<string, string> = {}
): string => {
  let translation = translations[key] || key;

  Object.entries(params).forEach(([param, value]) => {
    translation = translation.replace(`{${param}}`, value);
  });

  return translation;
};
