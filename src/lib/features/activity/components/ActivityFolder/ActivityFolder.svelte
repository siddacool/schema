<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData } from '../../types';
  import { WeekDays } from '../../types/week';
  import { DEFAULT_START_OF_WEEK } from '../../const/week';
  import type { SortOrder } from '$lib/features/shared/types/sort-order';
  import { DEFAULT_DATE_SORT_ORDER } from '../../const/calendar';
  import ActivityManager from './ActivityManager.svelte';
  import { getParentByPath } from '../../utils/get-parent-by-path';

  type Props = {
    class?: string;
    planType: PlanType;
    data: Activity[];
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onbulkcreate?: (data: Activity[]) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    onbulkupdate?: (data: Activity[]) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels?: number;
    editMode?: boolean;
    startOfWeek?: WeekDays;
    dateSortOrder?: SortOrder;
  };

  const {
    class: className = '',
    planType,
    data: dataRaw,
    oncreate,
    onbulkcreate,
    onupdate,
    onbulkupdate,
    ondelete,
    maxLevels = 4,
    editMode = false,
    startOfWeek = DEFAULT_START_OF_WEEK,
    dateSortOrder = DEFAULT_DATE_SORT_ORDER,
  }: Props = $props();

  const classes = $derived(['ActivityFolder', className].filter(Boolean));
  let data = $derived<Activity[]>(dataRaw);
  let updateDataAt = $derived<number>(Date.now());

  async function onupdateMod(value: Activity) {
    const cachedData = [...data];
    const dataIndex = cachedData.findIndex((item) => item._id === value._id);

    cachedData[dataIndex] = {
      ...value,
    };

    data = [...cachedData];
    updateDataAt = Date.now();

    if (onupdate) {
      onupdate(value);
    }
  }

  async function oncreateMod(value: ActivityCreateFormData) {
    const now = Date.now();

    const newNode: Activity = {
      ...value,
      createdAt: now,
      updatedAt: now,
      planId: '',
    };

    data = [...data, newNode];
    updateDataAt = Date.now();

    if (oncreate) {
      oncreate(value);
    }

    const parentId = getParentByPath(value.path);
    const targetParent = data.find((item) => item._id === parentId);

    if (targetParent) {
      onupdateMod({
        ...targetParent,
        expanded: true,
      });
    }
  }

  async function onbulkcreateMod(activity: Activity[]) {
    data = [...data, ...activity];

    updateDataAt = Date.now();

    if (onbulkcreate) {
      onbulkcreate(activity);
    }
  }

  async function onbulkupdateMod(activity: Activity[]) {
    const cachedData = [...data];

    for (let i = 0; i < activity.length; i++) {
      const target = activity[i];
      const dataIndex = cachedData.findIndex((item) => item._id === target._id);

      cachedData[dataIndex] = {
        ...target,
      };
    }

    data = [...cachedData];
    updateDataAt = Date.now();

    if (onbulkupdate) {
      onbulkupdate(activity);
    }
  }

  async function ondeleteMod(value: string) {
    const targetData = data.find((item) => item._id === value);

    if (!targetData) {
      return;
    }

    const cachedData = [...data].filter((item) => item._id !== targetData._id);

    data = [...cachedData];
    updateDataAt = Date.now();

    if (ondelete) {
      ondelete(value);
    }
  }
</script>

<div class={classes.join(' ')}>
  <ActivityManager
    {updateDataAt}
    {data}
    {editMode}
    {startOfWeek}
    {planType}
    oncreate={oncreateMod}
    onbulkcreate={onbulkcreateMod}
    onupdate={onupdateMod}
    onbulkupdate={onbulkupdateMod}
    ondelete={ondeleteMod}
    {maxLevels}
    {dateSortOrder}
  />
</div>
