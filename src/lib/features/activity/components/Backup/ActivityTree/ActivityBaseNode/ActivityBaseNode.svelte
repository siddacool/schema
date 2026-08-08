<script lang="ts">
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnDelete,
    ActivityTreeOnInlineEditorShow,
    ActivityTreeOnSelect,
    ActivityTreeOnUpdate,
  } from '../ActivityTree.svelte';
  import ActivityBaseCard from '../ActivityBaseCard/ActivityBaseCard.svelte';
  import { TextArea } from '@flightlesslabs/dodo-ui';
  import type { Activity } from '$lib/features/activity/types';

  type Props = {
    value: ActivityNodeValue;
    maxLevels: number;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    ondelete?: ActivityTreeOnDelete;
    editMode: boolean;
    selectedNode: ActivityNodeValue | undefined;
    onselect: ActivityTreeOnSelect;
    onInlineEditorShow: ActivityTreeOnInlineEditorShow;
    showInlineEditor: boolean;
    class?: string;
  };

  let {
    value,
    maxLevels,
    oncreate,
    onupdate,
    ondelete,
    editMode,
    selectedNode,
    onselect,
    onInlineEditorShow,
    showInlineEditor,
    class: className = '',
  }: Props = $props();

  const allowCreate = $derived(value.level && value.level <= maxLevels ? true : false);

  const isEdit = $derived(selectedNode?.id === value.id && showInlineEditor);
  const data = $derived((value?.data || {}) as Activity);
  let description = $derived(data?.description);
  const isDataValid = $derived(description ? true : false);
  let loading = $state(false);

  function fieldClick(e: MouseEvent) {
    e.stopPropagation();
  }

  async function onupdateMod() {
    loading = true;

    if (onupdate) {
      await onupdate({
        ...data,
        description,
      });
    }

    loading = false;
  }

  const classes = $derived(['ActivityBaseNode', className].filter(Boolean));
</script>

<ActivityBaseCard
  {editMode}
  {allowCreate}
  {value}
  {oncreate}
  {ondelete}
  {selectedNode}
  {onselect}
  {onInlineEditorShow}
  {showInlineEditor}
  loading={loading || !isDataValid}
  {onupdateMod}
  class={classes.join(' ')}
>
  {#if isEdit}
    <TextArea
      placeholder="Enter description"
      name="name"
      bind:value={description}
      onclick={fieldClick}
    />
  {:else}
    {value.data?.description}
  {/if}
</ActivityBaseCard>
