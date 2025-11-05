// netlify/functions/proxy.js

export async function handler(event) {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzkYz-vsi6Tzwb544u_5hLWBkBYJZ34dFfuLI5r32ILQbBoIlBkATIcIT9P2rFJnZEW/exec";
  const method = event.httpMethod || 'GET';

  try {
    let response;
    if (method === 'GET') {
      response = await fetch(scriptUrl);
    } else {
      response = await fetch(scriptUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: event.body
      });
    }

    const text = await response.text();
    let body = text;
    try { body = JSON.parse(text); } catch {}

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
}
