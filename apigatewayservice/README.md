# Paxus API Gateway

The gateway is the public entry point for the three Paxus services. It forwards each request unchanged (method, body, headers, path, and query string) to the appropriate upstream service.

| Gateway path | Service | Default URL |
| --- | --- | --- |
| `/api/auth/*` | Auth | `http://localhost:4082` |
| `/api/users/*`, `/api/educator/*`, `/api/student/*`, `/api/institute/*`, `/api/publish/*` | User | `http://localhost:4081` |
| `/api/course/*` | Course | `http://localhost:4083` |

## Run locally

1. Copy `.env.example` to `.env.dev` and adjust URLs only if your services run elsewhere.
2. Install dependencies: `npm install`.
3. Start the three microservices on ports `4081`, `4082`, and `4083`.
4. Run `npm run dev` in this directory.

The gateway starts on `http://localhost:4080`. Its health endpoint is `GET /health`.
