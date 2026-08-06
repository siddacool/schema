<script lang="ts">
  import type { Activity, ActivityCreateFormData } from '$lib/features/activity/types';
  import { Button, Column, FormField, Grid, TextArea } from '@flightlesslabs/dodo-ui';
  import { Modal } from '@flightlesslabs/dodo-ui-bits';
  import { nanoid } from 'nanoid';

  type Props = {
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    open: boolean;
    data: Activity | undefined;
  };

  let { oncreate, open = $bindable(), data }: Props = $props();

  let description = $state('');
  const isDataValid = $derived(description ? true : false);
  let loading = $state(false);

  function onclear() {
    open = false;
    description = '';
  }

  async function submit() {
    loading = true;

    const id = nanoid();
    const newPath = data ? `${data.path}.${id}` : id;

    if (oncreate) {
      await oncreate({
        description,
        _id: id,
        path: newPath,
      });
    }

    loading = false;
    open = false;
    description = '';
  }
</script>

<Modal bind:open title="Add activity" {onclear}>
  <Grid gap={2}>
    <Column>
      <FormField label="Description:" for="description">
        <TextArea
          placeholder="Add description"
          name="name"
          bind:value={description}
          disabled={loading}
        />
      </FormField>
    </Column>
  </Grid>

  {#snippet controls()}
    <Button onclick={submit} disabled={loading || !isDataValid}>OK</Button>
  {/snippet}
</Modal>
