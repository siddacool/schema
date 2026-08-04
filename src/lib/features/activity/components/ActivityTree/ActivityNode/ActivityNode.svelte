<script lang="ts">
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnUpdate,
  } from '../ActivityTree.svelte';
  import ActivityInlineEditor from '../ActivityInlineEditor/ActivityInlineEditor.svelte';

  type Props = {
    value: ActivityNodeValue;
    maxLevels: number;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    editMode: boolean;
  };

  let { value, maxLevels, oncreate, onupdate, editMode }: Props = $props();
  const levelAllowed = $derived(value.level && value.level <= maxLevels ? true : false);
</script>

<div class="ActivityNode">
  <ActivityInlineEditor editMode={editMode && levelAllowed} {value} {oncreate} {onupdate} />
</div>

<style lang="scss">
  .ActivityNode {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: calc(var(--dodo-ui-space) / 2);
    margin-bottom: calc(var(--dodo-ui-space) / 1.5);

    :global(p) {
      font-size: 1rem;
      font-weight: 400;
      margin: 0;
      display: flex;
    }
  }
</style>
