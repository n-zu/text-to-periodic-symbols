<script lang="ts">
  import type { PtElement } from "../scripts/types";
  import {config} from "../stores/config";
  import getCategoryColor from "../scripts/category2color";

  export let char: string | PtElement;

  let text: string, suptext: string, subtext: string, category:string;
  if (typeof char === "string") {
    text = char;
    subtext = "-";
    category = "none";
    suptext = "";
  } else {
    text = char.symbol;
    subtext = String(char.atomic_mass.toPrecision(5));
    category = char.category;
    suptext = String(char.number);
  }
  const color = getCategoryColor(category);
</script>

<div class={$config.mode} style:--pt-color={color}>
  <span>{suptext}</span>
  <h2 >{text}</h2>
  <p  >{subtext}</p>
</div>

<style>
  div {
    position: relative;
    box-sizing: border-box;
    border: 1px solid #0000;
    
    border-radius: 2px;
    min-width: 100px;
    height: 120px;
    padding: 0 15px 0;
  }

  div.white {
    border-color: white;
  }
  div.color {
    background-color: var(--pt-color);
  }
  div.black p{
    color: var(--pt-color);
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
  span {
    position: absolute;
    top: 0;
    right: 5px;
    font-family: monospace;
    font-weight: 700;
    opacity: 0.5;
  }
</style>