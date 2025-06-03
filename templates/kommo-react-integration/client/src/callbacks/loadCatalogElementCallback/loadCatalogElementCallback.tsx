import { LoadCatalogElementCallback } from 'vendor/types/integration-types';

export const loadCatalogElementCallback: LoadCatalogElementCallback = (
  self,
  catalogElement: any
) => {
  APP.notifications.show_message({
    header: `${catalogElement.name.text}`,
    text: `Catalog element's id: ${catalogElement.id}`,
  });

  return true;
};
