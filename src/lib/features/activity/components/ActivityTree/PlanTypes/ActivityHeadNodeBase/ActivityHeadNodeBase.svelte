<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ActivityNodeValue } from '../../ActivityNodes/ActivityNode/ActivityNode.svelte';

  type Props = {
    value: ActivityNodeValue;
    children?: Snippet;
    class?: string;
  };

  let { value, children, class: className = '' }: Props = $props();

  const classes = $derived(
    [
      'ActivityHeadNodeBase',
      `${value.isExpanded ? 'isExpanded' : ''}`,
      `${value.hasChildren ? 'hasChildren' : ''}`,
      `${className}`,
    ].filter(Boolean),
  );
</script>

<div class={classes.join(' ')}>
  {@render children?.()}
</div>

<style lang="scss">
  .ActivityHeadNodeBase {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: calc(var(--dodo-ui-space));
    margin-bottom: calc(var(--dodo-ui-space) * 3);

    &.isExpanded {
      margin-bottom: calc(var(--dodo-ui-space) / 1.5);
    }

    :global(p) {
      font-size: 1.2rem;
      font-weight: 400;
      margin: 0;
      display: flex;
    }
  }
</style>
