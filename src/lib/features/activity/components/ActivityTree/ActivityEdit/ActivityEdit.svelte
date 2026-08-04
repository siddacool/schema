<script lang="ts">
  import { Column, Grid, TextArea } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls.svelte';
  import type { Activity } from '$lib/features/activity/types';
  import type { ActivityTreeOnUpdate } from '../ActivityTree.svelte';

  type Props = {
    class?: string;
    data: Activity;
    onsubmit?: ActivityTreeOnUpdate;
    onclose: () => void;
  };

  const { class: className = '', data, onsubmit, onclose }: Props = $props();

  const classes = $derived(['ActivityEdit', className].filter(Boolean));

  let description = $derived(data.description);
  const isDataValid = $derived(description ? true : false);
  let loading = $state(false);

  function onclear(e: MouseEvent) {
    e.stopPropagation();
    description = data.description;
    onclose();
  }

  async function submit(e: MouseEvent) {
    e.stopPropagation();
    loading = true;

    if (onsubmit) {
      await onsubmit({
        ...data,
        description,
      });
    }

    loading = false;
    onclose();
  }

  function fieldClick(e: MouseEvent) {
    e.stopPropagation();
  }
</script>

<div class={classes.join(' ')}>
  <Grid>
    <Column>
      <TextArea
        placeholder="Enter description"
        name="name"
        bind:value={description}
        disabled={loading}
        onclick={fieldClick}
      />
    </Column>
    <Column>
      <Controls {onclear} onsubmit={submit} disabled={!isDataValid || loading} />
    </Column>
  </Grid>
</div>

<style lang="scss">
</style>
