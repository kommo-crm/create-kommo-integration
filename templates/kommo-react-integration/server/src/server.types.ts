import { JwtPayload } from 'jsonwebtoken';

/**
 * Expected body for Salesbot webhook POST requests.
 */
export interface SalesbotRequestBody {
  /**
   * Encoded JWT token for authentication.
   */
  token: string;
  /**
   * URL to respond to after processing the webhook.
   */
  return_url: string;
  /**
   * Additional optional properties passed in the request.
   */
  [key: string]: unknown;
}

/**
 * JWT payload structure with flexible fields.
 * Used after decoding and verifying the Salesbot JWT token.
 */
export type JwtData = JwtPayload & Record<string, unknown>;

/**
 * Expected body for Digital Pipeline webhook POST requests.
 */
export interface DPRequestBody {
  /**
   * Event metadata sent by the webhook.
   */
  event: {
    /**
     * Type code of the triggered event.
     */
    type_code: string;
    /**
     * Data associated with the triggered event.
     */
    data: unknown;
  };
  /**
   * Optional settings configured in the action.
   */
  action?: {
    /**
     * Configuration settings of the widget.
     */
    settings?: {
      /**
       * Widget settings block.
       */
      widget?: {
        /**
         * Nested settings inside the widget configuration.
         */
        settings?: {
          /**
           * Custom message configured in the widget settings.
           */
          message?: string;
        };
      };
    };
  };
}
