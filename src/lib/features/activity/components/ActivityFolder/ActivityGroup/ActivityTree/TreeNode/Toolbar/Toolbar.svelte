<script lang="ts">
  import type { ActivityCreateFormData, Activity } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../../ActivityTree.svelte';
  import AddActivity from './AddActivity.svelte';
  import Delete from './Delete.svelte';

  type Props = {
    class?: string;
    data: Activity;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    editMode: boolean;
    maxLevels: number;
    node: ActivityTreeNodeValue;
    selectedNode: string | undefined;
  };

  const {
    class: className = '',
    data,
    oncreate,
    onupdate,
    ondelete,
    editMode,
    maxLevels,
    node,
    selectedNode,
  }: Props = $props();

  const classes = $derived(['Toolbar', className].filter(Boolean));
  const isSelected = $derived(selectedNode === node.id);
  const selected = $derived(
    (node.hasChildren && node.isExpanded) || (!node.hasChildren && isSelected),
  );
</script>

{#if editMode && selected}
  <div class={classes.join(' ')}>
    <Delete {data} {ondelete} />
    <AddActivity {data} {oncreate} {maxLevels} {node} />
  </div>
{/if}

<style lang="scss">
  .Toolbar {
    display: inline-flex;
    align-items: center;
    margin: 0 -6px;
    padding: calc(var(--dodo-ui-space)) 0;

    :global(.dodo-ui-Button),
    :global(.dodo-ui-UtilityButton) {
      margin: 0 6px;
    }
  }
</style>
