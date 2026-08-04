<script lang="ts">
  import type { ActivityTreeOnCreate, ActivityNodeValue } from '../../ActivityTree.svelte';
  import CreateActivity from './CreateActivity/CreateActivity.svelte';
  import UpdateActivity from './UpdateActivity.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    displayEditor: () => void;
  };

  let { oncreate, value, displayEditor }: Props = $props();
</script>

<div class="Controls">
  <UpdateActivity onclick={displayEditor} />
  <CreateActivity {oncreate} path={value.path} />
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
