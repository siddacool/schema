<script lang="ts">
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import { getAvailableDays } from '$lib/features/activity/utils/get-available-days';
  import { Button, Column, FormField, Grid } from '@flightlesslabs/dodo-ui';
  import { Modal, Select } from '@flightlesslabs/dodo-ui-bits';
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
  const options = $derived(getAvailableDays(groups, data));
  let cahedData = $derived(mode === 'update' ? data : undefined);
  let description = $derived(cahedData?.description || options[0].value);
  const isDataValid = $derived(description ? true : false);
  let loading = $state(false);

  function onclear() {
    open = false;
    description = options[0].value;
  }

  async function create() {
    loading = true;

    if (!description) {
      return;
    }

    const id = nanoid();
    const newPath = data ? `${data.path}.${id}` : id;

    if (oncreate) {
      await oncreate({
        description,
        _id: id,
        path: newPath,
        headerActivityId: data?.headerActivityId,
      });
    }

    loading = false;
    open = false;
    description = options[0].value;
  }

  async function edit() {
    if (!data) {
      return;
    }

    if (!description) {
      return;
    }

    loading = true;

    if (onupdate) {
      await onupdate({
        ...data,
        description,
        expanded: false,
      } as Activity);
    }

    loading = false;
    open = false;
    description = '';
  }
</script>

<Modal bind:open title={mode === 'create' ? 'Add day' : 'Edit day'} {onclear}>
  <Grid gap={2}>
    <Column>
      <FormField label="Select day:" for="description">
        <Select {options} disabled={loading} name="description" bind:value={description} />
      </FormField>
    </Column>
  </Grid>

  {#snippet controls()}
    <Button onclick={mode === 'create' ? create : edit} disabled={loading || !isDataValid}>
      OK
    </Button>
  {/snippet}
</Modal>
