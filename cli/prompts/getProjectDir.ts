import path from 'path';

import fs from 'fs-extra';
import inquirer from 'inquirer';

import { i18n } from '../utils/i18n.js';

import { safePromptWrapper } from './utils/safePromptWrapper.js';

export const MAX_INPUT_LENGTH: number = 255;
// eslint-disable-next-line no-control-regex
export const VALID_DIRECTORY_NAME_REGEX: RegExp = /^[^<>:"/\\|?*\x00-\x1F]+$/;

export const validate = (input: string) => {
  if (
    !input ||
    typeof input !== 'string' ||
    input.length > MAX_INPUT_LENGTH ||
    !VALID_DIRECTORY_NAME_REGEX.test(input)
  ) {
    return i18n(
      'Failed to create directory. Please enter a valid directory name.'
    );
  }

  if (fs.existsSync(input)) {
    return `${i18n('A directory with this name already exists. Please enter a different name or delete the existing directory')}: ${input}`;
  }

  return true;
};

export const getProjectDir = async (passedDirName: any): Promise<string> => {
  const validationResult = validate(passedDirName);

  let message = i18n('Enter a name for your widget directory:');

  if (passedDirName) {
    if (validationResult === true) {
      return path.join(process.cwd(), passedDirName);
    }

    message = validationResult;
  }

  const { directory } = await safePromptWrapper(
    inquirer.prompt([
      {
        type: 'input',
        name: 'directory',
        message,
        validate,
      },
    ])
  );

  return path.join(process.cwd(), directory);
};
