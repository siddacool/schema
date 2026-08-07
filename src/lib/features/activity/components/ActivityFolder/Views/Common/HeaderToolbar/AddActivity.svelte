<script lang="ts">
  import EditActivityForm from '$lib/features/activity/components/ActivityFolder/EditActivityForm/EditActivityForm.svelte';
  import type { ActivityCreateFormData, Activity } from '$lib/features/activity/types';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  type Props = {
    class?: string;
    data: Activity;
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
  };

  const { class: className = '', data, oncreate }: Props = $props();

  const classes = $derived(['AddActivity', className].filter(Boolean));

  let open = $state(false);

  async function oncreateMod(data: ActivityCreateFormData) {
    if (oncreate) {
      oncreate(data, true);
    }
  }
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
    onclick={() => (open = true)}
    variant="solid"
  >
    <Icon icon="material-symbols:add-rounded" />
  </Button>
</div>

<EditActivityForm oncreate={oncreateMod} {data} bind:open mode="create" />

<style lang="scss">
  .AddActivity {
    :global(.dodo-ui-Button.size--small.AddActivityButton) {
      font-size: 1.5rem;
    }
  }
</style>
