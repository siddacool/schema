<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData } from '../../types';
  import { WeekDays } from '../../types/week';
  import { DEFAULT_START_OF_WEEK } from '../../const/week';
  import type { SortOrder } from '$lib/features/shared/types/sort-order';
  import { DEFAULT_DATE_SORT_ORDER } from '../../const/calendar';
  import ActivityManager from './ActivityManager.svelte';
  import { debugLog } from '$lib/utils/debug-log';
  import { getParentByPath } from '../../utils/get-parent-by-path';
  import Tracker from './Tracker/Tracker.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: Activity[];
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    onbulkupdate?: (data: Activity[]) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels?: number;
    editMode?: boolean;
    startOfWeek?: WeekDays;
    dateSortOrder?: SortOrder;
    debug?: boolean;
    track?: boolean;
    id: string;
  };

  const {
    class: className = '',
    planType,
    data: dataRaw,
    oncreate,
    onupdate,
    onbulkupdate,
    ondelete,
    maxLevels = 4,
    editMode = false,
    startOfWeek = DEFAULT_START_OF_WEEK,
    dateSortOrder = DEFAULT_DATE_SORT_ORDER,
    debug = false,
    track = true,
    id,
  }: Props = $props();

  const classes = $derived(['ActivityFolder', className].filter(Boolean));
  let data = $derived<Activity[]>(dataRaw);
  let miniDatabase = $derived<Activity[]>(dataRaw);
  let trackedActivity = $derived<Activity[] | undefined>(undefined);

  function updatetrackedActivity(value: Activity[] | undefined) {
    trackedActivity = value;
  }

  function syncMiniDatabase() {
    data = [...miniDatabase];

    debugLog(debug, 'syncMiniDatabase');
  }

  async function onupdateMod(value: Activity, subActivity?: boolean) {
    const cachedData = [...miniDatabase];
    const dataIndex = cachedData.findIndex((item) => item._id === value._id);

    cachedData[dataIndex] = {
      ...value,
    };

    miniDatabase = [...cachedData];

    if (!subActivity) {
      syncMiniDatabase();
    }

    if (onupdate) {
      onupdate(value);
    }
  }

  async function oncreateMod(value: ActivityCreateFormData, subActivity?: boolean) {
    const now = Date.now();

    const newNode: Activity = {
      ...value,
      createdAt: now,
      updatedAt: now,
      planId: '',
    };

    miniDatabase = [...miniDatabase, newNode];

    if (!subActivity) {
      syncMiniDatabase();
    }

    if (oncreate) {
      oncreate(value);
    }

    const parentId = getParentByPath(value.path);
    const targetParent = miniDatabase.find((item) => item._id === parentId);

    if (targetParent) {
      onupdateMod({
        ...targetParent,
        expanded: true,
      });
    }
  }

  async function onbulkupdateMod(activity: Activity[], subActivity?: boolean) {
    const cachedData = [...miniDatabase];

    for (let i = 0; i < activity.length; i++) {
      const target = activity[i];
      const dataIndex = cachedData.findIndex((item) => item._id === target._id);

      cachedData[dataIndex] = {
        ...target,
      };
    }

    miniDatabase = [...cachedData];

    if (!subActivity) {
      syncMiniDatabase();
    }

    if (onbulkupdate) {
      onbulkupdate(activity);
    }
  }

  async function ondeleteMod(value: string, subActivity?: boolean) {
    if (subActivity) {
      if (ondelete) {
        ondelete(value);
      }

      return;
    }

    const targetData = miniDatabase.find((item) => item._id === value);

    if (!targetData) {
      return;
    }

    const cachedData = [...miniDatabase].filter((item) => item._id !== targetData._id);

    miniDatabase = [...cachedData];

    if (!subActivity) {
      syncMiniDatabase();
    }

    if (ondelete) {
      ondelete(value);
    }
  }

  $effect(() => {
    if (
      planType ||
      maxLevels ||
      maxLevels === 0 ||
      editMode ||
      editMode === false ||
      startOfWeek ||
      dateSortOrder ||
      debug ||
      debug === false ||
      track ||
      track === false
    ) {
      syncMiniDatabase();
    }
  });
</script>

<div class={classes.join(' ')} {id}>
  {#if track}
    <Tracker
      {planType}
      data={miniDatabase}
      onchange={updatetrackedActivity}
      {startOfWeek}
      {dateSortOrder}
    />
  {/if}
  <ActivityManager
    {data}
    {editMode}
    {startOfWeek}
    {planType}
    oncreate={oncreateMod}
    onupdate={onupdateMod}
    onbulkupdate={onbulkupdateMod}
    ondelete={ondeleteMod}
    {maxLevels}
    {dateSortOrder}
    {trackedActivity}
    {track}
  />
</div>
