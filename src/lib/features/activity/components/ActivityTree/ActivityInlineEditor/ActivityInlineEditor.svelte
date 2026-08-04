<script lang="ts">
  import ActivityEdit from '../ActivityEdit/ActivityEdit.svelte';
  import type {
    ActivityTreeOnCreate,
    ActivityTreeOnUpdate,
    ActivityNodeValue,
  } from '../ActivityTree.svelte';
  import Controls from './Controls/Controls.svelte';

  type Props = {
    value: ActivityNodeValue;
    onupdate?: ActivityTreeOnUpdate;
    oncreate?: ActivityTreeOnCreate;
    editMode: boolean;
    allowCreate?: boolean;
  };

  const { value, onupdate, oncreate, editMode, allowCreate = true }: Props = $props();

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
    <Controls {oncreate} {value} {displayEditor} {allowCreate} />
  {/if}
{/if}
