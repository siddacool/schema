<script lang="ts">
  import type { Activity, ActivityCreateFormData } from '$lib/features/activity/types';
  import { Button, Column, FormField, Grid, Text, TextArea } from '@flightlesslabs/dodo-ui';
  import { Modal } from '@flightlesslabs/dodo-ui-bits';
  import { nanoid } from 'nanoid';

  type BaseProps = {
    open: boolean;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
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

  let { oncreate, open = $bindable(), data, onupdate, mode }: Props = $props();

  let cahedData = $derived(mode === 'update' ? data : undefined);
  let description = $derived(cahedData?.description);
  const isDataValid = $derived(description ? true : false);
  let loading = $state(false);

  function onclear() {
    open = false;
    description = '';
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
    description = '';
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
      } as Activity);
    }

    loading = false;
    open = false;
    description = '';
  }
</script>

<Modal bind:open title={mode === 'create' ? 'Add activity' : 'Edit activity'} {onclear}>
  <Grid gap={2}>
    <Column>
      <FormField label="Description:" for="description">
        <TextArea
          placeholder="Description"
          name="description"
          bind:value={description}
          disabled={loading}
          class="ActivityTreeEditActivityFormDescription"
        />
        <Text color="neutral" class="ActivityTreeEditActivityFormDescriptionHelperText">
          * Markdown formatting like bold, italics and links are supported
        </Text>
      </FormField>
    </Column>
  </Grid>

  {#snippet controls()}
    <Button onclick={mode === 'create' ? create : edit} disabled={loading || !isDataValid}>
      OK
    </Button>
  {/snippet}
</Modal>

<style lang="scss">
  :global(.ActivityTreeEditActivityFormDescription textarea) {
    field-sizing: content;
    min-height: 100px; /* Optional baseline height */
    max-height: 300px; /* Optional cap to prevent infinite growth */
    line-height: 22px;
  }

  :global(.ActivityTreeEditActivityFormDescriptionHelperText) {
    margin-top: var(--dodo-ui-space);
    display: flex;
    font-size: 0.9rem;
  }
</style>
