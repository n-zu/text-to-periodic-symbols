<script>
  import text2pt, {parseResultsObjects} from "../scripts/text2pt";
  export let text = '';

  let output = '';
</script>

<button on:click={
  () => {
    output = parseResultsObjects(text2pt(text))[0];
  }
}>Parse</button>
{output}