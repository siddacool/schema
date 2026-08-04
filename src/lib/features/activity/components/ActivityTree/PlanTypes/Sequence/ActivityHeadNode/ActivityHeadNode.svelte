<script lang="ts">
  import ActivityBaseNode from '../../../ActivityBaseNode/ActivityBaseNode.svelte';
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnDelete,
    ActivityTreeOnInlineEditorShow,
    ActivityTreeOnSelect,
    ActivityTreeOnUpdate,
  } from '../../../ActivityTree.svelte';
  import ActivityHeadNodeBase from '../../ActivityHeadNodeBase/ActivityHeadNodeBase.svelte';

  type Props = {
    value: ActivityNodeValue;
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

<ActivityHeadNodeBase class="ActivityHeadNodeSequence" {value}>
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
    maxLevels={5}
  />
</ActivityHeadNodeBase>
