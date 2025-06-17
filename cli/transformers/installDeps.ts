import { exec } from 'child_process';

import fs from 'fs-extra';
import chalk from 'chalk';

import { log } from '../utils/log.js';
import { i18n } from '../utils/i18n.js';

export const installDeps = async (projectDir: string) => {
  try {
    log(chalk.blue(i18n('Installing dependencies...')));

    const installationPromises = [
      exec(`cd "${projectDir}/client" && yarn install`),
    ];

    if (await fs.exists(`${projectDir}/server`)) {
      installationPromises.push(
        exec(`cd "${projectDir}/server" && yarn install`)
      );
    }

    await Promise.all(installationPromises);

    log(chalk.green(i18n('Dependencies successfully installed!')));
  } catch (error) {
    throw new Error(
      `${i18n('Unable to install dependencies. Please check the environment and try again. Details:')}\n${error as Error}`
    );
  }
};
