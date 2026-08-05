<script lang="ts">
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnDelete,
    ActivityTreeOnInlineEditorShow,
    ActivityTreeOnSelect,
    ActivityTreeOnUpdate,
  } from '../../../ActivityTree.svelte';
  import ActivityHeadNodeBase from '../../../ActivityHeadNodeBase/ActivityHeadNodeBase.svelte';
  import ActivityBaseCard from '../../../ActivityBaseCard/ActivityBaseCard.svelte';
  import type { Activity } from '$lib/features/activity/types';
  import SelectiveDatePicker from '$lib/features/activity/components/SelectiveDatePicker/SelectiveDatePicker.svelte';
  import { parseDate, type DateValue } from '@internationalized/date';

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
    data: Activity[];
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
    data,
  }: Props = $props();

  const isEdit = $derived(selectedNode?.id === value.id && showInlineEditor);
  const activityData = $derived((value?.data || {}) as Activity);
  let date = $derived<DateValue | undefined>(
    activityData?.description ? parseDate(activityData?.description) : undefined,
  );
  const isDataValid = $derived(date ? true : false);
  let loading = $state(false);

  async function onupdateMod() {
    loading = true;

    if (!date) {
      return;
    }

    if (onupdate) {
      await onupdate({
        ...activityData,
        description: date?.toString(),
      });
    }

    loading = false;
  }

  $effect(() => {
    if (isEdit) {
      date = activityData?.description ? parseDate(activityData?.description) : undefined;
    } else {
      date = activityData?.description ? parseDate(activityData?.description) : undefined;
    }
  });
</script>

<ActivityHeadNodeBase class="ActivityHeadNodeSequence" {value}>
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
    loading={loading || !isDataValid}
    {onupdateMod}
  >
    {#if isEdit}
      <SelectiveDatePicker bind:value={date} {data} />
    {:else}
      {value.data?.description}
    {/if}
  </ActivityBaseCard>
</ActivityHeadNodeBase>
