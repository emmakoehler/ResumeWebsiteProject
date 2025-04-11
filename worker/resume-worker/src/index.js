let downloadCount = 0;
let notes = [];

export default {
  async fetch(request) {
    const { method } = request;

    // Define the origin that is allowed to make requests
    const allowedOrigin = 'https://resumewebsiteproject.pages.dev'; // Your static website's URL

    // Add CORS headers
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': allowedOrigin, // Allow your static site to access this resource
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allow these methods
      'Access-Control-Allow-Headers': 'Content-Type', // Allow the Content-Type header
    };

    // Handle OPTIONS preflight requests (important for CORS)
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: headers,
      });
    }

    // Handle POST requests (e.g., note submission, resume download tracking)
    if (method === 'POST') {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const body = await request.json();

        // Resume download tracking
        if (body.download) {
          downloadCount++;
          return new Response(JSON.stringify({ message: 'Download tracked!' }), {
            headers: headers,
          });
        }

        // Note submission
        if (body.note) {
          notes.push({ note: body.note, timestamp: Date.now() });
          return new Response(JSON.stringify({ message: 'Note received!' }), {
            headers: headers,
          });
        }
      }
    }

    // Handle GET requests (e.g., show current stats)
    if (method === 'GET') {
      return new Response(
        JSON.stringify({
          count: downloadCount,
          notes: notes.slice(-5).reverse(), // send last 5 notes, newest first
        }),
        { headers: headers }
      );
    }

    return new Response('Not Found', { status: 404, headers: headers });
  },
};
