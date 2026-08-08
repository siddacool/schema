<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import EditActivityForm from '../../EditActivityForm/EditActivityForm.svelte';

  type Props = {
    class?: string;
    data: Activity;
    onupdate?: (data: Activity) => Promise<void>;
  };

  const { class: className = '', data, onupdate }: Props = $props();

  const classes = $derived(['Edit', 'ToolbarAdvancedButton', className].filter(Boolean));

  let open = $state(false);

  function onclick(e: MouseEvent) {
    e.stopPropagation();

    open = true;
  }
</script>

<div class={classes.join(' ')}>
  <Button
    aria-label="Edit details"
    class="EditButton"
    roundness={1}
    title="Edit details"
    compact
    color="neutral"
    size="small"
    {onclick}
    variant="text"
  >
    <Icon icon="material-symbols:edit-outline" />
  </Button>
</div>

<EditActivityForm {onupdate} {data} bind:open mode="update" />

<style lang="scss">
  .Edit {
    :global(.dodo-ui-Button.size--small.EditButton) {
      font-size: 1.3rem;
    }
  }
</style>
