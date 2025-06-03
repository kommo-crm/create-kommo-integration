import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs-extra';
import chalk from 'chalk';

import { i18n } from './i18n.js';
import { log } from './log.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const templateDir = path.resolve(
  __dirname,
  '..',
  '..',
  'templates',
  'kommo-react-integration'
);

export const cloneTemplate = async (repoDir: string) => {
  log(chalk.blue(i18n('Downloading your widget...')));

  try {
    await fs.copy(templateDir, repoDir);

    log(chalk.green(`${i18n('Widget successfully uploaded to')} ${repoDir}`));
  } catch (error) {
    throw new Error(
      `${i18n('Unable to clone the repository. Please check your internet connection and try again. Details:')} ${error as Error}`
    );
  }
};
