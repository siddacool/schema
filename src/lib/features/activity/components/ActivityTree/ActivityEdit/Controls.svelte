<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  type Props = {
    onsubmit: (e: MouseEvent) => void;
    onclear: (e: MouseEvent) => void;
    disabled: boolean;
  };

  const { disabled, onsubmit, onclear }: Props = $props();
</script>

<div class="Controls">
  <Button
    aria-label="Save"
    class="ActivityEditSaveButton"
    roundness={1}
    title="Save"
    compact
    color="safe"
    size="small"
    onclick={onsubmit}
    variant="text"
    {disabled}
  >
    <Icon icon="material-symbols:check-rounded" />
  </Button>

  <Button
    aria-label="Clear"
    class="ActivityEditClearButton"
    roundness={1}
    title="Clear"
    compact
    color="neutral"
    size="small"
    onclick={onclear}
    variant="text"
    {disabled}
  >
    <Icon icon="material-symbols:close-rounded" />
  </Button>
</div>

<style lang="scss">
  .Controls {
    margin-left: var(--dodo-ui-space);
    display: flex;

    :global(.dodo-ui-Button) {
      margin: 0 4px;
    }

    :global(.dodo-ui-Button.size--small.ActivityEditSaveButton) {
      font-size: 1.6rem;
    }

    :global(.dodo-ui-Button.size--small.ActivityEditClearButton) {
      font-size: 1.3rem;
    }
  }
</style>
