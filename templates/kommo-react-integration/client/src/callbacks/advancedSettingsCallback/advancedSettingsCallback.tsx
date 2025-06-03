import React from 'react';

import { createRoot } from 'react-dom/client';

import { AdvancedSettingsCallback } from 'vendor/types/integration-types';

import { renderComponentWithAutoUnmount } from '@utils/renderComponentWithAutoUnmount';

import { StandalonePage } from '@pages/StandalonePage/StandalonePage';

export const advancedSettingsCallback: AdvancedSettingsCallback = (self) => {
  const containerElementStandalonePage = document.createElement('div');

  const parentElStandalonePage = document.querySelector(
    `#work-area-${(self as TodoAny).params.widget_code}`
  );

  if (parentElStandalonePage) {
    parentElStandalonePage.appendChild(containerElementStandalonePage);

    const root = createRoot(containerElementStandalonePage);

    renderComponentWithAutoUnmount(() => {
      root.render(<StandalonePage />);

      return () => root.unmount();
    });
  }

  return true;
};
