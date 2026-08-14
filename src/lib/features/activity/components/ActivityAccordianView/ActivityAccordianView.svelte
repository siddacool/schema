<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import ActivityGroupContainer from './ActivityGroup/ActivityGroup.svelte';
  import { Accordion } from '@flightlesslabs/dodo-ui-bits';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import { processChildrenExpandClose } from '../ActivityTree/utils/crud/expand';

  type OnChangeFn<T> = (value: T) => void;

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup[];
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
    onbulkupdate?: (data: Activity[], subActivity?: boolean) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    onupdate,
    onbulkupdate,
    ondelete,
    maxLevels,
    editMode,
  }: Props = $props();

  const classes = $derived(['ActivityAccordianView', className].filter(Boolean));

  let accordianExpandedValues = $derived(
    data.filter((item) => item.expanded).map((item) => item._id),
  );

  function toggleAccordianExpanded(newArray: string[]) {
    const added = newArray.filter((item) => !accordianExpandedValues.includes(item));
    const removed = accordianExpandedValues.filter((item) => !newArray.includes(item));

    if (added.length) {
      const targetId = added[0];
      const target = data.find((item) => item._id === targetId);

      if (target && onupdate) {
        onupdate({
          ...target,
          expanded: true,
        });
      }
    } else if (removed.length) {
      const targetId = removed[0];
      const target = data.find((item) => item._id === targetId);

      if (target && onbulkupdate) {
        const dataToUpdate: Activity[] = [
          {
            ...target,
            expanded: false,
          },
        ];

        const children = processChildrenExpandClose(target._id, target.activity);

        if (children.length) {
          dataToUpdate.push(...children);
        }

        onbulkupdate(dataToUpdate);
      }
    }

    accordianExpandedValues = newArray;
  }
</script>

<Accordion
  type="multiple"
  value={accordianExpandedValues}
  onValueChange={toggleAccordianExpanded as OnChangeFn<string[]>}
  class={classes.join(' ')}
>
  {#each data as activityGroup (activityGroup._id)}
    <ActivityGroupContainer
      data={activityGroup}
      {planType}
      {oncreate}
      {onupdate}
      {ondelete}
      {maxLevels}
      {editMode}
      groups={data}
      {onbulkupdate}
    />
  {/each}
</Accordion>
