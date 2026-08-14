<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData, ActivityGroup } from '../../types';
  import { WeekDays } from '../../types/week';
  import { groupActivity } from '../../utils/group-activity/group-activity';
  import type { SortOrder } from '$lib/features/shared/types/sort-order';
  import Create from './Create/Create.svelte';
  import ActivityAccordianView from '../ActivityAccordianView/ActivityAccordianView.svelte';

  type Props = {
    planType: PlanType;
    data: Activity[];
    updateDataAt: number;
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onbulkcreate?: (data: Activity[], subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
    onbulkupdate?: (data: Activity[], subActivity?: boolean) => Promise<void>;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    startOfWeek: WeekDays;
    dateSortOrder: SortOrder;
  };

  const {
    planType,
    data: dataBase,
    oncreate,
    onbulkcreate,
    onupdate,
    onbulkupdate,
    ondelete,
    maxLevels,
    editMode,
    startOfWeek,
    dateSortOrder,
    updateDataAt,
  }: Props = $props();

  let data = $state<ActivityGroup[]>([]);

  $effect(() => {
    if (updateDataAt || dataBase || planType || startOfWeek || dateSortOrder) {
      console.log('debug:', 'data update');

      data = groupActivity(dataBase, planType, { startOfWeek, dateSortOrder });
    }
  });
</script>

<Create {oncreate} {data} {editMode} {planType} />

<ActivityAccordianView
  {onbulkcreate}
  {planType}
  {oncreate}
  {onupdate}
  {ondelete}
  {maxLevels}
  {editMode}
  {data}
  {onbulkupdate}
/>
