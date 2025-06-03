import React from 'react';

import {
  ContentBlockTheme,
  ContentBlock,
} from '@kommo-crm/crm-react-ui-kit/ContentBlock';

import { NotificationCreator } from '@components/NotificationCreator';

export const SidebarPage = () => {
  const handleNotification = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const overlay = document.getElementById('card_widgets_overlay');

    if (overlay) {
      overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    } else {
      const widgetsOffButton = document.getElementsByClassName(
        'js-card-widgets-on-off'
      )[0];

      widgetsOffButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    }
  };

  return (
    <ContentBlock theme={ContentBlockTheme}>
      <NotificationCreator onNotify={handleNotification} />
    </ContentBlock>
  );
};
