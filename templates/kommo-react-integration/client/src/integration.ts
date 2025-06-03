import { Integration } from 'vendor/Integration';

import { onSaveCallback } from '@callbacks/onSaveCallback';
import { settingsCallback } from '@callbacks/settingsCallback';
import { initCallback } from '@callbacks/initCallback';
import { destroyCallback } from '@callbacks/destroyCallback';
import { renderCallback } from '@callbacks/renderCallback';
import { bindActionsCallback } from '@callbacks/bindActionsCallback';

import './integration.css';

const integration = new Integration();

/**
 * Important! The second param in addCallback should be a string exactly the
 * same as in Kommo documentation.
 *
 * For nested callbacks like `todo:selected`,
 * `contacts:selected` and `leads:selected` they should be written
 * with a dot separator.
 *
 * For example:
 * .addCallback(contactsSelectedCallback, 'contacts.selected');
 *
 * For more details about callbacks, see the Kommo documentation:
 * https://developers.kommo.com/docs/script-js
 */
integration
  .addCallback(onSaveCallback, 'onSave')
  .addCallback(settingsCallback, 'settings')
  .addCallback(initCallback, 'init')
  .addCallback(destroyCallback, 'destroy')
  .addCallback(renderCallback, 'render')
  .addCallback(bindActionsCallback, 'bind_actions');

export default integration.build();
