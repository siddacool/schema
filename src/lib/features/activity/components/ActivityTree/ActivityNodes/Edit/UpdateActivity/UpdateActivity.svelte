<script lang="ts">
  import { Button, UtilityButton } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import type { ActivityTreeOnUpdate } from '../../../ActivityTree.svelte';
  import UpdateActivityModal from './UpdateActivityModal.svelte';
  import type { Activity } from '$lib/features/activity/types';

  type Props = {
    onupdate?: ActivityTreeOnUpdate;
    data: Activity;
  };

  let { onupdate, data }: Props = $props();
  let open = $state(false);

  function handleClick(e: MouseEvent) {
    e.stopPropagation();

    open = true;
  }
</script>

<div class="UpdateActivity">
  <Button
    aria-label="Edit activity"
    class="UpdateActivityButton"
    roundness={1}
    title="Edit activity"
    compact
    color="neutral"
    size="small"
    onclick={handleClick}
    background="none"
    variant="text"
  >
    <Icon icon="material-symbols:edit-outline" />
  </Button>
</div>

<UpdateActivityModal bind:open {onupdate} {data} />

<style lang="scss">
  .UpdateActivity {
    :global(.dodo-ui-Button.size--small.UpdateActivityButton) {
      font-size: 1.3rem;
    }
  }
</style>
