// src/routes/api/whois.js

import fetch from 'node-fetch';

export async function get({ url }) {
  const domain = url.searchParams.get('domain');

  if (!domain) {
    return {
      status: 400,
      body: { error: 'Domain is required' },
    };
  }

  const apiUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_xo35mJkUEsqWfnGpOYa48pVjS46QC&domainName=${domain}&outputFormat=JSON`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return {
        status: 500,
        body: { error: 'Failed to fetch WHOIS data' },
      };
    }

    const data = await response.json();
    return {
      status: 200,
      body: data,
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: error.message },
    };
  }
}

