import { OnSalesbotDesignerSaveCallback } from 'vendor/types/integration-types';

export const onSalesbotDesignerSaveCallback: OnSalesbotDesignerSaveCallback = (
  _self,
  _handlerCode,
  params
) => {
  const salesbotSource = {
    question: [] as TodoAny[],
    require: [] as TodoAny[],
  };
  const salesbotSecondStep = {
    question: [] as TodoAny[],
    require: [] as TodoAny[],
  };

  const buttonCaption = params.button_caption || '';
  const buttonTitle = params.button_title || '';
  const text = params.text || '';
  const number = params.number || 0;

  const handler_template = {
    handler: 'show',
    params: {
      type: 'buttons',
      value: text + ' ' + number,
      buttons: [buttonTitle + ' ' + buttonCaption],
    },
  };

  // As an example of an endpoint to send hooks, we've made
  // for you the server that you can find in the
  // server directory.
  // Tip: If you're working locally and want to expose your server
  // to the internet (e.g., to receive webhooks), consider using "ngrok".
  salesbotSource.question.push({
    handler: 'widget_request',
    params: {
      url: 'https://example.com/webhook_salesbot',
      data:
        APP.getBaseEntity() === 'customers'
          ? {
              customer: '{{customer.id}}',
            }
          : {
              lead: '{{lead.id}}',
            },
    },
  });

  salesbotSource.question.push(handler_template);

  salesbotSource.question.push({
    handler: 'goto',
    params: {
      type: 'question',
      step: 1,
    },
  });

  salesbotSecondStep.question.push({
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
  });

  salesbotSecondStep.question.push({
    handler: 'exits',
    params: {
      value: 'fail',
    },
  });

  const flow = [salesbotSource, salesbotSecondStep];

  return JSON.stringify(flow);
};
