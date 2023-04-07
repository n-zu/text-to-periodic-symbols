<script lang="ts">
  import type { PtResults } from "../scripts/types";
  import PtChar from "./PtChar.svelte";

  export let wordResults: PtResults;

  let currentRes = wordResults[0].result;
</script>

<div>
  {#each currentRes as char}
    <PtChar char={char} />
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2em;
  }
</style>