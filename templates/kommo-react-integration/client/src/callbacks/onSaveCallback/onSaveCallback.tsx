import { OnSaveCallback } from 'vendor/types/integration-types';

import { i18n } from '@utils/i18n/i18n';

export const onSaveCallback: OnSaveCallback = (self) => {
  self.setSdkCatalogId(
    (APP.constant as TodoAny)('account').products.catalog_id
  );

  APP.notifications.show_message({
    header: i18n('Congratulations!'),
    text: i18n('Your widget was successfully initialized!'),
  });

  return true;
};
