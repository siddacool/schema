<script lang="ts">
  import ActivityInlineEditor from '../../../ActivityInlineEditor/ActivityInlineEditor.svelte';
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnDelete,
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
  };

  let { value, oncreate, onupdate, ondelete, editMode, selectedNode, onselect }: Props = $props();
</script>

<ActivityHeadNodeBase class="ActivityHeadNodeSequence" {value}>
  <ActivityInlineEditor
    {editMode}
    {value}
    {oncreate}
    {ondelete}
    {onupdate}
    {selectedNode}
    {onselect}
  />
</ActivityHeadNodeBase>
