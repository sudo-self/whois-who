<script>
  import { onMount } from 'svelte';
  import WhoisLookup from './WhoisLookup.svelte';

  let time = new Date();
  let isClockVisible = true; // Flag to toggle between clock and results
  let isDarkMode = localStorage.getItem('darkMode') === 'true' ? true : false;

  const toggleDarkMode = () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  };


  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });


  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();


  const showResults = () => {
    isClockVisible = false;
  };
</script>

<main>
  <h1>Whois Who</h1>


  <svg on:click={toggleDarkMode} class="dark-button" xmlns="http://www.w3.org/2000/svg" width="4.1em" height="1em" viewBox="0 0 512 125">
    <path fill="#4A4A55" d="M166.663 96.865a26.86 26.86 0 0 1-15.304-4.324a22.17 22.17 0 0 1-8.936-11.835l9.316-3.422a17.2 17.2 0 0 0 6.084 7.367a16 16 0 0 0 9.22 2.709a13.55 13.55 0 0 0 8.792-2.661a9.23 9.23 0 0 0 3.28-7.605a8.3 8.3 0 0 0-.904-3.85a11.5 11.5 0 0 0-2.044-2.9a13.8 13.8 0 0 0-3.517-2.329q-2.378-1.186-3.944-1.806q-1.57-.615-4.61-1.663q-3.804-1.33-5.704-2.09a43 43 0 0 1-4.99-2.52a18.5 18.5 0 0 1-4.658-3.517a17 17 0 0 1-2.804-4.61a16.475 16.475 0 0 1 4.467-18.726q5.704-5.038 15.495-5.038q8.173 0 13.45 3.612a17.47 17.47 0 0 1 7.081 9.601l-9.125 3.041a10.62 10.62 0 0 0-4.42-4.895a14.85 14.85 0 0 0-7.747-1.854a11.94 11.94 0 0 0-7.462 2.091a7.02 7.02 0 0 0-2.71 5.894a6.15 6.15 0 0 0 2.091 4.563a14.4 14.4 0 0 0 4.373 2.947q2.283.95 6.94 2.566q2.85 1.047 4.229 1.569q1.379.52 4.04 1.758c1.422.63 2.79 1.377 4.087 2.234a36 36 0 0 1 3.327 2.71a14.2 14.2 0 0 1 2.9 3.468a19.4 19.4 0 0 1 1.71 4.277a19.6 19.6 0 0 1 .715 5.371q0 9.318-6.37 14.59q-6.369 5.279-16.348 5.277m60.929-1.14l-22.814-66.54h10.647l15.114 46.388a72 72 0 0 1 2.091 7.604a71 71 0 0 1 2.092-7.604l14.923-46.388h10.552l-22.72 66.54zm52.755 0v-66.54h41.255v9.316h-31.368v18.251h20.245v9.316h-20.245v20.34h33.458v9.317zm68.534 0v-66.54h9.887V86.22h32.509v9.506zm79.656-57.034v57.034h-9.887V38.69h-18.82v-9.505h47.528v9.505zm39.257 57.034v-66.54h41.255v9.316h-31.368v18.251h20.246v9.316h-20.246v20.34h33.459v9.317z"/>
    <path fill="#FF3E00" d="M97.329 16.53C85.728-.074 62.816-4.995 46.249 5.56L17.156 24.103A33.38 33.38 0 0 0 2.075 46.46a35.15 35.15 0 0 0 3.467 22.568A33.5 33.5 0 0 0 .55 81.502a35.57 35.57 0 0 0 6.076 26.9c11.604 16.606 34.516 21.525 51.08 10.97L86.8 100.83a33.37 33.37 0 0 0 15.08-22.358a35.17 35.17 0 0 0-3.465-22.568a33.5 33.5 0 0 0 4.99-12.474a35.56 35.56 0 0 0-6.075-26.9"/>
  </svg>


  {#if isClockVisible}
    <svg viewBox="-50 -50 100 100">
      <circle class="clock-face" r="48" />
      {#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minute}
        <line class="major" y1="35" y2="45" transform="rotate({30 * minute})" />
        {#each [1, 2, 3, 4] as offset}
          <line class="minor" y1="42" y2="45" transform="rotate({6 * (minute + offset)})" />
        {/each}
      {/each}
      <line class="hour" y1="2" y2="-20" transform="rotate({30 * hours + minutes / 2})" />
      <line class="minute" y1="4" y2="-30" transform="rotate({6 * minutes + seconds / 10})" />
      <g transform="rotate({6 * seconds})">
        <line class="second" y1="10" y2="-38" />
        <line class="second-counterweight" y1="10" y2="2" />
      </g>
    </svg>
  {/if}


  {#if !isClockVisible}
    <WhoisLookup />
  {/if}
</main>

<style>
  svg {
    width: 100%;
    height: 100%;
  }
  .clock-face {
    stroke: #333;
    fill: white;
  }
  .minor {
    stroke: #999;
    stroke-width: 0.5;
  }
  .major {
    stroke: #333;
    stroke-width: 1;
  }
  .hour {
    stroke: #666;
    stroke-width: 4;
  }
  .minute {
    stroke: #666;
    stroke-width: 2;
  }
  .second {
    stroke: #f00;
    stroke-width: 2;
  }
  .second-counterweight {
    stroke: #f00;
    stroke-width: 0.5;
  }
</style>


