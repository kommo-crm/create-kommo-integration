import path from 'path';

import fs from 'fs-extra';

import {
  LocationWithAdditionalProps,
  SupportInfo,
  ManifestJson,
  AvailableLocale,
} from '../types.js';

export const updateManifest = async (options: {
  projectDir: string;
  locales:
    | AvailableLocale.English
    | AvailableLocale.Spanish
    | AvailableLocale.Portuguese;
  locations: string[];
  support: SupportInfo;
}): Promise<void> => {
  const { projectDir, locales, locations, support } = options;

  const manifestJsonPath = path.join(
    projectDir,
    'client',
    'public',
    'manifest.json'
  );

  const data = await fs.readFile(manifestJsonPath, 'utf8');
  const manifestJson: ManifestJson = JSON.parse(data);

  manifestJson.widget.locale = locales;
  manifestJson.locations = locations;

  manifestJson.widget.support = {
    link: support.link,
    email: support.email,
  };

  locations.forEach((location: string) => {
    switch (location) {
      case LocationWithAdditionalProps.DigitalPipeline:
        manifestJson.dp = {
          settings: {
            message: {
              name: 'settings.text',
              type: 'text',
              required: true,
            },
          },
          action_multiple: false,
          webhook_url: 'https://example.com/webhook_dp',
        };
        break;

      case LocationWithAdditionalProps.AdvancedSettings:
        manifestJson.advanced = {
          title: 'advanced.title',
        };
        break;

      case LocationWithAdditionalProps.MobileCard:
        manifestJson.mobile = {
          frame_url: 'https://example.com',
          color: '#5F43CF',
        };
        break;

      case LocationWithAdditionalProps.Sms:
        manifestJson.sms = {
          endpoint: 'https://example.com/webhook',
        };
        break;

      case LocationWithAdditionalProps.Salesbot:
        manifestJson.salesbot_designer = {
          handler_code: {
            name: 'salesbot.handler_name',
            settings: {
              button_title: {
                name: 'salesbot.button_title',
                type: 'text',
                default_value: 'salesbot.button_title_default_value',
                manual: true,
              },
              button_caption: {
                name: 'salesbot.button_caption',
                type: 'text',
                default_value: 'salesbot.button_caption_default_value',
                manual: true,
              },
              text: {
                name: 'salesbot.text',
                type: 'text',
              },
              number: {
                name: 'salesbot.number',
                type: 'numeric',
              },
              url: {
                name: 'salesbot.url',
                type: 'url',
              },
            },
          },
        };
        break;

      case LocationWithAdditionalProps.LeftMenu:
        manifestJson.left_menu = {
          notifications: {
            title: 'widget.name',
            icon: 'images/logo_min.png',
            sort: {
              after: 'leads',
            },
          },
        };
        break;

      default:
    }
  });

  await fs.writeFile(
    manifestJsonPath,
    JSON.stringify(manifestJson, null, 2),
    'utf8'
  );
};
