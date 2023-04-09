<script lang="ts">
  import { config, modes } from "../stores/config";
  import type { Mode } from "../stores/config";

  const setMode = (mode:  Mode) => {
    config.update((config) => {
      config.mode = mode;
      return config;
    });
  };
</script>

<nav>
  <h1>TEXT 2 ELEMENTS</h1>
  <div class="modes">
    {#each modes as mode}
      <a 
        href={"#"} role="button"
        on:click={() => setMode(mode)}
        class={"outline " + ($config.mode === mode ? "primary" : "secondary ")}
      >
        {mode}
      </a>
    {/each}
  </div>
</nav>

<style>
  h1 {
    margin: 0;
    padding: 0 1rem;
  }
  nav {
    display: flex;
    align-items: center;
    padding: 1rem 0;
    flex-wrap: wrap;
  }
  .modes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0 1rem;
  }
  a {
    padding: .3rem .7rem;
  }
</style>