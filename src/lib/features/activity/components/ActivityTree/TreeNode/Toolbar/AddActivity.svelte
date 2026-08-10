<script lang="ts">
  import type { ActivityCreateFormData, Activity } from '$lib/features/activity/types';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import EditActivityForm from '../../EditActivityForm/EditActivityForm.svelte';
  import type { ActivityTreeNodeValue } from '../../types';

  type Props = {
    class?: string;
    data: Activity;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    maxLevels: number;
    node: ActivityTreeNodeValue;
  };

  const { class: className = '', data, oncreate, maxLevels, node }: Props = $props();

  const classes = $derived(['AddActivity', className].filter(Boolean));
  const show = $derived(node.level && node.level <= maxLevels);

  let open = $state(false);

  function onclick(e: MouseEvent) {
    e.stopPropagation();

    open = true;
  }
</script>

{#if show}
  <div class={classes.join(' ')}>
    <Button
      aria-label="Add new activity"
      class="AddActivityButton"
      roundness={1}
      title="Add new activity"
      compact
      color="primary"
      {onclick}
      variant="solid"
    >
      <Icon icon="material-symbols:add-rounded" />
    </Button>
  </div>
{/if}

<EditActivityForm mode="create" {oncreate} {data} bind:open />

<style lang="scss">
  .AddActivity {
    :global(.dodo-ui-Button.size--normal.AddActivityButton) {
      font-size: 1.8rem;
    }
  }
</style>
