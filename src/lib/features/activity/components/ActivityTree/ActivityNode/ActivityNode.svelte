<script lang="ts">
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnDelete,
    ActivityTreeOnSelect,
    ActivityTreeOnUpdate,
  } from '../ActivityTree.svelte';
  import ActivityInlineEditor from '../ActivityInlineEditor/ActivityInlineEditor.svelte';

  type Props = {
    value: ActivityNodeValue;
    maxLevels: number;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    ondelete?: ActivityTreeOnDelete;
    editMode: boolean;
    selectedNode: ActivityNodeValue | undefined;
    onselect: ActivityTreeOnSelect;
  };

  let { value, maxLevels, oncreate, onupdate, ondelete, editMode, selectedNode, onselect }: Props =
    $props();

  const allowCreate = $derived(value.level && value.level <= maxLevels ? true : false);
</script>

<div class="ActivityNode">
  <ActivityInlineEditor
    {editMode}
    {allowCreate}
    {value}
    {oncreate}
    {onupdate}
    {ondelete}
    {selectedNode}
    {onselect}
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
