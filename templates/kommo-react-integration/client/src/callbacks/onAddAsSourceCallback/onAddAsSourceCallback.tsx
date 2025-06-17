import { OnAddAsSourceCallback } from 'vendor/types/integration-types';

import { i18n } from '@utils/i18n/i18n';

export const onAddAsSourceCallback: OnAddAsSourceCallback = async (
  self,
  pipelineId
) => {
  APP.notifications.show_message({
    header: i18n('Integration source was added to pipeline!'),
    text: `${i18n('Pipeline id is')}: ${pipelineId}`,
  });
};
