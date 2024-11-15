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
      console.log(data);  // Log the entire response for debugging

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
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Days old
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
  <a class="github-button" href="https://github.com/sudo-self/whois-who" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" aria-label="Star sudo-self/whois-who on GitHub">Star</a>
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
      <h3>WHOIS data for {domain}</h3>
      <p><strong>Domain Name:</strong> {whoisData.domainName || "N/A"}</p>
      <p><strong>Registrar:</strong> {whoisData.registrarName || "N/A"}</p>
      <p><strong>Registrar IANA ID:</strong> {whoisData.registrarIANAID || "N/A"}</p>
      <p><strong>Registrar WHOIS Server:</strong> {whoisData.registrarWhoisServer || "N/A"}</p>
      <p><strong>Registrar URL:</strong> <a href={whoisData.registrarURL || "#"} target="_blank">{whoisData.registrarURL || "N/A"}</a></p>
      
      <p><strong>Created Date:</strong> {whoisData.createdDate || "N/A"}</p>
      <p><strong>Updated Date:</strong> {whoisData.updatedDate || "N/A"}</p>
      <p><strong>Expires Date:</strong> {whoisData.expiresDate || "N/A"}</p>

      <p><strong>Days Old:</strong> {getDaysOld(whoisData.createdDate)} days</p>

      <p><strong>Registrant:</strong> {whoisData.registrant?.organization || "N/A"}</p>
      <p><strong>Registrant State:</strong> {whoisData.registrant?.state || "N/A"}</p>
      <p><strong>Registrant Country:</strong> {whoisData.registrant?.country || "N/A"}</p>

      <p><strong>Administrative Contact:</strong> {whoisData.administrativeContact?.organization || "N/A"}</p>
      <p><strong>Administrative Contact State:</strong> {whoisData.administrativeContact?.state || "N/A"}</p>
      <p><strong>Administrative Contact Country:</strong> {whoisData.administrativeContact?.country || "N/A"}</p>

      <p><strong>Technical Contact:</strong> {whoisData.technicalContact?.organization || "N/A"}</p>
      <p><strong>Technical Contact State:</strong> {whoisData.technicalContact?.state || "N/A"}</p>
      <p><strong>Technical Contact Country:</strong> {whoisData.technicalContact?.country || "N/A"}</p>

      <p><strong>Name Servers:</strong></p>
      <ul>
        {#each whoisData.nameServers?.hostNames || [] as nameServer}
          <li>{nameServer}</li>
        {/each}
      </ul>

      <p><strong>Registrar Abuse Contact Email:</strong> {whoisData.registrarAbuseContactEmail || "N/A"}</p>
      <p><strong>Registrar Abuse Contact Phone:</strong> {whoisData.registrarAbuseContactPhone || "N/A"}</p>
      <p><strong>Contact Email:</strong> <a href={`mailto:${whoisData.contactEmail}`}>{whoisData.contactEmail || "N/A"}</a></p>
    </div>
  {/if}
</div>


