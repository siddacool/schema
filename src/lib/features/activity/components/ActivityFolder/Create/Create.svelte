<script lang="ts">
  import type { ActivityCreateFormData, ActivityGroup } from '$lib/features/activity/types';
  import type { WeekDays } from '$lib/features/activity/types/week';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { Button } from '@flightlesslabs/dodo-ui';

  import AddActivityForm from '../AddActivityForm/AddActivityForm.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup[];
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    editMode: boolean;
    startOfWeek: WeekDays;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    editMode,
    startOfWeek,
  }: Props = $props();

  const classes = $derived(['ActivityFolderMainCreate', className].filter(Boolean));

  let open = $state(false);
</script>

{#if editMode}
  <div class={classes.join(' ')}>
    <Button id="ActivityFolderMainCreateButton" onclick={() => (open = true)}>Add</Button>
  </div>
{/if}

{#if planType === PlanType.SEQUENCE}
  <AddActivityForm {oncreate} bind:open data={undefined} />
{:else}
  yo
{/if}
