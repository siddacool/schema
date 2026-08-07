<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData } from '../../types';
  import { WeekDays } from '../../types/week';
  import { groupActivity } from '../../utils/group-activity/group-activity';
  import type { SortOrder } from '$lib/features/shared/types/sort-order';
  import Create from './Create/Create.svelte';
  import AccordianView from './Views/AccordianView/AccordianView.svelte';

  type Props = {
    planType: PlanType;
    data: Activity[];
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
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
    onupdate,
    ondelete,
    maxLevels,
    editMode,
    startOfWeek,
    dateSortOrder,
  }: Props = $props();

  const data = $derived(groupActivity(dataBase, planType, { startOfWeek, dateSortOrder }));
</script>

<Create {oncreate} {data} {editMode} {startOfWeek} {planType} />

<AccordianView
  {planType}
  {oncreate}
  {onupdate}
  {ondelete}
  {maxLevels}
  {editMode}
  {startOfWeek}
  {data}
/>
