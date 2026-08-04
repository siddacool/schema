<script lang="ts">
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import ActivityDescription from '../ActivityControls/ActivityDescription/ActivityDescription.svelte';
  import ActivityEdit from '../ActivityEdit/ActivityEdit.svelte';
  import type {
    ActivityTreeOnCreate,
    ActivityTreeOnUpdate,
    ActivityNodeValue,
    ActivityTreeOnDelete,
    ActivityTreeOnSelect,
    ActivityTreeOnInlineEditorShow,
  } from '../ActivityTree.svelte';
  import Controls from './Controls/Controls.svelte';

  type Props = {
    value: ActivityNodeValue;
    onupdate?: ActivityTreeOnUpdate;
    oncreate?: ActivityTreeOnCreate;
    ondelete?: ActivityTreeOnDelete;
    editMode: boolean;
    allowCreate?: boolean;
    selectedNode: ActivityNodeValue | undefined;
    onselect: ActivityTreeOnSelect;
    onInlineEditorShow: ActivityTreeOnInlineEditorShow;
    showInlineEditor: boolean;
  };

  const {
    value,
    onupdate,
    oncreate,
    editMode,
    allowCreate = true,
    ondelete,
    selectedNode,
    onselect,
    onInlineEditorShow,
    showInlineEditor,
  }: Props = $props();

  let showControls = $derived(selectedNode?.id === value.id);

  function hideEditor() {
    onInlineEditorShow(value);
    onselect(undefined);
  }

  function displayEditor() {
    onInlineEditorShow(value);
  }
</script>

{#if showInlineEditor && showControls}
  <ActivityEdit {value} onsubmit={onupdate} onclose={hideEditor} {ondelete} />
{:else}
  <Grid>
    <Column>
      <ActivityDescription onclick={() => onselect(value)}>
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
