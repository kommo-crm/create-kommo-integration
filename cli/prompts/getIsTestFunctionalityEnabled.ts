import inquirer from 'inquirer';

import { i18n } from '../utils/i18n.js';

import { safePromptWrapper } from './utils/safePromptWrapper.js';

export const getIsTestFunctionalityEnabled = async () => {
  const { isEnabled } = await safePromptWrapper(
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'isEnabled',
        message: i18n(
          'We have developed test functionality that interacts with various locations for you. Would you like to add it?'
        ),
        default: true,
      },
    ])
  );

  return isEnabled;
};
