<script>
  import { onMount } from "svelte";

  let domain = "";
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

      const apiKey = "at_xo35mJkUEsqWfnGpOYa48pVjS46QC";
      const response = await fetch(
        `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch WHOIS data');
      }

      const data = await response.json();
      whoisData = data;
    } catch (err) {
      error = err.message || 'An error occurred';
      whoisData = null;
    } finally {
      loading = false;
    }
  };
</script>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  .whois-container {
    margin-top: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    max-height: 400px;
    overflow-y: auto;
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
  <h1>.org .net .io .co .xyz</h1>

  <input type="text" bind:value={domain} placeholder="Enter a domain" />
  <button on:click={fetchWhoisData} disabled={loading}>
    {loading ? 'Loading...' : 'Search'}
  </button>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if whoisData}
    <div class="whois-container">
      <h3>WHOIS data {domain}</h3>
      <pre>{JSON.stringify(whoisData, null, 2)}</pre>
    </div>
  {/if}
</div>
