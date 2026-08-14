<script lang="ts">
  import type { ActivityCreateFormData, Activity } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../../types';
  import BackgoundTools from './BackgoundTools/BackgoundTools.svelte';
  import Toolbar from './Toolbar/Toolbar.svelte';

  type Props = {
    class?: string;
    data: Activity;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    onduplicate?: (data: Activity) => Promise<void>;
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
    onduplicate,
    editMode,
    maxLevels,
    node,
  }: Props = $props();

  const classes = $derived(['TreeNodeToolbar', className].filter(Boolean));
</script>

{#if editMode}
  <div class={classes.join(' ')}>
    <BackgoundTools {data} {onupdate} {oncreate} {node} {maxLevels} />
    <Toolbar {data} {maxLevels} {node} {ondelete} {onduplicate} />
  </div>
{/if}

<style lang="scss">
  .TreeNodeToolbar {
    display: inline-flex;
    align-items: center;
    margin: 0 -3px;

    :global(.dodo-ui-Button),
    :global(.dodo-ui-UtilityButton) {
      margin: 0 3px;
    }
  }
</style>
