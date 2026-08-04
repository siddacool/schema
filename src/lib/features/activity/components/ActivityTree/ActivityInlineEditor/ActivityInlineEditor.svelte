<script lang="ts">
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import ActivityDescription from '../ActivityControls/ActivityDescription/ActivityDescription.svelte';
  import ActivityEdit from '../ActivityEdit/ActivityEdit.svelte';
  import type {
    ActivityTreeOnCreate,
    ActivityTreeOnUpdate,
    ActivityNodeValue,
    ActivityTreeOnDelete,
  } from '../ActivityTree.svelte';
  import Controls from './Controls/Controls.svelte';

  type Props = {
    value: ActivityNodeValue;
    onupdate?: ActivityTreeOnUpdate;
    oncreate?: ActivityTreeOnCreate;
    ondelete?: ActivityTreeOnDelete;
    editMode: boolean;
    allowCreate?: boolean;
  };

  const { value, onupdate, oncreate, editMode, allowCreate = true, ondelete }: Props = $props();

  let showEditor = $state(false);
  let showControls = $state(false);

  function hideEditor() {
    showEditor = false;
  }

  function displayEditor() {
    showEditor = true;
  }
</script>

{#if showEditor}
  <ActivityEdit {value} onsubmit={onupdate} onclose={hideEditor} {ondelete} />
{:else}
  <Grid>
    <Column>
      <ActivityDescription onclick={() => (showControls = !showControls)}>
        {value.data?.description}
      </ActivityDescription>
    </Column>

    {#if editMode && showControls}
      <Column>
        <Controls {oncreate} {value} {displayEditor} {allowCreate} />
      </Column>
    {/if}
  </Grid>
{/if}
