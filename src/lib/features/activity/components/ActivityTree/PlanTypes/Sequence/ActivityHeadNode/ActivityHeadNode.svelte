<script lang="ts">
  import ActivityInlineEditor from '../../../ActivityInlineEditor/ActivityInlineEditor.svelte';
  import type { ActivityNodeValue } from '../../../ActivityNodes/ActivityNode/ActivityNode.svelte';
  import type { ActivityTreeOnCreate, ActivityTreeOnUpdate } from '../../../ActivityTree.svelte';
  import ActivityHeadNodeBase from '../../ActivityHeadNodeBase/ActivityHeadNodeBase.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    editMode: boolean;
  };

  let { value, oncreate, onupdate, editMode }: Props = $props();
</script>

<ActivityHeadNodeBase class="ActivityHeadNodeSequence" {value}>
  <ActivityInlineEditor {editMode} {value} {oncreate} {onupdate} />
</ActivityHeadNodeBase>
