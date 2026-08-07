<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData } from '../../types';
  import { WeekDays } from '../../types/week';
  import { DEFAULT_START_OF_WEEK } from '../../const/week';
  import type { SortOrder } from '$lib/features/shared/types/sort-order';
  import { DEFAULT_DATE_SORT_ORDER } from '../../const/calendar';
  import ActivityManager from './ActivityManager.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: Activity[];
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels?: number;
    editMode?: boolean;
    startOfWeek?: WeekDays;
    dateSortOrder?: SortOrder;
    syncData?: () => Promise<void>;
  };

  const {
    class: className = '',
    planType,
    data: dataRaw,
    oncreate,
    onupdate,
    ondelete,
    maxLevels = 4,
    editMode = false,
    startOfWeek = DEFAULT_START_OF_WEEK,
    dateSortOrder = DEFAULT_DATE_SORT_ORDER,
    syncData,
  }: Props = $props();

  const classes = $derived(['ActivityFolder', className].filter(Boolean));
  let data = $derived<Activity[]>(dataRaw);

  async function oncreateMod(value: ActivityCreateFormData, subActivity?: boolean) {
    if (subActivity) {
      if (oncreate) {
        oncreate(value);
      }

      return;
    }

    const now = Date.now();
    const newNode: Activity = {
      ...value,
      createdAt: now,
      updatedAt: now,
      planId: '',
    };

    data = [...data, newNode];

    if (oncreate) {
      await oncreate(value);
    }

    if (syncData) {
      await syncData();
    }
  }

  async function onupdateMod(value: Activity, subActivity?: boolean) {
    if (subActivity) {
      if (onupdate) {
        onupdate(value);
      }

      return;
    }

    const cachedData = [...data];
    const dataIndex = cachedData.findIndex((item) => item._id === value._id);

    cachedData[dataIndex] = {
      ...value,
    };

    data = [...cachedData];

    if (onupdate) {
      await onupdate(value);
    }

    if (syncData) {
      await syncData();
    }
  }

  async function ondeleteMod(value: string, subActivity?: boolean) {
    if (subActivity) {
      if (ondelete) {
        ondelete(value);
      }

      return;
    }

    const targetData = data.find((item) => item._id === value);

    if (!targetData) {
      return;
    }

    const cachedData = [...data].filter((item) => item._id !== targetData._id);

    data = [...cachedData];

    if (ondelete) {
      await ondelete(value);
    }

    if (syncData) {
      await syncData();
    }
  }
</script>

<div class={classes.join(' ')}>
  <ActivityManager
    {data}
    {editMode}
    {startOfWeek}
    {planType}
    oncreate={oncreateMod}
    onupdate={onupdateMod}
    ondelete={ondeleteMod}
    {maxLevels}
    {dateSortOrder}
  />
</div>
