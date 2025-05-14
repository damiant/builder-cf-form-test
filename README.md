# Form

This is a Cloudflare Worker that accepts HTTP requests and processes form submissions. It includes the following features:

- **CORS Support**: Allows cross-origin requests with `OPTIONS` preflight handling.
- **Form Submission Handling**: Accepts `POST` requests to the `/form` endpoint, logs the request body, and echoes it back in the response.