export type AuthorizedAjax = (options: JQueryAjaxSettings) => JQueryXHR;

export interface RequestOptions {
  /**
   * Request endpoint.
   */
  url: string;
  /**
   * Data for the request.
   *
   * For non-'GET' requests, the data will be automatically
   * parsed to JSON.
   */
  data?: object;
  /**
   * HTTP method to be used for the request.
   */
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  /**
   * Indicates whether the user agent should send
   * or receive cookies from a different domain in case of
   * cross-origin requests. Credentials include cookies,
   * HTTP basic auth, etc. With credentials = always send
   * user credentials, even for cross-origin calls.
   */
  withCredentials?: boolean;
  /**
   * Expected response data type.
   */
  dataType?: 'json' | 'jsonp' | 'xml' | 'html' | 'text' | 'script';
  /**
   * Flag to determine whether to send data as FormData.
   */
  isFormDataPayload?: boolean;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};
