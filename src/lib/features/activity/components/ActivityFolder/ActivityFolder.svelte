<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData, ActivityGroup } from '../../types';
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
  };

  const {
    class: className = '',
    planType,
    data: dataRaw,
    oncreate,
    onupdate,
    ondelete,
    maxLevels = 5,
    editMode = false,
    startOfWeek = DEFAULT_START_OF_WEEK,
    dateSortOrder = DEFAULT_DATE_SORT_ORDER,
  }: Props = $props();

  const classes = $derived(['ActivityFolder', className].filter(Boolean));
  let data = $derived<Activity[]>(dataRaw);

  async function oncreateMain(value: ActivityCreateFormData) {
    const now = Date.now();

    const newHeader: ActivityGroup = {
      ...value,
      createdAt: now,
      updatedAt: now,
      planId: '',
      activity: [],
    };

    data = [...data, newHeader];

    if (oncreate) {
      oncreate(value);
    }
  }

  async function oncreateMod(value: ActivityCreateFormData) {
    const { headerActivityId, ...restProps } = value;

    const path = `${headerActivityId}.${value.path}`;

    if (oncreate) {
      oncreate({
        ...restProps,
        path,
      });
    }
  }

  async function onupdateMod(value: Activity) {
    if (value.headerActivityId) {
      const { headerActivityId, ...restProps } = value;

      const path = `${headerActivityId}.${value.path}`;

      if (onupdate) {
        onupdate({
          ...restProps,
          path,
        });
      }
    } else {
      const cachedData = [...data];
      const dataIndex = cachedData.findIndex((item) => item._id === value._id);

      cachedData[dataIndex] = {
        ...value,
        expanded: true,
      };

      data = [...cachedData];

      if (onupdate) {
        onupdate(value);
      }
    }
  }

  async function ondeleteMod(value: string) {
    const targetData = data.find((item) => item._id === value);

    if (!targetData) {
      return;
    }

    if (!targetData.headerActivityId) {
      const cachedData = [...data].filter((item) => item._id !== targetData._id);

      data = [...cachedData];
    }

    if (ondelete) {
      ondelete(value);
    }
  }
</script>

<div class={classes.join(' ')}>
  <ActivityManager
    {oncreateMain}
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
