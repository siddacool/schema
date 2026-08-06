<script lang="ts">
  import type {
    ActivityGroup,
    ActivityCreateFormData,
    Activity,
  } from '$lib/features/activity/types';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import AddActivityForm from '../../../../AddActivityForm/AddActivityForm.svelte';

  type Props = {
    class?: string;
    data: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
  };

  const { class: className = '', data, oncreate }: Props = $props();

  const classes = $derived(['AddActivity', className].filter(Boolean));

  let open = $state(false);

  function onclick(e: MouseEvent) {
    e.stopPropagation();

    open = true;
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
    {onclick}
    variant="solid"
  >
    <Icon icon="material-symbols:add-rounded" />
  </Button>
</div>

<AddActivityForm {oncreate} data={data as Activity} bind:open />

<style lang="scss">
  .AddActivity {
    :global(.dodo-ui-Button.size--small.AddActivityButton) {
      font-size: 1.5rem;
    }
  }
</style>
