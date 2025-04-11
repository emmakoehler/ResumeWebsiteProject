let downloadCount = 0;
let notes = [];

export default {
  async fetch(request) {
    const { method } = request;

    // Handle CORS headers
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*'); // Allows all origins
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests (OPTIONS)
    if (method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    // Handle POST requests
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const body = await request.json();

        // Resume download tracking
        if (body.download) {
          downloadCount++;
          return new Response(JSON.stringify({ message: 'Download tracked!' }), {
            headers: { 'Content-Type': 'application/json', ...headers },
          });
        }

        // Note submission
        if (body.note) {
          notes.push({ note: body.note, timestamp: Date.now() });
          return new Response(JSON.stringify({ message: 'Note received!' }), {
            headers: { 'Content-Type': 'application/json', ...headers },
          });
        }
      }
    }

    // Handle GET requests (e.g. show current stats)
    if (method === 'GET') {
      return new Response(
        JSON.stringify({
          count: downloadCount,
          notes: notes.slice(-5).reverse(), // send last 5 notes, newest first
        }),
        { headers: { 'Content-Type': 'application/json', ...headers } }
      );
    }

    return new Response('Not Found', { status: 404, headers });
  },
};
