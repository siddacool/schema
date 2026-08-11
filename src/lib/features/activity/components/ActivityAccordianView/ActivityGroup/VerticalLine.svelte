<script lang="ts">
  import NodeLine from '$lib/components/NodeLine/NodeLine.svelte';
  import type { ActivityGroup } from '$lib/features/activity/types';

  type Props = {
    data: ActivityGroup;
  };

  const { data }: Props = $props();

  const isShow = $derived(data.activity.length ? true : false);
  const classes = $derived(['ActivityAccordianViewVerticalLine'].filter(Boolean));
</script>

{#if isShow}
  <NodeLine
    class={classes.join(' ')}
    position="vertical"
    height="calc(var(--dodo-ui-space) * 1.5)"
  />
{/if}

<style lang="scss">
  :global(.ActivityAccordianViewVerticalLine) {
    position: relative;
    left: 8px;
  }
</style>
