import fetch from 'node-fetch';

export async function handler(event, context) {
  const urlParam = event.queryStringParameters && event.queryStringParameters.url;
  if (!urlParam) {
    return { statusCode: 400, body: 'Missing "url" parameter' };
  }
  const targetUrl = `https://safe.duckduckgo.com/?${urlParam}`;
  const response = await fetch(targetUrl, {
    headers: {
      'User-Agent': event.headers['user-agent'] || 'NetlifyProxy'
    }
  });
  const body = await response.text();
  const contentType = response.headers.get('content-type') || 'text/html';
  return {
    statusCode: 200,
    headers: { 'Content-Type': contentType },
    body
  };
}
