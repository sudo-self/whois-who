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
      console.log(data);

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
  <a class="github-button" href="https://github.com/sudo-self/whois-who" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" aria-label="Star sudo-self/whois-who on GitHub">Star</a>
 
  <input type="text" bind:value={domain} placeholder="Enter a domain" />
  <button on:click={fetchWhoisData} disabled={loading}>
    {loading ? 'Loading...' : 'Search'}
  </button>
 <h1>.org .net .io .co .gg</h1>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if whoisData}
    <div class="whois-container">
      <h3>WHOIS: {domain}</h3>
      <p><strong>Domain Name:</strong> {getDataOrNA(whoisData.domainName)}</p>
      <p><strong>Registrar:</strong> {getDataOrNA(whoisData.registrarName)}</p>
      <p><strong>Registrar IANA ID:</strong> {getDataOrNA(whoisData.registrarIanaID)}</p>
      <p><strong>Registrar WHOIS Server:</strong> {getDataOrNA(whoisData.registrarWhoisServer)}</p>
      <p><strong>Registrar URL:</strong> <a href={whoisData.registrarURL || "#"} target="_blank">{getDataOrNA(whoisData.registrarURL)}</a></p>
      <p><strong>Created Date:</strong> {getDataOrNA(whoisData.createdDate)}</p>
      <p><strong>Updated Date:</strong> {getDataOrNA(whoisData.updatedDate)}</p>
      <p><strong>Expires Date:</strong> {getDataOrNA(whoisData.expiresDate)}</p>
      <p><strong>Domain Status:</strong> {getDataOrNA(whoisData.domainStatus)}</p>

      {#if whoisData.createdDate}
        <p><strong>Days Old:</strong> {getDaysOld(whoisData.createdDate)} days</p>
      {/if}

      <p><strong>Country:</strong> {getDataOrNA(whoisData.registrarCountry)}</p>
      <p><strong>State/Province:</strong> {getDataOrNA(whoisData.registrarState)}</p>

      <p><strong>Name Servers:</strong></p>
      {#if whoisData.nameServers?.length}
        <ul>
          {#each whoisData.nameServers as nameServer}
            <li>{nameServer}</li>
          {/each}
        </ul>
      {:else}
        <p>No name servers found</p>
      {/if}

      <p><strong>Registrar Abuse Contact Email:</strong> {getDataOrNA(whoisData.registrarAbuseContactEmail)}</p>
      <p><strong>Registrar Abuse Contact Phone:</strong> {getDataOrNA(whoisData.registrarAbuseContactPhone)}</p>
      <p><strong>Domain Contact Email:</strong> {getDataOrNA(whoisData.domainContactEmail)}</p>


      <p><strong>Registrant Organization:</strong> {getDataOrNA(whoisData.registrant?.organization)}</p>
      <p><strong>Registrant State:</strong> {getDataOrNA(whoisData.registrant?.state)}</p>
      <p><strong>Registrant Country:</strong> {getDataOrNA(whoisData.registrant?.country)}</p>

      <p><strong>Technical Contact:</strong> {getDataOrNA(whoisData.technicalContact?.organization)}</p>
      <p><strong>Administrative Contact:</strong> {getDataOrNA(whoisData.administrativeContact?.organization)}</p>
    </div>
  {/if}
</div>







