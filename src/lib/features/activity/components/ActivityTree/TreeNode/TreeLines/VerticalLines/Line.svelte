<script lang="ts">
  import NodeLine from '$lib/components/NodeLine/NodeLine.svelte';

  const classes = $derived(['TreeLinesVerticalLine'].filter(Boolean));
</script>

<NodeLine class={classes.join(' ')} position="vertical" height="100%" />

<style lang="scss">
  :global(.TreeLinesVerticalLine) {
    margin-right: var(--tree-node-indent-per-level);
  }
</style>
