<script lang="ts">
  import CreateActivity from '../../ActivityControls/CreateActivity/CreateActivity.svelte';
  import type { ActivityTreeOnCreate, ActivityNodeValue } from '../../ActivityTree.svelte';
  import UpdateActivity from './UpdateActivity.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    displayEditor: () => void;
    allowCreate: boolean;
  };

  let { oncreate, value, displayEditor, allowCreate }: Props = $props();
</script>

<div class="Controls">
  <UpdateActivity onclick={displayEditor} />

  {#if allowCreate}
    <CreateActivity {oncreate} path={value.path} />
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
