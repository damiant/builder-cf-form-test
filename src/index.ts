/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { pathname } = new URL(request.url);
		// Allow CORS from any domain
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': '*',
		};
		// Handle preflight OPTIONS request
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders });
		}
		// Handle requests to /form
		if (pathname === '/form' && request.method === 'POST') {
			// Log the posted body
			try {
				const body = await request.text();
				console.log('Posted body:', body);

				// Return a 200 response with CORS headers
				return new Response(body, {
					status: 200,
					headers: corsHeaders,
				});
			} catch (error) {
				console.error('Error reading body:', error);
				return new Response('Error reading body', { status: 500 });
			}
		}

		// Default response for other paths
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
