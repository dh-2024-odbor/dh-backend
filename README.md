# Hopper - Telemetry Collection and Analysis Platform

Hopper is a telemetry collection and analysis platform that allows you to collect and analyze telemetry data from nodes. It is built using Nuxt 3, a modern web framework for building Vue.js applications.

## Features
- Telemetry data collection:
  - Collect telemetry data from nodes
  - transform provided binary data to JSON
  - Store telemetry data in a database
- Data visualization
  - Visualize telemetry data in a dashboard
  - Analyze telemetry data using charts and graphs

## Technologies

It uses the following technologies:
- [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)
- [MongoDB](https://www.mongodb.com/)
- [Auth0](https://auth0.com/)
- [Docker](https://www.docker.com/)

## Features

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production
Build the application for production:

```bash
npm run build
```

## .env file example
```
AUTH0_CLIENT_ID=<AUTH=_CLIENT_ID>
AUTH0_CLIENT_SECRET=<AUTH=_CLIENT_SECRET>
BASIC_AUTH_TOKEN=<BASIC_AUTH_TOKEN>
MONGODB_CONNECTION_STRING=<MONGODB_CONNECTION_STRING>
```

## Data Transformation
The data is provided in binary format because it is more efficient to transfer binary data over the network. First 4 bytes always represent node ID. This helps to identify the node from which the data is coming, which is required to determine data format, so that it can be transformed to JSON.
