import { createRoot } from 'react-dom/client';

import { SettingsCallback } from 'vendor/types/integration-types';

import { renderComponentWithAutoUnmount } from '@utils/renderComponentWithAutoUnmount';

import { SettingsModalPage } from '@pages/SettingsModalPage/SettingsModalPage';

export const settingsCallback: SettingsCallback = (
  self,
  $modalContentElement
) => {
  const $widget = $modalContentElement.find('.widget_settings_block');

  (self as TodoAny).$saveButton = $modalContentElement.find('.js-widget-save');
  (self as TodoAny).$saveButton.removeAttr('data-onsave-destroy-modal');
  (self as TodoAny).$saveButton.click();

  $widget.hide();

  const containerElementSettingsModalPage = document.createElement('div');

  containerElementSettingsModalPage.classList.add('new_widget_settings');

  const parentElSettingsModalPage = document.querySelector(
    '.widget-settings__desc-space'
  );

  if (parentElSettingsModalPage) {
    parentElSettingsModalPage.appendChild(containerElementSettingsModalPage);

    const root = createRoot(containerElementSettingsModalPage);

    renderComponentWithAutoUnmount(() => {
      root.render(<SettingsModalPage />);

      return () => root.unmount();
    });
  }

  return true;
};
