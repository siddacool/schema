<script lang="ts">
  import type {
    ActivityGroup,
    ActivityCreateFormData,
    Activity,
  } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import AddActivity from './AddActivity.svelte';
  import Delete from './Delete.svelte';
  import Edit from './Edit/Edit.svelte';

  type Props = {
    planType: PlanType;
    class?: string;
    data: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    editMode: boolean;
  };

  const {
    class: className = '',
    data,
    oncreate,
    onupdate,
    ondelete,
    editMode,
    planType,
  }: Props = $props();

  $effect(() => {
    console.log('debug:', 'data', data);
  });

  const classes = $derived(['Toolbar', className].filter(Boolean));
</script>

{#if editMode}
  <div class={classes.join(' ')}>
    <Edit {data} {onupdate} {planType} />
    <Delete {data} {ondelete} />
    <AddActivity {data} {oncreate} />
  </div>
{/if}

<style lang="scss">
  .Toolbar {
    display: inline-flex;
    align-items: center;
    margin: 0 -6px;

    :global(.dodo-ui-Button),
    :global(.dodo-ui-UtilityButton) {
      margin: 0 6px;
    }
  }
</style>
