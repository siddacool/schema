<script lang="ts">
  import type { Activity, ActivityGroup } from '$lib/features/activity/types';
  import { Button, Column, FormField, Grid, TextArea } from '@flightlesslabs/dodo-ui';
  import { Modal } from '@flightlesslabs/dodo-ui-bits';

  type Props = {
    onupdate?: (data: Activity) => Promise<void>;
    open: boolean;
    data: ActivityGroup;
  };

  let { onupdate, open = $bindable(), data }: Props = $props();

  let description = $derived(data.description);
  const isDataValid = $derived(description ? true : false);
  let loading = $state(false);

  function onclear() {
    open = false;
    description = '';
  }

  async function submit() {
    loading = true;

    const { activity, ...restData } = data;

    if (onupdate) {
      await onupdate({
        ...restData,
        description,
      });
    }

    loading = false;
    open = false;
    description = '';
  }
</script>

<Modal bind:open title="Edit activity" {onclear}>
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
