# Kommo Widget Integration

A Docker-powered setup for developing and packaging a front-end widget for the Kommo CRM platform. Includes:

- **Dev workflow** with live-reload
- **Prod build** that outputs a `widget.zip` bundle
- Convenience commands via **Makefile**
- **Docker Compose** for local testing
- Supports local builds via `yarn run command` (no Docker required)

---

## Getting Started

### 1. Configure Environment

Before starting development or building the production widget, fill in the required environment variables.

The project includes two predefined environment files:

- .dev.env — used in development
- .prod.env — used during the production build

Update these files with appropriate values.

**Important!** Never commit these files with real secrets to version control. Use environment-specific secret management in CI/CD for deployment.

### 2. Build

#### Option A: With Docker & Make

Generate a production-ready ZIP bundle:

```
make build
```

#### Option B: Locally with yarn

You can also build without Docker:

```
yarn install
yarn run build
```

This will create a dist folder with your build script, manifest etc. and zip archive.

### 3. Development

#### Option A: With Docker

Bring up the dev server with one command:

```
make run-dev
```

#### Option B: Locally with yarn

You can also run the dev server without Docker:

```
yarn install
yarn run dev
```

### 4. Enabling Development Mode After Uploading the Widget Archive

To enable dev mode after uploading the widget.zip archive, follow these steps:

1. **Ensure the correct port and widget code are set in your environment variables.** In your .dev.env and .prod.env file, make sure the following are properly configured:

- `LOCALHOST_PORT` — This should match the port your local development server is running on (e.g., `9000`).
- `INTEGRATION_CODE` — This should be the code specific to your widget. You can find it in the **Key and Scopes** tab after creating an integration.

2. **Enable dev mode** by adding the following to `localStorage` in the client's browser. You can do this by opening the browser's developer console and entering the following command:

```
localStorage.setItem('your_widget_code_is_dev', '9000');
```

Use the same port as `LOCALHOST_PORT` and the same widget code as `INTEGRATION_CODE` in .env files.

**Alternatively**, you can manually add the localStorage entry in the browser's storage if needed.

Once done, the widget will load resources from your local dev server when in dev mode, allowing you to test without having to re-upload the widget archive every time.
