<script lang="ts">
  import type { ActivityTreeNodeValue } from '../../../types';

  import Line from './Line.svelte';

  type Props = {
    node: ActivityTreeNodeValue;
  };

  function generateLines(level: number) {
    const lines: number[] = [];

    for (let i = 0; i < level; i++) {
      lines.push(i);
    }

    return lines;
  }

  let { node }: Props = $props();
  const lines = $derived(generateLines(node.level || 1));

  const classes = $derived(['VerticalLines'].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#each lines as line (line)}
    <Line />
  {/each}
</div>

<style lang="scss">
  .VerticalLines {
    display: flex;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
