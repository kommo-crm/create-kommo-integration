import _ from 'underscore';
import $ from 'jquery';

import { AbstractIntegration } from 'vendor/types/integration-types';

import { unmountAll } from '@utils/renderComponentWithAutoUnmount';

import { initializeI18n } from '@utils/i18n/i18n';
import api from '@utils/http/http';

export class Integration {
  callbacks: Record<
    string,
    Record<string, (...args: any[]) => any> | ((...args: any[]) => any)
  > = {};

  /**
   * Adds a callback function to the `callbacks` object.
   *
   * If `subName` is provided, the callback is added as a nested
   * function under `name.subName`.
   *
   * Otherwise, the callback is added directly under `name`.
   *
   * Pay attention that `name` should be exactly the same as in Kommo
   * documentation. Learn more:
   *
   * https://developers.kommo.com/docs/script-js
   *
   * @todo add generics
   */
  addCallback(
    cb: (...args: any[]) => void,
    name: string,
    subName?: string | null
  ) {
    const addNestedCallback = (
      obj: Record<string, any>,
      path: string[],
      callback: (...args: any[]) => void
    ) => {
      const key = path.shift() as string;

      if (path.length === 0) {
        obj[key] = callback;
      } else {
        if (!obj[key]) {
          obj[key] = {};
        }

        addNestedCallback(obj[key], path, callback);
      }
    };

    if (subName || name.includes('.')) {
      const path = name.split('.');

      addNestedCallback(this.callbacks, path, cb);
    } else {
      this.callbacks[name] = cb;
    }

    return this;
  }

  build() {
    const self = this;

    return function Widget(this: AbstractIntegration) {
      initializeI18n(_.bind(this.i18n, this));

      api.initialize(_.bind(this.$authorizedAjax, this));

      const callbacks: Record<string, TodoAny> = {};

      $(document).on('page:changed', () => {
        unmountAll();
      });

      const wrapContext = (
        key: string,
        value: unknown,
        context: typeof callbacks
      ) => {
        if (!value) {
          context[key] = value as TodoAny;
        } else if (typeof value === 'function') {
          context[key] = (...args: any[]) => value(this, ...args);
        } else {
          context[key] ||= {} as TodoAny;

          for (const subKey in value) {
            wrapContext(
              subKey,
              (value as TodoAny)[subKey] as TodoAny,
              context[key]
            );
          }
        }
      };

      for (const key in self.callbacks) {
        wrapContext(key, self.callbacks[key], callbacks);
      }

      this.callbacks = callbacks as TodoAny;

      return this;
    };
  }
}
