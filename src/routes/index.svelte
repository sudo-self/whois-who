<script>
  import { onMount } from 'svelte';
  let domain = '';
  let whoisData = null;
  let loading = false;
  let error = null;

  const fetchWhoisData = async () => {
    if (!domain) {
      error = 'Please enter a domain';
      return;
    }

    loading = true;
    error = null;
    try {
      const response = await fetch(`/api/whois?domain=${domain}`);
      if (!response.ok) {
        throw new Error('Failed to fetch WHOIS data');
      }
      const data = await response.json();
      if (data.WhoisRecord) {
        whoisData = data.WhoisRecord;
      } else {
        throw new Error('No WHOIS data found');
      }
    } catch (err) {
      error = err.message || 'An error occurred';
      whoisData = null;
    } finally {
      loading = false;
    }
  };
</script>

<style>
  .whois-container {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 20px;
    background-color: #f9f9f9;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 14px;
  }

  .error {
    color: red;
    font-weight: bold;
  }
</style>

<div class="container">
  <h1>WHOIS Lookup</h1>
  
  <input
    type="text"
    bind:value={domain}
    placeholder="Enter a domain"
    class="input"
  />
  <button on:click={fetchWhoisData} disabled={loading}>
    {loading ? 'Loading...' : 'Search'}
  </button>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if whoisData}
    <div class="whois-container">
      <h3>WHOIS Data for {domain}</h3>
      <pre>{JSON.stringify(whoisData, null, 2)}</pre>
    </div>
  {/if}
</div>


