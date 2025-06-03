import { OnAddAsSourceCallback } from 'vendor/types/integration-types';

import http from '@utils/http/http';

export const onAddAsSourceCallback: OnAddAsSourceCallback = async (
  self,
  pipelineId
) => {
  const dataToSend = { pipelineId };

  // As an example of an endpoint to send hooks, we've made
  // for you the server that you can find in the
  // server directory. Also you need to provide BASE_URL in
  // .env files.
  // Tip: If you're working locally and want to expose your server
  // to the internet (e.g., to receive webhooks), consider using "ngrok".
  const url = '/webhook_source';

  try {
    await http.requestIntegration({
      url,
      method: 'POST',
      data: dataToSend,
    });
  } catch (error) {
    console.error(error);
  }

  return true;
};
