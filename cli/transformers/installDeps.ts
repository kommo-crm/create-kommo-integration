import { execSync } from 'child_process';

import chalk from 'chalk';

import { log } from '../utils/log.js';
import { i18n } from '../utils/i18n.js';

export const installDeps = async (projectDir: string) => {
  try {
    execSync(`cd "${projectDir}/client" && yarn install`);

    log(chalk.green(i18n('Dependencies successfully installed!')));
  } catch (error) {
    throw new Error(
      `${i18n('Unable to install dependencies. Please check the environment and try again. Details:')}\n${error as Error}`
    );
  }
};
