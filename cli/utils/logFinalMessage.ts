import chalk from 'chalk';
import boxen from 'boxen';

import { i18n } from './i18n.js';
import { log } from './log.js';

export const LOCATIONS_WITH_ADDITIONAL_PROPS: Record<string, string> = {
  digital_pipeline: 'Digital pipeline',
  advanced_settings: 'Advanced settings',
  mobile_card: 'Mobile app',
  sms: 'SMS',
  salesbot_designer: 'Salesbot designer',
};

export const logFinalMessage = (projectDir: string, locations: string[]) => {
  let message = `
    ${chalk.bold(i18n('Your Kommo React widget has been successfully created.'))}
    ${chalk.cyan(i18n('To get started:'))}
    ${chalk.gray(i18n('1. Navigate to the project directory'))} ${chalk.green(
      `cd ${projectDir}`
    )}
    ${chalk.gray(i18n('2. Review the instructions in the README file.'))}

    ${chalk.gray(i18n('3. To build, use the command:'))} ${chalk.green('cd client && yarn build')}
    ${chalk.gray(i18n('4. To start development mode:'))} ${chalk.green(
      'cd client && yarn dev'
    )}

    ${chalk.gray(i18n('If you face any issues, you can reach out to the product development team:'))}
    ${chalk.underline(chalk.blue(i18n('https://github.com/kommo-crm/create-kommo-integration/issues')))}
  `;

  const selectedLocationsWithProps = locations.filter((location) => {
    return location in LOCATIONS_WITH_ADDITIONAL_PROPS;
  });

  if (selectedLocationsWithProps.length > 0) {
    const locationsMessage = selectedLocationsWithProps
      .map((location) => LOCATIONS_WITH_ADDITIONAL_PROPS[location])
      .join(', ');

    const additionalPropertiesMessage = `
    ${chalk.yellow(
      i18n(
        'You have selected the following locations with additional properties in the manifest:'
      )
    )} ${chalk.bold(locationsMessage)}.
    ${chalk.gray(
      `${i18n('Please fill in the location properties in the manifest.json file.')}`
    )}
    ${chalk.gray(i18n('Learn more:'))} ${chalk.underline(
      chalk.blue('https://developers.kommo.com/docs/widget')
    )}
`;

    message += additionalPropertiesMessage;
  }

  log(
    boxen(message, {
      padding: 1,
      borderColor: 'gray',
      margin: 0,
      align: 'left',
      borderStyle: 'round',
    })
  );
};
