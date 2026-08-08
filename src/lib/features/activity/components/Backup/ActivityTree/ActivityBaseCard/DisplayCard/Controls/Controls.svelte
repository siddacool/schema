<script lang="ts">
  import CreateActivity from './CreateActivity/CreateActivity.svelte';
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnSelect,
  } from '../../../ActivityTree.svelte';

  import UpdateActivity from './UpdateActivity.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    displayEditor: () => void;
    allowCreate: boolean;
    onselect: ActivityTreeOnSelect;
  };

  let { oncreate, value, displayEditor, allowCreate, onselect }: Props = $props();
</script>

<div class="Controls">
  <UpdateActivity onclick={displayEditor} />

  {#if allowCreate}
    <CreateActivity {oncreate} path={value.path} {onselect} />
  {/if}
</div>

<style lang="scss">
  .Controls {
    display: flex;
    margin: 0 -6px;

    :global(.dodo-ui-Button) {
      margin: 0 6px;
    }
  }
</style>
