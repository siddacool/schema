<script lang="ts">
  import { Button, Column, FormField, Grid, TextArea } from '@flightlesslabs/dodo-ui';
  import type { ActivityTreeOnUpdate } from '../../../ActivityTree.svelte';
  import { Modal } from '@flightlesslabs/dodo-ui-bits';
  import type { Activity } from '$lib/features/activity/types';

  type Props = {
    onupdate?: ActivityTreeOnUpdate;
    open: boolean;
    data: Activity;
  };

  let { onupdate, open = $bindable(), data }: Props = $props();

  let description = $derived(data.description);
  const isDataValid = $derived(description ? true : false);
  let loading = $state(false);

  function onclear() {
    open = false;
    description = data.description;
  }

  async function submit() {
    loading = true;

    if (onupdate) {
      await onupdate({
        ...data,
        description,
      });
    }

    loading = false;
    open = false;
    description = data.description;
  }
</script>

<Modal bind:open title="Create activity" {onclear}>
  <Grid gap={2}>
    <Column>
      <FormField label="Description:" for="description">
        <TextArea
          placeholder="Enter description"
          name="name"
          bind:value={description}
          disabled={loading}
        />
      </FormField>
    </Column>
  </Grid>

  {#snippet controls()}
    <Button onclick={submit} disabled={loading || !isDataValid}>Save</Button>
  {/snippet}
</Modal>
