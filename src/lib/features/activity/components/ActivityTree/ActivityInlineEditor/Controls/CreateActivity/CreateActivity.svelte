<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import CreateActivityModal from './CreateActivityModal.svelte';
  import type { ActivityTreeOnCreate } from '../../../ActivityTree.svelte';

  type Props = {
    path: string | undefined;
    oncreate?: ActivityTreeOnCreate;
  };

  let { oncreate, path }: Props = $props();
  let open = $state(false);

  function handleClick(e: MouseEvent) {
    e.stopPropagation();

    open = true;
  }
</script>

<div class="CreateActivity">
  <Button
    aria-label="Create activity"
    class="CreateActivityButton"
    roundness={1}
    title="Create activity"
    compact
    color="primary"
    size="small"
    onclick={handleClick}
    variant="text"
    background="none"
  >
    <Icon icon="material-symbols:add-rounded" />
  </Button>
</div>

<CreateActivityModal bind:open {path} {oncreate} />

<style lang="scss">
  .CreateActivity {
    :global(.dodo-ui-Button.size--small.CreateActivityButton) {
      font-size: 1.4rem;
    }
  }
</style>
