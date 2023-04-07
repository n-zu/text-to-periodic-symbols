<script lang="ts">
  import text2pt, {primaryText} from "../scripts/text2pt";
  import type { PtResults } from "../scripts/types";
  import {throttle} from "../scripts/utils";
  import PtWordResult from "./PtWordResult.svelte";

  export let text : string;

  let results : PtResults[] = [];
  let setResults = throttle((str : string) => {
    results = text2pt(str);
  });

  $: setResults(text);
</script>

<section>
  {#each results as wordResults(wordResults)}
    <PtWordResult {wordResults} />
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
</style>
