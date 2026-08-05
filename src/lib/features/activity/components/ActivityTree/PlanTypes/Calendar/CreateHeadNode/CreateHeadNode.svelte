<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import { nanoid } from 'nanoid/non-secure';
  import { parseDate, type DateValue } from '@internationalized/date';
  import { createDate } from '$lib/utils/date-time/createDate';
  import { Button } from '@flightlesslabs/dodo-ui';
  import type { ActivityTreeOnCreate } from '../../../ActivityTree.svelte';
  import { SortOrder } from '$lib/share/types/sort-order';
  import { groupActivityCalendar } from '$lib/features/activity/utils/plan-type-groups/group-activity-by-calendar';
  import SelectiveDatePicker from '$lib/features/activity/components/SelectiveDatePicker/SelectiveDatePicker.svelte';

  type Props = {
    oncreate?: ActivityTreeOnCreate;
    data: Activity[];
  };

  let { oncreate, data }: Props = $props();
  const headings = $derived(data.filter((item) => item._id === item.path));
  const sortedHeadings = $derived(groupActivityCalendar(headings, SortOrder.DESCENDING));
  const lastDate = $derived(
    sortedHeadings[0]?.description || createDate().subtract(1, 'day').format('YYYY-MM-DD'),
  );
  const nextDate = $derived(createDate(lastDate).add(1, 'day').format('YYYY-MM-DD'));
  let date = $derived<DateValue>(parseDate(nextDate));

  function onclick() {
    const id = nanoid();

    if (oncreate) {
      oncreate({
        description: date.toString(),
        _id: id,
        path: id,
      });
    }
  }
</script>

<div class="CreateHeadNode">
  <div class="container">
    <SelectiveDatePicker bind:value={date} {data} />
    <Button roundness={1} color="primary" {onclick} class="AddButton">Add date</Button>
  </div>
</div>

<style lang="scss">
  .CreateHeadNode {
    margin-top: calc(var(--dodo-ui-space) * 2);

    .container {
      display: flex;
      max-width: 300px;
    }

    :global(.AddButton) {
      margin-left: calc(var(--dodo-ui-space) * 2);
    }

    :global(.dodo-ui-InputEnclosure) {
      flex: 1;
    }
  }
</style>
