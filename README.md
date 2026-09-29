# dorrop

A URL shortener service built with Node.js and Express. Dorrop generates compact short codes for long URLs using sqids, with support for MongoDB persistence and environment configuration.

## Features

- Generate short, unique URL codes
- MongoDB-backed URL storage
- Express.js REST API
- sqids encoding support

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (via Mongoose)
- **Encoding:** sqids
- **Validation:** Zod

## Getting Started

```bash
npm install
npm run dev
```

The development server will run with hot-reload support.
