<script lang="ts">
  import { UtilityButton } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import type { ActivityTreeOnCreate } from '../../../ActivityTree.svelte';
  import CreateActivityModal from './CreateActivityModal.svelte';

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
  <UtilityButton
    aria-label="Create activity"
    class="CreateActivityButton"
    roundness={1}
    title="Create activity"
    compact
    color="neutral"
    outline
    size="small"
    onclick={handleClick}
  >
    <Icon icon="material-symbols:add-rounded" />
  </UtilityButton>
</div>

<CreateActivityModal bind:open {path} {oncreate} />

<style lang="scss">
  .CreateActivity {
    :global(.dodo-ui-UtilityButton.size--small.CreateActivityButton) {
      font-size: 1.4rem;
    }
  }
</style>
