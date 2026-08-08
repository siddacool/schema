<script lang="ts">
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnDelete,
    ActivityTreeOnInlineEditorShow,
    ActivityTreeOnSelect,
  } from '../../../ActivityTree.svelte';
  import ActivityHeadNodeBase from '../../../ActivityHeadNodeBase/ActivityHeadNodeBase.svelte';
  import ActivityBaseCard from '../../../ActivityBaseCard/ActivityBaseCard.svelte';
  import FormattedDay from './FormattedDay.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
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
    ondelete,
    editMode,
    selectedNode,
    onselect,
    onInlineEditorShow,
    showInlineEditor,
  }: Props = $props();
</script>

<ActivityHeadNodeBase class="ActivityHeadNodeWeek" {value}>
  <ActivityBaseCard
    {editMode}
    allowCreate={true}
    {value}
    {oncreate}
    {ondelete}
    {selectedNode}
    {onselect}
    {onInlineEditorShow}
    {showInlineEditor}
    loading={false}
  >
    <FormattedDay value={value.data?.description || ''} />
  </ActivityBaseCard>
</ActivityHeadNodeBase>

<style lang="scss">
  :global(.ActivityHeadNodeWeek .ActivityEditClearButton) {
    display: none;
  }

  :global(.ActivityHeadNodeWeek .Controls .DeleteActivity) {
    margin-left: calc(var(--dodo-ui-space) * 3);
  }
</style>
