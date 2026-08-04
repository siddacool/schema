<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import ActivityInlineEditor from '../../../ActivityInlineEditor/ActivityInlineEditor.svelte';
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnDelete,
    ActivityTreeOnUpdate,
  } from '../../../ActivityTree.svelte';
  import ActivityHeadNodeBase from '../../ActivityHeadNodeBase/ActivityHeadNodeBase.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    ondelete?: ActivityTreeOnDelete;
    editMode: boolean;
    data: Activity[];
  };

  let { value, oncreate, onupdate, ondelete, editMode, data }: Props = $props();
</script>

<ActivityHeadNodeBase class="ActivityHeadNodeSequence" {value}>
  <ActivityInlineEditor {editMode} {value} {oncreate} {ondelete} {onupdate} {data} />
</ActivityHeadNodeBase>
