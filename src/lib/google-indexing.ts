import crypto from 'crypto';

// ─────────────────────────────────────────────────────────
// Google Indexing API — Zero-dependency JWT Auth Helper
//
// Required Vercel Env Vars:
//   GOOGLE_INDEXING_CLIENT_EMAIL  — Service Account email
//   GOOGLE_INDEXING_PRIVATE_KEY   — Service Account private key
//                                   (paste full PEM, \n becomes actual newlines)
//
// Setup Instructions:
//   1. Go to console.cloud.google.com
//   2. Enable "Web Search Indexing API"
//   3. Create a Service Account → Download JSON key
//   4. In Google Search Console → Settings → Users → Add the service account email as Owner
//   5. Paste client_email and private_key from the JSON into Vercel env vars
// ─────────────────────────────────────────────────────────

async function getGoogleAccessToken(): Promise<string> {
  const privateKey = (process.env.GOOGLE_INDEXING_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error('GOOGLE_INDEXING_CLIENT_EMAIL or GOOGLE_INDEXING_PRIVATE_KEY env var is not set.');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url');

  const signingInput = `${header}.${payload}`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signingInput);
  const signature = sign.sign(privateKey, 'base64url');
  const jwt = `${signingInput}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json() as { access_token?: string; error?: string };
  if (!tokenData.access_token) {
    throw new Error(`Google token exchange failed: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}

export type IndexingResult = {
  url: string;
  status: 'submitted' | 'failed';
  error?: string;
};

// Submit a single URL to Google Indexing API
export async function submitUrlToGoogle(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'): Promise<IndexingResult> {
  try {
    const accessToken = await getGoogleAccessToken();

    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, type }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { url, status: 'failed', error: err };
    }

    return { url, status: 'submitted' };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { url, status: 'failed', error: msg };
  }
}

// Submit a batch of URLs (Google limits: 200 req/day on free tier)
export async function submitBatchUrls(urls: string[]): Promise<IndexingResult[]> {
  const results: IndexingResult[] = [];

  // Stagger requests by 200ms to avoid rate limit spikes
  for (const url of urls) {
    const result = await submitUrlToGoogle(url);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  return results;
}
