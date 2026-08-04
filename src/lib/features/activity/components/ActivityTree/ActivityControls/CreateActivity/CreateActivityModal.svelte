<script lang="ts">
  import { Button, Column, FormField, Grid, TextArea } from '@flightlesslabs/dodo-ui';
  import { Modal } from '@flightlesslabs/dodo-ui-bits';
  import { nanoid } from 'nanoid';
  import type { ActivityTreeOnCreate } from '../../ActivityTree.svelte';

  type Props = {
    oncreate?: ActivityTreeOnCreate;
    open: boolean;
    path: string | undefined;
  };

  let { oncreate, open = $bindable(), path }: Props = $props();

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
    const newPath = path ? `${path}.${id}` : id;

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
    <Button onclick={submit} disabled={loading || !isDataValid}>OK</Button>
  {/snippet}
</Modal>
