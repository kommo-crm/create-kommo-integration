# CLI Tool for Widget Generation

## Overview

This CLI tool helps developers quickly generate a widget project with the required configuration and dependencies for the Kommo platform. The tool provides an interactive prompt for setting up widget parameters, such as locales, locations, and support details.

## Installation

Ensure you have **Node.js** installed on your system, then install the CLI globally or use npx:

```
npx @kommo-crm/create-kommo-integration@latest <directory-name> --en
```

or install it globally:

```
npm install -g @kommo-crm/create-kommo-integration@latest
```

## Usage

Run the CLI with the following command:

```
@kommo-crm/create-kommo-integration@latest [directory] [options]
```

### Options

- --en – Use English language
- --es – Use Spanish language
- --pt – Use Portuguese language

If no language is specified, the CLI will prompt you to select one.

## Example Usage

```
@kommo-crm/create-kommo-integration@latest my-widget --en
```

This command creates a new widget project named _my-widget_ with English as the selected language of CLI interface.

## Final Steps

Once all configurations are set, the CLI will:

- Create the widget template directory with widget template
- Install necessary dependencies
- Generate a manifest.json file based on your selections
- Display a success message with further instructions

## Contribute to this repo

Pull requests are welcome. See the [contribution guidelines](./.github/CONTRIBUTING.md) for more information.

## Licenses

Source code is under a [custom license](./LICENCE) based on MIT.

