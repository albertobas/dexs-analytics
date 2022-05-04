# Dexes analytics

[![Apache 2.0 licensed](https://img.shields.io/badge/License-Apache_2.0-yellow.svg)](https://github.com/albertobas/dexes-analytics/blob/main/LICENSE)

## About

This repository consists of an application that aims to represent analytics of some decentralized exchanges.

In order to develop it, I have adopted a clean architecture adapted to the front-end.

## Technical details

- **Build tool**: [Vite.js](https://vitejs.dev)
- **Front-end**: [React.js](https://reactjs.org)
- **Query Language**: [GraphQL](https://graphql.org)
- **Data resource**: [TheGraph](https://thegraph.com)
- **Styling**: [PostCSS](https://postcss.org)

## Overview

- `src/app/*`: App state, styles, user interface components and constants
- `src/features/*`: Features that the application supports. Each feature with its core and data sources, and most of them with a state slice, styles and user interface components and code.
- `src/shared/*`: Styles and user interface code shared across features and app components.

## Running locally

```bash
$ git clone https://github.com/albertobas/dexes-analytics.git
$ cd dexes-analytics
$ npm i
$ npm run dev
```

## Notes

I have written a [blog post](https://www.albertobas.com/blog/dexes-analytics) about the development of this application.
