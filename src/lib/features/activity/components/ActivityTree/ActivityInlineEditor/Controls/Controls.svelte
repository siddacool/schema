<script lang="ts">
  import type { ActivityNodeValue } from '../../ActivityNodes/ActivityNode/ActivityNode.svelte';
  import type { ActivityTreeOnCreate } from '../../ActivityTree.svelte';
  import CreateActivity from './CreateActivity/CreateActivity.svelte';
  import UpdateActivity from './UpdateActivity.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    showEditor: boolean;
  };

  let { oncreate, value, showEditor = $bindable() }: Props = $props();
</script>

<div class="Controls">
  <UpdateActivity onclick={() => (showEditor = true)} />
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
