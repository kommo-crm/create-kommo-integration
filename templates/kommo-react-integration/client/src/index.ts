import INTEGRATION_CODE from '@shared/constants/INTEGRATION_CODE';

import crmModuleAliases from './crmModuleAliases';

const isDevMode =
  localStorage.getItem(`${INTEGRATION_CODE}_is_dev`) ===
  process.env.LOCALHOST_PORT;

/**
 * Registers a module with dependencies and a factory function to create a integration.
 * If an error occurs during execution, it logs the error and returns undefined.
 */
if (isDevMode) {
  window.define(
    [`http://localhost:${process.env.LOCALHOST_PORT}/script.js`],
    (result) => {
      return result;
    }
  );
} else {
  window.define(Object.values(crmModuleAliases), () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const integration = require('./integration').default;

      return integration;
    } catch (error) {
      console.error(error);

      return undefined;
    }
  });
}
