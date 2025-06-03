import { SalesbotDesignerSettingsCallback } from 'vendor/types/integration-types';

import { i18n } from '@utils/i18n/i18n';

export const salesbotDesignerSettingsCallback: SalesbotDesignerSettingsCallback =
  () => {
    return {
      exits: [
        { code: 'success', title: i18n('success') },
        { code: 'fail', title: i18n('fail') },
      ],
    };
  };
