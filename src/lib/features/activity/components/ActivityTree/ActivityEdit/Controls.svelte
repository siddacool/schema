<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import type { ActivityNodeValue, ActivityTreeOnDelete } from '../ActivityTree.svelte';
  import DeleteActivity from '../ActivityControls/DeleteActivity.svelte';

  type Props = {
    onsubmit: (e: MouseEvent) => void;
    onclear: (e: MouseEvent) => void;
    ondelete?: ActivityTreeOnDelete;
    disabled: boolean;
    value: ActivityNodeValue;
  };

  const { disabled, onsubmit, onclear, ondelete, value }: Props = $props();
</script>

<div class="Controls">
  <Button
    aria-label="Save"
    class="ActivityEditSaveButton"
    roundness={1}
    title="Save"
    compact
    color="safe"
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
    onclick={onclear}
    variant="text"
    {disabled}
  >
    <Icon icon="material-symbols:close-rounded" />
  </Button>

  <DeleteActivity {ondelete} {value} />
</div>

<style lang="scss">
  .Controls {
    margin: 0 -6px;
    display: flex;

    :global(.DeleteActivity) {
      margin-left: auto;
    }

    :global(.dodo-ui-Button) {
      margin: 0 6px;
    }

    :global(.dodo-ui-Button.size--normal.ActivityEditSaveButton) {
      font-size: 1.6rem;
    }

    :global(.dodo-ui-Button.size--normal.ActivityEditClearButton) {
      font-size: 1.3rem;
    }
  }
</style>
