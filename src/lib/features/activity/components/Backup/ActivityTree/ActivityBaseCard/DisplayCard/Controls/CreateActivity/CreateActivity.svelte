<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import CreateActivityModal from './CreateActivityModal.svelte';
  import type { ActivityTreeOnCreate, ActivityTreeOnSelect } from '../../../../ActivityTree.svelte';

  type Props = {
    path: string | undefined;
    oncreate?: ActivityTreeOnCreate;
    onselect: ActivityTreeOnSelect;
  };

  let { oncreate, path, onselect }: Props = $props();
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
    size="normal"
    onclick={handleClick}
  >
    <Icon icon="material-symbols:add-rounded" />
  </Button>
</div>

<CreateActivityModal bind:open {path} {oncreate} {onselect} />

<style lang="scss">
  .CreateActivity {
    :global(.dodo-ui-Button.size--normal.CreateActivityButton) {
      font-size: 1.5rem;
    }
  }
</style>
