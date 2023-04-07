<script lang="ts">
  import text2pt, {primaryText} from "../scripts/text2pt";
  import {throttle} from "../scripts/utils";

  export let text : string;

  let output : string = "";

  let setOutput = throttle((str : string) => {
    output = primaryText(text2pt(str));
  });


  $: setOutput(text);
</script>

{output}
