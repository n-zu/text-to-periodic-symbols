<script>
  import Navigation from "../components/Navigation.svelte";
</script>

<Navigation />

<main>
  <slot />
</main>

<style>
  main {
    margin: 0 auto;
  }
  @media (max-width: 576px) {
    main {
      max-width: 576px;
    }
  }
  @media (min-width: 576px) {
    main {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    main {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    main {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    main {
      max-width: 1140px;
    }
  }
</style>
