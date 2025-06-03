import React from 'react';
import { createRoot } from 'react-dom/client';

import { InitCallback } from 'vendor/types/integration-types';

import { renderComponentWithAutoUnmount } from '@utils/renderComponentWithAutoUnmount';

import { SidebarPage } from '@pages/SidebarPage';

export const initCallback: InitCallback = (self) => {
  self.render_template({
    caption: { class_name: 'new_widget_card' },
    body: '<div class="new_widget_card_inner"></div>',
    render: '',
  });

  const rootElSidebarPage = document.querySelector('.new_widget_card_inner');

  if (rootElSidebarPage) {
    const root = createRoot(rootElSidebarPage);

    renderComponentWithAutoUnmount(() => {
      root.render(<SidebarPage />);

      return () => root.unmount();
    });
  }

  return true;
};
