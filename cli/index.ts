#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { rimraf } from 'rimraf';

import { log } from './utils/log.js';
import { i18n, setLocale } from './utils/i18n.js';
import { cloneTemplate } from './utils/cloneTemplate.js';
import { logFinalMessage } from './utils/logFinalMessage.js';

import { getProjectDir } from './prompts/getProjectDir.js';
import { getLocale } from './prompts/getLocale.js';
import { getManifest } from './prompts/getManifest.js';
import { getIsTestFunctionalityEnabled } from './prompts/getIsTestFunctionalityEnabled.js';

import { updateManifest } from './transformers/updateManifest.js';
import { installDeps } from './transformers/installDeps.js';
import { injectCallbacks } from './transformers/injectCallbacks.js';
import { deleteUnusedLocales } from './transformers/deleteUnusedLocales.js';

const program = new Command();

let projectDir: string | null = null;

const cancel = () => {
  if (projectDir) {
    rimraf.sync(projectDir);
  }
};

process.on('SIGINT', () => {
  log(chalk.yellow(i18n('Process interrupted by the user. Canceling...')));

  cancel();

  process.exit(0);
});

program
  .argument('[directory]', 'Directory name')
  .option('--en', 'Use English language')
  .option('--es', 'Usa el idioma español')
  .option('--pt', 'Use o idioma português')
  .action(async (dirName, options) => {
    try {
      const locale = await getLocale({
        en: options.en,
        es: options.es,
        pt: options.pt,
      });

      setLocale(locale);

      projectDir = await getProjectDir(dirName);

      const { locales, locations, support } = await getManifest();

      const isTestFunctionalityEnabled = await getIsTestFunctionalityEnabled();

      await cloneTemplate(projectDir);

      await Promise.all([
        updateManifest({
          projectDir,
          locales,
          locations,
          support: {
            link: support.link,
            email: support.email,
          },
        }),

        deleteUnusedLocales(projectDir, locales),

        injectCallbacks({
          projectDir,
          isTestFunctionalityEnabled,
          locations,
        }),
      ]);

      await installDeps(projectDir);

      logFinalMessage(projectDir, locations);
    } catch (error) {
      cancel();

      throw error;
    }
  });

program.parse(process.argv);
