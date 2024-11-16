<script>
  import { spring } from 'svelte/motion';
  import WhoisLookup from './WhoisLookup.svelte';

  let coords = spring({ x: 50, y: 50 }, { stiffness: 0.1, damping: 0.25 });
  let size = spring(10);

  export let name;
  let isDarkMode = localStorage.getItem('darkMode') === 'true' ? true : false;

  const toggleDarkMode = () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  };

  // Apply dark mode on initial load
  document.documentElement.classList.toggle('dark', isDarkMode);
</script>

<svg
  onmousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}
  onmousedown={() => size.set(30)}
  onmouseup={() => size.set(10)}
>
  <circle cx={$coords.x} cy={$coords.y} r={$size} />
</svg>

<main>
  <h1>Whois Who</h1>

  <!-- Dark Mode Toggle Button -->
  <button on:click={toggleDarkMode} class="dark-button">Toggle Dark Mode</button>

  <!-- Whois Lookup Component -->
  <WhoisLookup />

</main>

<footer class="footer">
  <p>
    <a href="https://whois-who.vercel.app" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
      whois-who.vercel.app
    </a>
  </p>
</footer>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    background-color: white;
    color: black;
    transition: background-color 0.3s, color 0.3s;
  }

  main {
    text-align: center;
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
  }

  h1 {
    font-size: 4em;
    font-weight: 100;
    margin-bottom: 20px;
    background: linear-gradient(90deg, #e03e00, #e67e00); 
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  :global(.dark body) {
    background-color: #121212;
    color: white;
  }

  .dark-button {
    background-color: transparent;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-top: 20px;
    color: black;
    font-size: 1.5em;
  }

  :global(.dark .dark-button) {
    color: white;
  }

  .whois-container {
    margin-top: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px dashed #ff3e00;
    max-height: 400px;
    overflow-y: auto;
  }

  :global(.dark .whois-container) {
    background-color: #333;
    color: white;
    border-color: #ff3e00;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 14px;
  }

  footer {
    text-align: center;
    padding: 20px;
    width: 100%;
  }
</style>



