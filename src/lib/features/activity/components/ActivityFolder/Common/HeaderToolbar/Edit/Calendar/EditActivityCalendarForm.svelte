<script lang="ts">
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import { getSuggestedDate } from '$lib/features/activity/utils/get-suggested-date';
  import { getTakenDates } from '$lib/features/activity/utils/get-taken-dates';
  import { dateFormatOptions } from '$lib/features/settings/config';
  import { DEFAULT_DATE_FORMAT } from '$lib/features/settings/const';
  import { settingsStore } from '$lib/features/settings/store/main.svelte';
  import { Button, Column, FormField, Grid } from '@flightlesslabs/dodo-ui';
  import { Modal } from '@flightlesslabs/dodo-ui-bits';
  import { DatePicker, type DatePickerFormat } from '@flightlesslabs/dodo-ui-date';
  import { type DateValue } from '@internationalized/date';
  import { nanoid } from 'nanoid';

  type BaseProps = {
    open: boolean;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    groups: ActivityGroup[];
  };

  type CreateProps = BaseProps & {
    data: Activity | undefined;
    mode: 'create';
  };

  type EditProps = BaseProps & {
    data: Activity;
    mode: 'update';
  };

  type Props = CreateProps | EditProps;

  let { oncreate, open = $bindable(), data, onupdate, mode, groups }: Props = $props();
  let cahedData = $derived(mode === 'update' ? data : undefined);
  let date = $derived(getSuggestedDate(groups, cahedData));
  const datesTaken = $derived(getTakenDates(groups, data));
  const isDataValid = $derived(date ? true : false);
  let loading = $state(false);
  const dateFormat = $derived(
    dateFormatOptions.find((item) => item.value === settingsStore.settings.dateFormat)
      ?.valueDatePickerFormat || (DEFAULT_DATE_FORMAT as DatePickerFormat),
  );

  function isDateUnavailable(date: DateValue): boolean {
    const dateString = date.toString();

    if (datesTaken.includes(dateString)) {
      return true;
    }

    return false;
  }

  function onclear() {
    open = false;
    date = getSuggestedDate(groups, cahedData);
  }

  async function create() {
    loading = true;

    if (!date) {
      return;
    }

    const id = nanoid();
    const newPath = data ? `${data.path}.${id}` : id;

    if (oncreate) {
      await oncreate({
        description: date.toString(),
        _id: id,
        path: newPath,
        headerActivityId: data?.headerActivityId,
      });
    }

    loading = false;
    open = false;
    date = getSuggestedDate(groups, cahedData);
  }

  async function edit() {
    if (!data) {
      return;
    }

    if (!date) {
      return;
    }

    loading = true;

    if (onupdate) {
      await onupdate({
        ...data,
        description: date.toString(),
        expanded: false,
      } as Activity);
    }

    loading = false;
    open = false;
    date = getSuggestedDate(groups, cahedData);
  }
</script>

<Modal bind:open title={mode === 'create' ? 'Add date' : 'Edit date'} {onclear}>
  <div class="ModalHolder">
    <Grid gap={2}>
      <Column>
        <FormField label="Select date:" for="description">
          <DatePicker bind:value={date} preventDeselect {dateFormat} {isDateUnavailable} />
        </FormField>
      </Column>
    </Grid>
  </div>

  {#snippet controls()}
    <Button onclick={mode === 'create' ? create : edit} disabled={loading || !isDataValid}>
      OK
    </Button>
  {/snippet}
</Modal>

<style lang="scss">
  .ModalHolder {
    :global(.dodo-ui-Calendar) {
      min-width: 100px;
      top: 33%;
    }
  }
</style>
