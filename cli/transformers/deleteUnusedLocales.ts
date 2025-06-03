import path from 'path';

import fs from 'fs-extra';

export const deleteUnusedLocales = async (
  projectDir: string,
  locales: string[]
) => {
  const i18nDir = path.join(projectDir, 'client', 'public', 'i18n');
  const files = await fs.readdir(i18nDir);

  const promises: Promise<any>[] = [];

  files.forEach((file) => {
    const locale = path.basename(file, '.json');

    if (!locales.includes(locale)) {
      const filePath = path.join(i18nDir, file);

      promises.push(fs.unlink(filePath));
    }
  });

  await Promise.all(promises);
};
