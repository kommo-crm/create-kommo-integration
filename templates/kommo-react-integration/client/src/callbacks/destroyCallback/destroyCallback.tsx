import { DestroyCallback } from 'vendor/types/integration-types';

import { unmountAll } from '@utils/renderComponentWithAutoUnmount';

export const destroyCallback: DestroyCallback = () => {
  unmountAll();
};
