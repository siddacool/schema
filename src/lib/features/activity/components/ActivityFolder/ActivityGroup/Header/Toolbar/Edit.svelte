<script lang="ts">
  import type { ActivityGroup, Activity } from '$lib/features/activity/types';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  type Props = {
    class?: string;
    data: ActivityGroup;
    onupdate?: (data: Activity) => Promise<void>;
  };

  const { class: className = '', data, onupdate }: Props = $props();

  $effect(() => {
    console.log('debug:', 'data', data);
  });

  const classes = $derived(['Edit', className].filter(Boolean));

  function handleClick() {}
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
    onclick={handleClick}
    variant="text"
  >
    <Icon icon="material-symbols:edit-outline" />
  </Button>
</div>

<style lang="scss">
  .Edit {
    :global(.dodo-ui-Button.size--small.EditButton) {
      font-size: 1.3rem;
    }
  }
</style>
