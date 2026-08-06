<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData, ActivityGroup } from '../../types';
  import { WeekDays } from '../../types/week';
  import { DEFAULT_START_OF_WEEK } from '../../const/week';
  import ActivityGroupContainer from './ActivityGroup/ActivityGroup.svelte';
  import { Accordion } from '@flightlesslabs/dodo-ui-bits';
  import { groupActivity } from '../../utils/group-activity/group-activity';
  import type { SortOrder } from '$lib/features/shared/types/sort-order';
  import { DEFAULT_DATE_SORT_ORDER } from '../../const/calendar';
  import Create from './Create/Create.svelte';
  type OnChangeFn<T> = (value: T) => void;

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
  let dataBase = $derived<Activity[]>(dataRaw);
  const data = $derived(groupActivity(dataBase, planType, { startOfWeek, dateSortOrder }));
  let accordianExpandedValues = $derived(
    data.filter((item) => item.expanded).map((item) => item._id),
  );

  function toggleAccordianExpanded(newArray: string[]) {
    const added = newArray.filter((item) => !accordianExpandedValues.includes(item));
    const removed = accordianExpandedValues.filter((item) => !newArray.includes(item));

    if (added.length) {
      const targetId = added[0];
      const target = dataBase.find((item) => item._id === targetId);

      if (target && onupdate) {
        onupdate({
          ...target,
          expanded: true,
        });
      }
    } else if (removed.length) {
      const targetId = removed[0];
      const target = dataBase.find((item) => item._id === targetId);

      if (target && onupdate) {
        onupdate({
          ...target,
          expanded: false,
        });
      }
    }

    accordianExpandedValues = newArray;
  }

  async function oncreateMain(value: ActivityCreateFormData) {
    const now = Date.now();

    const newHeader: ActivityGroup = {
      ...value,
      createdAt: now,
      updatedAt: now,
      planId: '',
      activity: [],
      expanded: true,
    };

    dataBase.push(newHeader);

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
      const cachedData = [...dataBase];
      const dataIndex = cachedData.findIndex((item) => item._id === value._id);

      cachedData[dataIndex] = {
        ...value,
        expanded: true,
      };

      dataBase = [...cachedData];

      if (onupdate) {
        onupdate(value);
      }
    }
  }

  async function ondeleteMod(value: string) {
    const targetData = dataBase.find((item) => item._id === value);

    if (!targetData) {
      return;
    }

    if (!targetData.headerActivityId) {
      const cachedData = [...dataBase].filter((item) => item._id !== targetData._id);

      dataBase = [...cachedData];
    }

    if (ondelete) {
      ondelete(value);
    }
  }
</script>

<div class={classes.join(' ')}>
  <Create oncreate={oncreateMain} {data} {editMode} {startOfWeek} {planType} />
  <Accordion
    type="multiple"
    value={accordianExpandedValues}
    onValueChange={toggleAccordianExpanded as OnChangeFn<string[]>}
  >
    {#each data as activityGroup (activityGroup._id)}
      <ActivityGroupContainer
        data={activityGroup}
        {planType}
        oncreate={oncreateMod}
        onupdate={onupdateMod}
        ondelete={ondeleteMod}
        {maxLevels}
        {editMode}
        {startOfWeek}
      />
    {/each}
  </Accordion>
</div>
