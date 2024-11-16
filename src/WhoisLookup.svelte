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

      if (data && data.WhoisRecord) {
        whoisData = data.WhoisRecord;
      } else {
        error = 'No data found for this domain';
        whoisData = null;
      }
    } catch (err) {
      error = err.message || 'An error occurred';
      whoisData = null;
    } finally {
      loading = false;
    }
  };

  const getDaysOld = (createdDate) => {
    if (!createdDate) return null;
    const created = new Date(createdDate);
    const today = new Date();
    const diffTime = today - created;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  };

  const getDataOrNA = (data) => data || "N/A";
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

  h3 {
    color: #ff3e00;
  }

  ul {
    text-align: left;
    padding-left: 20px;
  }
</style>

<div class="container">
  <h1>WHOIS Lookup</h1>

  <input type="text" bind:value={domain} placeholder="Enter a domain name" />
  <button on:click={fetchWhoisData} disabled={loading}>
    {loading ? 'Loading...' : 'Search'}
  </button>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if whoisData}
    <div class="whois-container">
      <h3>Parsed WHOIS Data</h3>
      <p><strong>Parsed domain name:</strong> {getDataOrNA(whoisData.domainName)}</p>
      <p><strong>Domain name extension:</strong> {getDataOrNA(whoisData.domainName.split('.').pop())}</p>
      <p><strong>Estimated domain age:</strong> {whoisData.createdDate ? `${getDaysOld(whoisData.createdDate)} day(s)` : "N/A"}</p>
      <p><strong>Contact email:</strong> {getDataOrNA(whoisData.registrarAbuseContactEmail)}</p>
      <p><strong>Created date:</strong> {getDataOrNA(whoisData.createdDate)}</p>
      <p><strong>Updated date:</strong> {getDataOrNA(whoisData.updatedDate)}</p>
      <p><strong>Expires date:</strong> {getDataOrNA(whoisData.expiresDate)}</p>
      <p><strong>Registrar name:</strong> {getDataOrNA(whoisData.registrarName)}</p>
      <p><strong>Registrar Internet Assigned Numbers Authority ID:</strong> {getDataOrNA(whoisData.registrarIanaID)}</p>
      <p><strong>Domain EPP status codes by ICANN list:</strong> {getDataOrNA(whoisData.status)}</p>

      <h3>Name Servers</h3>
      {#if whoisData.nameServers?.length}
        <ul>
          {#each whoisData.nameServers as nameServer}
            <li>{nameServer}</li>
          {/each}
        </ul>
      {:else}
        <p>No name servers found</p>
      {/if}
    </div>
  {/if}
</div>





