<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import ActivityEdit from '../ActivityEdit/ActivityEdit.svelte';
  import type {
    ActivityTreeOnCreate,
    ActivityTreeOnUpdate,
    ActivityNodeValue,
    ActivityTreeOnDelete,
  } from '../ActivityTree.svelte';
  import Controls from './Controls/Controls.svelte';

  type Props = {
    value: ActivityNodeValue;
    onupdate?: ActivityTreeOnUpdate;
    oncreate?: ActivityTreeOnCreate;
    ondelete?: ActivityTreeOnDelete;
    editMode: boolean;
    allowCreate?: boolean;
    data: Activity[];
  };

  const {
    value,
    onupdate,
    oncreate,
    editMode,
    allowCreate = true,
    ondelete,
    data,
  }: Props = $props();

  let showEditor = $state(false);

  function hideEditor() {
    showEditor = false;
  }

  function displayEditor() {
    showEditor = true;
  }
</script>

{#if showEditor && value.data}
  <ActivityEdit data={value.data} onsubmit={onupdate} onclose={hideEditor} />
{:else}
  <p>
    {value.data?.description}
  </p>

  {#if editMode}
    <Controls {oncreate} {value} {displayEditor} {allowCreate} {ondelete} {data} />
  {/if}
{/if}
