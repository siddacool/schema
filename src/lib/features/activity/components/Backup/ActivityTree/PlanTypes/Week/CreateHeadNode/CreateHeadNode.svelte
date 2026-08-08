<script lang="ts">
  import DayPicker from '$lib/features/activity/components/DayPicker/DayPicker.svelte';
  import { daysOptions } from '$lib/features/activity/config/week';
  import type { Activity } from '$lib/features/activity/types';
  import { WeekDays } from '$lib/features/activity/types/week';
  import type { ActivityTreeOnCreate } from '../../../ActivityTree.svelte';
  import { nanoid } from 'nanoid/non-secure';

  type Props = {
    oncreate?: ActivityTreeOnCreate;
    startOfWeek: WeekDays;
    data: Activity[];
  };

  let { oncreate, startOfWeek, data }: Props = $props();
  const headings = $derived(data.filter((item) => item._id === item.path));
  const excludeList = $derived(headings.map((item) => item.description as WeekDays));
  const show = $derived(excludeList.length < daysOptions.length);

  function onclick(value: WeekDays) {
    const id = nanoid();

    if (oncreate) {
      oncreate({
        description: value,
        _id: id,
        path: id,
      });
    }
  }
</script>

{#if show}
  <div class="CreateHeadNode">
    <p>Click to add a day</p>
    <DayPicker startFrom={startOfWeek} {onclick} {excludeList} />
  </div>
{/if}

<style lang="scss">
  .CreateHeadNode {
    margin-top: calc(var(--dodo-ui-space) * 2);

    p {
      margin-top: 0;
      font-size: 1.2rem;
      margin-bottom: calc(var(--dodo-ui-space) * 0.5);
    }
  }
</style>
