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
  const level = $derived(node.level || 1);
  const lines = $derived(generateLines(level));

  const classes = $derived(['HorizontalLines'].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#each lines as line (line)}
    <Line {line} />
  {/each}
</div>

<style lang="scss">
  .HorizontalLines {
    display: flex;
  }
</style>
