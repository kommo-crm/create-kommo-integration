import React from 'react';
import { createRoot } from 'react-dom/client';

import { LoadPreloadedDataCallback } from 'vendor/types/integration-types';

import { renderComponentWithAutoUnmount } from '@utils/renderComponentWithAutoUnmount';

import { CardTabPage } from '@pages/CardTabPage/CardTabPage';

export const loadPreloadedDataCallback: LoadPreloadedDataCallback = (self) => {
  const containerElementCardTabPage = document.createElement('div');

  containerElementCardTabPage.classList.add('new_widget_card_sdk');

  const parentElCardTabPage = document.querySelector(
    `#${(self as TodoAny).params.widget_code}`
  );

  if (parentElCardTabPage) {
    parentElCardTabPage.appendChild(containerElementCardTabPage);

    const root = createRoot(containerElementCardTabPage);

    renderComponentWithAutoUnmount(() => {
      root.render(<CardTabPage />);

      return () => root.unmount();
    });
  }

  return Promise.resolve([]);
};
