<script lang="ts">
  import type {
    ActivityGroup,
    ActivityCreateFormData,
    Activity,
  } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../../ActivityTree.svelte';
  import AddActivity from './AddActivity.svelte';
  import Delete from './Delete.svelte';

  type Props = {
    class?: string;
    data: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    editMode: boolean;
    maxLevels: number;
    node: ActivityTreeNodeValue;
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
  }: Props = $props();

  const classes = $derived(['Toolbar', className].filter(Boolean));
  const selected = $derived(node.hasChildren && node.isExpanded);
</script>

{#if editMode && selected}
  <div class={classes.join(' ')}>
    <Delete {data} {ondelete} />
    <AddActivity {data} {oncreate} />
  </div>
{/if}

<style lang="scss">
  .Toolbar {
    display: inline-flex;
    align-items: center;
    margin: 0 -6px;

    :global(.dodo-ui-Button),
    :global(.dodo-ui-UtilityButton) {
      margin: 0 6px;
    }
  }
</style>
