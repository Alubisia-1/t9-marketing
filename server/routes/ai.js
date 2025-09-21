const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const fs = require('fs');
const { OpenAI } = require('openai');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 3600 });

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Initialize Google Search Console client
const credentials = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  project_id: process.env.GOOGLE_PROJECT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_CERT_URL,
  redirect_uris: [process.env.GOOGLE_REDIRECT_URI],
  javascript_origins: [process.env.GOOGLE_JAVASCRIPT_ORIGIN],
};

if (!credentials.client_id || !credentials.client_secret) {
  console.error("Missing Google OAuth credentials! Check your environment variables.");
}


const oAuth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  process.env.NODE_ENV === 'production'
    ? credentials.redirect_uris[0] // from env var
    : 'http://localhost:5000/api/ai/oauth2callback'
);


const searchconsole = google.webmasters({ version: 'v3', auth: oAuth2Client });

// Mock data fallback
const mockKeywords = [
  { keyword: 'digital marketing', volume: 10000, difficulty: 30 },
  { keyword: 'AI SEO', volume: 5000, difficulty: 25 },
];
const mockCompetitors = [
  { competitor: 'Competitor A', strength: 'Strong SEO', weakness: 'Low social engagement' },
  { competitor: 'Competitor B', strength: 'High ad spend', weakness: 'Poor content quality' },
];

// Load GSC tokens
async function loadTokens() {
  try {
    const tokenPath = '/tmp/tokens.json'; // Use /tmp for Vercel compatibility
    if (!fs.existsSync(tokenPath)) {
      throw new Error('Tokens file not found');
    }
    const tokens = JSON.parse(fs.readFileSync(tokenPath));
    if (!tokens.access_token) {
      throw new Error('Invalid tokens in /tmp/tokens.json');
    }
    oAuth2Client.setCredentials(tokens);
    console.log('Successfully loaded GSC tokens from /tmp/tokens.json');
  } catch (error) {
    console.error('Error loading GSC tokens:', error.message);
    throw new Error('GSC authentication required. Visit /api/ai/auth to authenticate.');
  }
}

// GSC Authentication Routes
router.get('/auth', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/webmasters'],
  });
  console.log('Redirecting to Google OAuth:', authUrl);
  res.redirect(authUrl);
});

router.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    fs.writeFileSync('/tmp/tokens.json', JSON.stringify(tokens)); // Use /tmp for Vercel
    console.log('Tokens saved to /tmp/tokens.json');
    res.send('GSC Authentication successful! You can close this window.');
  } catch (err) {
    console.error('Error retrieving access token:', err.message);
    res.status(500).send('GSC Authentication failed');
  }
});

// Keyword Research (Google Search Console)
router.get('/keywords', async (req, res) => {
  const { phrase = 'digital marketing' } = req.query;
  const cacheKey = `keywords_${phrase}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) return res.json(cachedData);

  try {
    if (!process.env.GSC_SITE_URL) {
      throw new Error('GSC_SITE_URL environment variable is not defined');
    }
    await loadTokens();
    const response = await searchconsole.searchanalytics.query({
      siteUrl: process.env.GSC_SITE_URL,
      requestBody: {
        startDate: '2025-08-01',
        endDate: '2025-09-01',
        dimensions: ['query'],
        searchType: 'web',
        rowLimit: 100,
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: 'query',
                operator: 'contains',
                expression: phrase,
              },
            ],
          },
        ],
      },
    });

    const keywords = (response.data.rows || []).map(row => ({
      keyword: row.keys[0],
      volume: row.impressions,
      difficulty: Math.round(row.position),
    }));

    const result = keywords.length > 0 ? keywords.slice(0, 5) : mockKeywords;
    cache.set(cacheKey, result);
    console.log(`Fetched keywords for phrase: ${phrase}`);
    res.json(result);
  } catch (error) {
    console.error('GSC API error:', error.message);
    res.json(mockKeywords);
  }
});

// Content Generation (OpenAI)
router.post('/content', async (req, res) => {
  const { topic } = req.body;
  const cacheKey = `content_${topic}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) return res.json(cachedData);

  if (!openai || !topic) {
    console.warn('OpenAI API key or topic missing, using mock data');
    return res.json({
      content: `Generated content for ${topic || 'unknown topic'}: Optimize your digital presence with AI-driven strategies.`,
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a professional content writer for a digital marketing agency.' },
        { role: 'user', content: `Generate a 50-word SEO-optimized marketing paragraph about ${topic}.` },
      ],
      max_tokens: 100,
    });

    const result = { content: completion.choices[0].message.content };
    cache.set(cacheKey, result);
    console.log(`Generated content for topic: ${topic}`);
    res.json(result);
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    res.json({ content: `Generated content for ${topic || 'unknown topic'}: Optimize your digital presence with AI-driven strategies.` });
  }
});

// Competitor Analysis (Google Search Console)
router.get('/competitor-analysis', async (req, res) => {
  const { domain = 'example.com' } = req.query;
  const cacheKey = `competitors_${domain}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) return res.json(cachedData);

  try {
    if (!process.env.GSC_SITE_URL) {
      throw new Error('GSC_SITE_URL environment variable is not defined');
    }
    await loadTokens();
    const response = await searchconsole.searchanalytics.query({
      siteUrl: process.env.GSC_SITE_URL,
      requestBody: {
        startDate: '2025-08-01',
        endDate: '2025-09-01',
        dimensions: ['page'],
        searchType: 'web',
        rowLimit: 10,
      },
    });

    const competitors = (response.data.rows || []).map(row => ({
      competitor: row.keys[0],
      strength: `High traffic: ${row.impressions} impressions`,
      weakness: `Average position: ${Math.round(row.position)}`,
    }));

    const result = competitors.length > 0 ? competitors.slice(0, 3) : mockCompetitors;
    cache.set(cacheKey, result);
    console.log(`Fetched competitor analysis for domain: ${domain}`);
    res.json(result);
  } catch (error) {
    console.error('GSC API error:', error.message);
    res.json(mockCompetitors);
  }
});

module.exports = router;