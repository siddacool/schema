<script lang="ts">
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnDelete,
    ActivityTreeOnInlineEditorShow,
    ActivityTreeOnSelect,
  } from '../ActivityTree.svelte';
  import type { Snippet } from 'svelte';
  import DisplayCard from './DisplayCard/DisplayCard.svelte';
  import EditCard from './EditCard/EditCard.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    onupdateMod?: () => Promise<void>;
    ondelete?: ActivityTreeOnDelete;
    editMode: boolean;
    selectedNode: ActivityNodeValue | undefined;
    onselect: ActivityTreeOnSelect;
    onInlineEditorShow: ActivityTreeOnInlineEditorShow;
    showInlineEditor: boolean;
    class?: string;
    children?: Snippet;
    allowCreate?: boolean;
    loading: boolean;
  };

  const {
    value,
    oncreate,
    onupdateMod,
    ondelete,
    editMode,
    selectedNode,
    onselect,
    onInlineEditorShow,
    showInlineEditor,
    class: className = '',
    children,
    allowCreate = false,
    loading,
  }: Props = $props();

  const classes = $derived(['ActivityBaseCard', className].filter(Boolean));
  const isEdit = $derived(selectedNode?.id === value.id && showInlineEditor);
</script>

<div class={classes.join(' ')}>
  {#if isEdit}
    <EditCard {onupdateMod} {value} {onInlineEditorShow} {ondelete} {loading} {onselect}>
      {@render children?.()}
    </EditCard>
  {:else}
    <DisplayCard
      {oncreate}
      {onselect}
      {editMode}
      {value}
      {selectedNode}
      {onInlineEditorShow}
      {allowCreate}
    >
      {@render children?.()}
    </DisplayCard>
  {/if}
</div>
