<script lang="ts">
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnDelete,
    ActivityTreeOnInlineEditorShow,
    ActivityTreeOnSelect,
    ActivityTreeOnUpdate,
  } from '../ActivityTree.svelte';
  import ActivityBaseNode from '../ActivityBaseNode/ActivityBaseNode.svelte';

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
  }: Props = $props();
</script>

<div class="ActivityNode">
  <ActivityBaseNode
    {editMode}
    {value}
    {oncreate}
    {ondelete}
    {onupdate}
    {selectedNode}
    {onselect}
    {onInlineEditorShow}
    {showInlineEditor}
    {maxLevels}
  />
</div>

<style lang="scss">
  .ActivityNode {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: calc(var(--dodo-ui-space) / 2);
    margin-bottom: calc(var(--dodo-ui-space) / 1.5);

    :global(.ActivityDescription) {
      font-size: 1rem;
      font-weight: 400;
      margin: 0;
      display: flex;
    }
  }
</style>
