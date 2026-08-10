<script lang="ts">
  import type { ActivityTreeNodeValue } from '../../../types';
  type Props = {
    node: ActivityTreeNodeValue;
  };

  let { node }: Props = $props();

  const space = $derived((node.level || 1) - 1);
  const classes = $derived(['HorizontalLine', `${space ? 'space' : ''}`].filter(Boolean));
</script>

<div
  class={classes.join(' ')}
  style={`--HorizontalLine-space: ${space}; --HorizontalLine-space-pixel: ${space}px;`}
></div>

<style lang="scss">
  .HorizontalLine {
    z-index: 0;
    background-color: var(--dodo-color-neutral-300);
    height: 1px;
    width: 30px;
    position: absolute;
    top: 20px;
    left: 1px;
    left: calc(
      calc(var(--tree-node-indent-per-level) * var(--HorizontalLine-space)) +
        var(--HorizontalLine-space-pixel)
    );
  }
</style>
