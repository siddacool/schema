<script lang="ts">
  import NodeLine from '$lib/components/NodeLine/NodeLine.svelte';

  const classes = $derived(['ActivityAccordianViewVerticalLine'].filter(Boolean));
</script>

<NodeLine class={classes.join(' ')} position="vertical" height="calc(var(--dodo-ui-space) * 1.5)" />

<style lang="scss">
  :global(.ActivityAccordianViewVerticalLine) {
    position: relative;
    left: 8px;
  }
</style>
