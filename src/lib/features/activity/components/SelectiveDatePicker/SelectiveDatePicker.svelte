<script lang="ts">
  import { DatePicker, type DatePickerFormat } from '@flightlesslabs/dodo-ui-date';
  import { type DateValue } from '@internationalized/date';
  import type { Activity } from '../../types';
  import { dateFormatOptions } from '$lib/features/settings/config';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { DEFAULT_DATE_FORMAT } from '$lib/features/settings/const';

  type Props = {
    class?: string;
    disabled?: boolean;
    value: DateValue;
    data: Activity[];
  };

  let { class: className = '', disabled, value = $bindable(), data }: Props = $props();

  const headings = $derived(data.filter((item) => item._id === item.path));
  const excludeDates = $derived(headings.map((item) => item.description));

  const classes = $derived(['SelectiveDatePicker', className].filter(Boolean));

  const dateFormat = $derived(
    dateFormatOptions.find((item) => item.value === settingsStore.settings.dateFormat)
      ?.valueDatePickerFormat || (DEFAULT_DATE_FORMAT as DatePickerFormat),
  );

  function isDateUnavailable(date: DateValue): boolean {
    const dateString = date.toString();

    if (excludeDates.includes(dateString)) {
      return true;
    }

    return false;
  }
</script>

<div class={classes.join(' ')}>
  <DatePicker bind:value {isDateUnavailable} preventDeselect {disabled} {dateFormat} />
</div>

<style>
  .SelectiveDatePicker {
    :global([data-unavailable]) {
      color: var(--dodo-color-neutral-400);
      background-color: initial;

      &:hover {
        background-color: initial;
        border-color: transparent;
      }
    }
  }
</style>
