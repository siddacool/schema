<script lang="ts">
  import type { ActivityTreeOnCreate } from '../../../ActivityTree.svelte';
  import CreateActivity from './CreateActivity/CreateActivity.svelte';

  type Props = {
    oncreate?: ActivityTreeOnCreate;
  };

  let { oncreate }: Props = $props();
</script>

<div class="CreateHeadNode">
  <CreateActivity path={undefined} {oncreate} />
</div>

<style lang="scss">
  .CreateHeadNode {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-top: calc(var(--dodo-ui-space) * 2);
  }
</style>
