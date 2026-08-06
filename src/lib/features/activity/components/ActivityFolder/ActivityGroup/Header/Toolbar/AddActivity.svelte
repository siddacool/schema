<script lang="ts">
  import type { ActivityGroup, ActivityCreateFormData } from '$lib/features/activity/types';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  type Props = {
    class?: string;
    data: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
  };

  const { class: className = '', data, oncreate }: Props = $props();

  $effect(() => {
    console.log('debug:', 'data', data);
  });

  const classes = $derived(['AddActivity', className].filter(Boolean));

  function handleClick() {}
</script>

<div class={classes.join(' ')}>
  <Button
    aria-label="Add new activity"
    class="AddActivityButton"
    roundness={1}
    title="Add new activity"
    compact
    color="primary"
    size="small"
    onclick={handleClick}
    variant="solid"
  >
    <Icon icon="material-symbols:add-rounded" />
  </Button>
</div>

<style lang="scss">
  .AddActivity {
    :global(.dodo-ui-Button.size--small.AddActivityButton) {
      font-size: 1.5rem;
    }
  }
</style>
