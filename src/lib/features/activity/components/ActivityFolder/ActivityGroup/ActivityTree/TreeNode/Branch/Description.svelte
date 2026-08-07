<script lang="ts">
  import type { ActivityTreeNodeValue } from '../../ActivityTree.svelte';

  type Props = {
    class?: string;
    node: ActivityTreeNodeValue;
  };

  const { class: className = '', node }: Props = $props();

  const expanded = $derived(node.isExpanded);
  const classes = $derived(
    ['Description', `${expanded ? 'expanded' : ''}`, className].filter(Boolean),
  );
</script>

<p class={classes.join(' ')}>
  {node.data?.description}
</p>

<style lang="scss">
  .Description {
    margin: 0;
    padding: 0;
    padding-top: 12px;
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 0.95rem;
    font-family: inherit;
    border: 0;
    background-color: transparent;

    &.expanded {
      font-weight: 600;
      margin-left: 2px;
    }
  }
</style>
