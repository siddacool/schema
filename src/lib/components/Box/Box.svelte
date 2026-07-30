<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    class?: string;
  };

  let { children, class: className = '' }: Props = $props();

  const classes = $derived(['Box', className].filter(Boolean));
</script>

<main class={classes.join(' ')}>
  {@render children?.()}
</main>

<style lang="scss">
  .Box {
    margin-top: 60px;
    height: calc(100vh - 60px);
    margin-left: auto;
    margin-right: auto;
    width: 100vw;
    padding: 0 calc(var(--dodo-ui-space) * 2);
    max-width: 800px;
  }
</style>
