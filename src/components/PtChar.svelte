<script lang="ts">
  import type { PtElement } from "../scripts/types";
  import getCategoryColor from "../scripts/category2color";

  export let char: string | PtElement;
  export let colored: boolean = false;

  let text: string, subtext: string, className:string;
  if (typeof char === "string") {
    text = char;
    subtext = "-";
    className = "unknown";
  } else {
    text = char.symbol;
    subtext = String(char.atomic_mass.toPrecision(5));
    className = char.category;
  }
  const color = getCategoryColor(className);
  let style = colored ? `--bg-color: ${color}; --bd-color: #0000` : "--bg-color: #0000; --bd-color: #fff";
</script>

<div class={className} style={style}>
  <h2 >{text}</h2>
  <p  >{subtext}</p>
</div>

<style>
  div {
    box-sizing: border-box;
    border: 1px solid var(--bd-color);
    background-color: var(--bg-color);
    border-radius: 2px;
    min-width: 100px;
    height: 120px;
    padding: 0 15px 0;
  }
  h2 {
    font-weight: 700;
    font-size: 60px;
    line-height: 80px;
    margin: 0;
  }
  p {
    font-size: 20px;
  }
</style>