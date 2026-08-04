<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import type {
    ActivityTreeOnCreate,
    ActivityNodeValue,
    ActivityTreeOnDelete,
  } from '../../ActivityTree.svelte';
  import CreateActivity from './CreateActivity/CreateActivity.svelte';
  import DeleteActivity from './DeleteActivity.svelte';
  import UpdateActivity from './UpdateActivity.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    displayEditor: () => void;
    allowCreate: boolean;
    ondelete?: ActivityTreeOnDelete;
    data: Activity[];
  };

  let { oncreate, value, displayEditor, allowCreate, ondelete, data }: Props = $props();
</script>

<div class="Controls">
  <UpdateActivity onclick={displayEditor} />

  {#if allowCreate}
    <CreateActivity {oncreate} path={value.path} />
  {/if}

  <DeleteActivity {ondelete} {value} {data} />
</div>

<style lang="scss">
  .Controls {
    margin-left: var(--dodo-ui-space);
    display: flex;

    :global(.dodo-ui-Button) {
      margin: 0 4px;
    }
  }
</style>
