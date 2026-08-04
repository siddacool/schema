<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  type Props = {
    onclick: () => void;
  };

  let { onclick }: Props = $props();

  function handleClick(e: MouseEvent) {
    e.stopPropagation();

    onclick();
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

<style lang="scss">
  .UpdateActivity {
    :global(.dodo-ui-Button.size--small.UpdateActivityButton) {
      font-size: 1.3rem;
    }
  }
</style>
