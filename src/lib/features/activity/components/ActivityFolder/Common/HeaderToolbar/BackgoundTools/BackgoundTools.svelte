<script lang="ts">
  import type {
    ActivityGroup,
    ActivityCreateFormData,
    Activity,
  } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import AddActivity from './AddActivity.svelte';
  import Edit from './Edit/Edit.svelte';

  type Props = {
    planType: PlanType;
    data: Activity;
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
    groups: ActivityGroup[];
  };

  const { data, oncreate, onupdate, planType, groups }: Props = $props();
</script>

<AddActivity {data} {oncreate} />
<Edit {data} {onupdate} {planType} {groups} />
