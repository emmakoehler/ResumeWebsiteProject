let downloadCount = 0;
let notes = [];

export default {
  async fetch(request) {
    const { method } = request;

    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const body = await request.json();

        // Resume download tracking
        if (body.download) {
          downloadCount++;
          return new Response(JSON.stringify({ message: 'Download tracked!' }), {
            headers: { 'Content-Type': 'application/json' },
          });
        }

        // Note submission
        if (body.note) {
          notes.push({ note: body.note, timestamp: Date.now() });
          return new Response(JSON.stringify({ message: 'Note received!' }), {
            headers: { 'Content-Type': 'application/json' },
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
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response('Not Found', { status: 404 });
  },
};
