import { OnSalesbotDesignerSaveCallback } from 'vendor/types/integration-types';

import { BASE_URL } from '@utils/http/http';

export const onSalesbotDesignerSaveCallback: OnSalesbotDesignerSaveCallback = (
  _self,
  _handlerCode,
  params
) => {
  /**
   * As an example of an endpoint to send hooks, we've made
   * for you the server that you can find in the
   * server directory.
   * Tip: If you're working locally and want to expose your server
   * to the internet (e.g., to receive webhooks), consider using "ngrok".
   *
   * @see https://developers.kommo.com/docs/salesbot-dp
   */
  return JSON.stringify([
    {
      question: [
        {
          handler: 'widget_request',
          params: {
            url: `${BASE_URL}/webhook_salesbot`,
            data:
              APP.getBaseEntity() === 'customers'
                ? {
                    ...params,

                    customer_id: '{{customer.id}}',
                  }
                : {
                    ...params,

                    lead_id: '{{lead.id}}',
                  },
          },
        },
        {
          handler: 'goto',
          params: {
            type: 'question',
            step: 1,
          },
        },
      ],
    },
    {
      question: [
        {
          handler: 'conditions',
          params: {
            logic: 'and',
            conditions: [
              {
                term1: '{{json.status}}',
                term2: 'success',
                operation: '=',
              },
            ],

            result: [
              {
                handler: 'exits',
                params: {
                  value: 'success',
                },
              },
            ],
          },
        },
        {
          handler: 'exits',
          params: {
            value: 'fail',
          },
        },
      ],
    },
  ]);
};
