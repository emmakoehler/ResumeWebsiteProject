## What is a Cloudflare Worker?

A Cloudflare Worker is a serverless function that runs on Cloudflare's edge network, allowing developers to run JavaScript (or WASM) code close to the user for fast, scalable web applications.

## How does a Worker handle HTTP requests and return responses?

A Worker handles HTTP requests through an event listener using a `fetch` handler. It processes the incoming request, performs logic (like routing or API calls), and returns a `Response` object with headers, status code, and optional data.

## What is Cloudflare D1? What are some pros and cons of using it?

Cloudflare D1 is a lightweight, serverless SQL database (based on SQLite) integrated with Workers.  
**Pros:** Easy setup, edge-based performance, integrated with Cloudflare tools.  
**Cons:** Not ideal for high-volume relational data or complex transactions yet, still in active development.

## How does client-side JavaScript call an external API?

Client-side JavaScript uses the `fetch()` API or similar libraries (like Axios) to make asynchronous HTTP requests to external APIs. It typically uses methods like GET or POST and handles the response using Promises or async/await.

## What is the benefit of deploying APIs to the edge instead of traditional servers?

Edge deployment reduces latency by bringing API logic closer to users geographically. This improves performance, increases reliability under high load, and reduces the need for centralized server infrastructure.
