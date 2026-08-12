<script lang="ts">
  import type { Activity, ActivityGroup } from '$lib/features/activity/types';
  import DropdownTool from './DropdownTool.svelte';
  import EditActivity from './Options/EditActivity.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import AddChild from './Options/AddChild.svelte';
  import Delete from './Options/Delete.svelte';

  type Props = {
    planType: PlanType;
    groups: ActivityGroup[];
    data: Activity;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
  };

  const { planType, groups, data, ondelete }: Props = $props();
</script>

<DropdownTool>
  <AddChild {data} />
  <EditActivity {planType} {groups} {data} />
  <Delete {data} {ondelete} />
</DropdownTool>
