import crmModuleAliases from './crmModuleAliases';

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
