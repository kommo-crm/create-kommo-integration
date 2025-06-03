import $ from 'jquery';
import snakeize from 'snakeize';

import camelize from '@utils/camelize/camelize';

import { AuthorizedAjax, DeepPartial, RequestOptions } from './http.types';

let ajax: AuthorizedAjax | null = null;

export const BASE_URL = process.env.BASE_URL || '';

const convertOptions = (options: RequestOptions): JQueryAjaxSettings => {
  const {
    url,
    data,
    method = 'GET',
    withCredentials = false,
    dataType,
    isFormDataPayload = false,
  } = options;

  const convertedData = data && snakeize(data);

  let ajaxOptions: JQueryAjaxSettings;

  if (isFormDataPayload) {
    ajaxOptions = {
      url,
      dataType,
      data: convertedData,

      method,
    };
  } else {
    ajaxOptions = {
      url,
      contentType: 'application/json',
      dataType,
      data: method === 'GET' ? convertedData : JSON.stringify(convertedData),

      method,
    };
  }

  if (withCredentials) {
    ajaxOptions.xhrFields = { withCredentials: true };
  }

  return ajaxOptions;
};

const http = {
  initialize(authorizedAjax: AuthorizedAjax) {
    ajax = authorizedAjax;
  },

  /**
   * Sends a request to your backend.
   */
  async requestIntegration<T>(
    options: RequestOptions
  ): Promise<DeepPartial<T> | undefined> {
    if (!ajax) {
      throw new Error('API was not initialized');
    }

    const ajaxOptions = convertOptions(options);

    ajaxOptions.url = BASE_URL + ajaxOptions.url;

    const response = await ajax(ajaxOptions);

    return camelize(response);
  },

  /**
   * Sends a request to the CRM endpoint.
   */
  async requestCrm<T>(options: RequestOptions): Promise<T> {
    const ajaxOptions = convertOptions(options);

    const response = await $.ajax(ajaxOptions);

    return camelize(response);
  },
};

export default http;
