import inquirer from 'inquirer';
import chalk from 'chalk';

import { i18n } from '../utils/i18n.js';

import { safePromptWrapper } from './utils/safePromptWrapper.js';

const LOCATIONS_PAGE_SIZE = 28;

const LOCATIONS: Record<string, string> = {
  'lcard-1': '[lcard-1] Display integrations in the lead profile (right panel)',
  'lcard-0':
    '[lcard-0] Initialize integrations without displaying in the lead profile',

  'ccard-1':
    '[ccard-1] Display integrations in the contact profile (right panel)',
  'ccard-0':
    '[ccard-0] Initialize integrations without displaying in the contact profile',

  'comcard-1':
    '[comcard-1] Display integrations in the company profile (right panel)',
  'comcard-0':
    '[comcard-0] Initialize integrations without displaying in the company profile',

  'llist-1': '[llist-1] Display integrations in the lead list menu',
  'llist-0':
    '[llist-0] Initialize integrations without displaying in the lead list menu',

  'clist-1': '[clist-1] Display integrations in the contact list menu',
  'clist-0':
    '[clist-0] Initialize integrations without displaying in the contact list menu',

  'tlist-1': '[tlist-1] Display integrations in the task list menu',
  'tlist-0':
    '[tlist-0] Initialize integrations without displaying in the task list menu',

  'settings': '[settings] Integration settings',

  'advanced_settings':
    '[advanced_settings] Integration page in advanced settings',

  'card_sdk':
    '[card_sdk] Initialize integrations in the card via SDK. Learn more: https://developers.kommo.com/docs/card-sdk',

  'catalogs': '[catalogs] Initialize integrations in the catalog list',

  'digital_pipeline':
    '[digital_pipeline] Initialize integrations in pipeline automations',

  'lead_sources': '[lead_sources] Initialize integrations in lead sources',

  'widget_page':
    '[widget_page] Initialize integrations in the left menu (public integrations). Learn more: https://developers.kommo.com/docs/left-menu',

  'sms': '[sms] Initialize integrations for sending system SMS',

  'mobile_card': '[mobile_card] Initialize integrations in the mobile app',

  'salesbot_designer':
    '[salesbot_designer] Initialize integrations in the Salesbot builder',

  'website_chat_button':
    '[website_chat_button] Initialize integrations in website chat button settings',

  'everywhere': '[everywhere] Initialize integrations on all pages',
};

const EXCLUSIONS_FOR_LOCATIONS = [
  ['lcard-0', 'lcard-1'],
  ['ccard-0', 'ccard-1'],
  ['comcard-0', 'comcard-1'],
  ['llist-0', 'llist-1'],
  ['tlist-0', 'tlist-1'],
  ['clist-0', 'clist-1'],
];

export const getManifest = async () => {
  const { supportLink } = await safePromptWrapper(
    inquirer.prompt([
      {
        type: 'input',
        name: 'supportLink',
        message: i18n(
          "Enter the link to contact your integration's support team:"
        ),
        default: 'http://example.com',
      },
    ])
  );

  const { supportEmail } = await safePromptWrapper(
    inquirer.prompt([
      {
        type: 'input',
        name: 'supportEmail',
        message: i18n('Enter the support service email:'),
        default: 'example@example.com',
      },
    ])
  );

  const { userLocales } = await safePromptWrapper(
    inquirer.prompt([
      {
        type: 'checkbox',
        name: 'userLocales',
        message: `${i18n(
          'Select locales (languages) for your widget'
        )} ${i18n('(press Space to select, A — select all, I — reset current selection and select unmarked. Press Enter to continue).')} ${i18n('Learn more:')} ${chalk.underline(chalk.blue('https://developers.kommo.com/docs/manifest-json'))}`,
        choices: [
          { name: i18n('English'), value: 'en' },
          { name: i18n('Spanish'), value: 'es' },
          { name: i18n('Portuguese'), value: 'pt' },
        ],
        validate: (input) =>
          input.length ? true : i18n('Please select at least one language.'),
        theme: {
          helpMode: 'never',
        },
      },
    ])
  );

  const selectedLocations: string[] = [];

  const locationChoices = [
    new inquirer.Separator(chalk.yellow(i18n('Only one can be selected'))),
    ...EXCLUSIONS_FOR_LOCATIONS.flatMap((group) => [
      new inquirer.Separator(),
      ...group.map((key) => ({
        name: i18n(LOCATIONS[key]),
        value: key,
      })),
    ]),

    new inquirer.Separator(),
    new inquirer.Separator(chalk.yellow(i18n('Other locations'))),
    ...Object.entries(LOCATIONS)
      .filter(([key]) => !EXCLUSIONS_FOR_LOCATIONS.flat().includes(key))
      .map(([key, value]) => ({ name: i18n(value), value: key })),
  ];

  const exclusionsInInput: string[][] = [];

  const hasConflictingSelection = (
    input: { value: string }[],
    exclusions: string[][]
  ) => {
    exclusionsInInput.length = 0;

    const selectedValues = input.map((item) => item.value);

    exclusions.forEach((exclusion) => {
      if (exclusion.every((element) => selectedValues.includes(element))) {
        exclusionsInInput.push(exclusion);
      }
    });

    return exclusionsInInput.length > 0;
  };

  const userLocations = await safePromptWrapper(
    inquirer.prompt([
      {
        type: 'checkbox',
        name: 'locations',
        loop: false,
        message: `${i18n('Select where your widget will be displayed')} ${i18n(
          '(press Space to select, A — select all, I — reset current selection and select unmarked. Press Enter to continue).'
        )} ${i18n('Learn more:')} ${chalk.underline(
          chalk.blue('https://developers.kommo.com/docs/widget-locations')
        )}\n`,
        pageSize: LOCATIONS_PAGE_SIZE,
        validate: (input) => {
          if (
            hasConflictingSelection(
              input as { value: string }[],
              EXCLUSIONS_FOR_LOCATIONS
            )
          ) {
            return `${i18n('You have selected incompatible locations. Please choose only one from each pair')}: ${exclusionsInInput.map((group) => group.join(' or ')).join(', ')}.`;
          } else if (input.length) {
            return true;
          }

          return i18n('Please select at least one location for your widget.');
        },

        choices: locationChoices,
        theme: {
          helpMode: 'never',
        },
      },
    ])
  );

  selectedLocations.push(...userLocations.locations);

  return {
    locales: userLocales,
    locations: selectedLocations,
    support: {
      link: supportLink,
      email: supportEmail,
    },
  };
};
