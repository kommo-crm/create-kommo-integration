import React from 'react';

import {
  ContentBlockTheme,
  ContentBlock,
} from '@kommo-crm/crm-react-ui-kit/ContentBlock';

import { NotificationCreator } from '@components/NotificationCreator';

export const CardTabPage = () => {
  return (
    <ContentBlock theme={ContentBlockTheme}>
      <NotificationCreator />
    </ContentBlock>
  );
};
