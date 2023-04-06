<script>
  import PtContainer from "../components/PtContainer.svelte";

  let value = 'Breaking Bad';
</script>

<input type="text" bind:value >

<PtContainer text={value} />
