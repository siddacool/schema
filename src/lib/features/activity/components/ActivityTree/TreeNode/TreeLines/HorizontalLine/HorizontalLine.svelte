<script lang="ts">
  import NodeLine from '$lib/components/NodeLine/NodeLine.svelte';
  import type { ActivityTreeNodeValue } from '../../../types';

  type Props = {
    node: ActivityTreeNodeValue;
  };

  let { node }: Props = $props();
  const isNodeTypeBranch = $derived(node.hasChildren);

  const space = $derived((node.level || 1) - 1);
  const classes = $derived(
    [
      'HorizontalLine',
      `${space ? 'space' : ''}`,
      `${isNodeTypeBranch ? 'isNodeTypeBranch' : ''}`,
    ].filter(Boolean),
  );
</script>

<div
  class={classes.join(' ')}
  style={`--HorizontalLine-space: ${space}; --HorizontalLine-space-pixel: ${space}px;`}
>
  <NodeLine class="HorizontalLineLine" position="horizontal" width="28px" />
</div>

<style lang="scss">
  .HorizontalLine {
    position: absolute;
    top: 28px;
    left: calc(
      calc(var(--tree-node-indent-per-level) * var(--HorizontalLine-space)) +
        var(--HorizontalLine-space-pixel)
    );

    &.isNodeTypeBranch {
      top: 28px;
    }
  }
</style>
