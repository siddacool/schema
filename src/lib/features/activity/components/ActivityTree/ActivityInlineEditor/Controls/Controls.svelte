<script lang="ts">
  import CreateActivity from '../../ActivityControls/CreateActivity/CreateActivity.svelte';
  import DeleteActivity from '../../ActivityControls/DeleteActivity.svelte';
  import type {
    ActivityTreeOnCreate,
    ActivityNodeValue,
    ActivityTreeOnDelete,
  } from '../../ActivityTree.svelte';
  import UpdateActivity from './UpdateActivity.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    displayEditor: () => void;
    allowCreate: boolean;
    ondelete?: ActivityTreeOnDelete;
  };

  let { oncreate, value, displayEditor, allowCreate, ondelete }: Props = $props();
</script>

<div class="Controls">
  <UpdateActivity onclick={displayEditor} />

  {#if allowCreate}
    <CreateActivity {oncreate} path={value.path} />
  {/if}

  <DeleteActivity {ondelete} {value} />
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
