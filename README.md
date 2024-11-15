
## Whois-Who


1. create a new svelte project
```
npx degit sveltejs/template svelte-whois
cd svelte-whois
npm install
```
#### API KEY
```
https://whois.whoisxmlapi.com
```
#### App.svelte
(modify the default App.svelte to import WhoisLookup.svelte)
```
  import WhoisLookup from './WhoisLookup.svelte';
```
2. add it in the main component
```

<main>
  <WhoisLookup />
</main>
```
#### src/WhoisLookup.svelte
```
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

      const apiKey = "xxxxxxxxxxx";
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
```
#### dev server 

```
npm run dev
```
WhoisWho.png

https://whois-who.vercel.app

SVELTE!
