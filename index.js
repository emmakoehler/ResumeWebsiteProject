let downloadCount = 0; // Track resume downloads
let notes = []; // Store submitted notes

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const { method } = request;

    // ✅ Correct CORS Headers to Allow Your Website
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://resumewebsiteproject.pages.dev', // ✅ Removed trailing slash
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // ✅ Handle Preflight (OPTIONS) Requests
    if (method === 'OPTIONS') {
      return new Response('', { status: 204, headers: corsHeaders });
    }

    // ✅ Handle POST Requests (Submit Notes & Track Downloads)
    if (method === 'POST') {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const body = await request.json();

        if (url.pathname === '/trackDownload' && body.download) { 
          downloadCount++;
          return new Response(JSON.stringify({ message: 'Download tracked!' }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        if (url.pathname === '/comments' && body.note) { 
          notes.push({ note: body.note, timestamp: Date.now() });
          return new Response(JSON.stringify({ message: 'Note received!' }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
      }
    }

    // ✅ Handle GET Requests (Retrieve Notes & Download Count)
    if (method === 'GET') {
      if (url.pathname === '/trackDownload') {
        return new Response(JSON.stringify({ count: downloadCount }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      if (url.pathname === '/comments') {
        return new Response(JSON.stringify({
          notes: Array.isArray(notes) ? notes.slice(-5).reverse() : [],
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    }

    // ✅ Return 404 for Unrecognized Routes
    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};