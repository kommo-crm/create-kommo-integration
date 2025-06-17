# Backend Server for Webhooks

We've you also made a backend server to handle incoming webhook events. This backend server handles incoming webhooks from Kommo and manages OAuth authorization, including automatic token refresh.

More information about oAuth you can find in Kommo documentation (https://developers.kommo.com/docs/oauth-20)

This server is designed for demonstration purposes only in your technical account.

## Prerequisites

- **Node.js** and **yarn** installed.
- Your `.env` file should contain:

```
CLIENT_ID=<your_integration_id>
CLIENT_SECRET=<your_integartion_client_secret>
REDIRECT_URI=<redirect_uri_for_oauth>
SUBDOMAIN=<your_account_subdomain>
```

## Installation

1. Configure your `.env` file with the required environment variables:

**Important!** Do not commit real credentials to version control. Use secret management for CI/CD or deployment environments.

## Running the Server

Start the server by running in the server.ts folder:

```
yarn run dev
```

The server will start on http://localhost:3000 by default.

## Tunnels

For developers purpose we recommend using a tunnel service like [ngrok](https://ngrok.com/) to expose your local server to the internet. This is useful for testing webhooks and OAuth flows.

## Available Endpoints

**/**: For the get requests in a mobile app.

**/webhook_salesbot**: Handles webhook requests triggered by the Salesbot.

**/webhook_dp**: Processes requests from the Digital Pipeline.

**/widget_auth**: Accepts the OAuth code and exchanges it for tokens from Kommo.
