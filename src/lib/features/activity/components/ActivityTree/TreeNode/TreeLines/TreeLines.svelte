<script lang="ts">
  import type { ActivityTreeNodeValue, ActivityTreeRefvalue } from '../../types';
  import HorizontalLine from './HorizontalLine/HorizontalLine.svelte';
  import VerticalLines from './VerticalLines/VerticalLines.svelte';

  type Props = {
    class?: string;
    node: ActivityTreeNodeValue;
    treeRef: ActivityTreeRefvalue | undefined;
  };

  let { node, class: className, treeRef }: Props = $props();
  const level = $derived(node.level || 1);
  const parentPath = $derived(
    node.path.lastIndexOf('.') === -1 ? '' : node.path.substring(0, node.path.lastIndexOf('.')),
  );
  const siblings = $derived(treeRef?.getChildren(parentPath) || []);
  const nodeIndex = $derived(siblings.findIndex((item) => item.id === node.id));
  const firstChild = $derived(nodeIndex === 0);

  const classes = $derived(
    ['TreeLines', `${firstChild ? 'firstChild' : ''}`, className].filter(Boolean),
  );
</script>

<div class={classes.join(' ')} style={`--TreeLines-level: ${level};`}>
  <div class="conatiner">
    <VerticalLines {node} />
    <HorizontalLine {node} />
  </div>
</div>

<style lang="scss">
  .TreeLines {
    top: 0;
    left: calc(calc(var(--tree-node-indent-per-level) * -1) * var(--TreeLines-level));
    position: absolute;
    display: flex;
    height: 100%;
    padding-left: 8px;
    top: -2px;
    height: calc(100% + 2px);

    &.firstChild {
      top: -2px;
      height: calc(100% + 2px);
    }

    .conatiner {
      position: relative;
    }
  }
</style>
