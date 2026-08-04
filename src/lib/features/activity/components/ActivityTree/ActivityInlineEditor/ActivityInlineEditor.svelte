<script lang="ts">
  import ActivityEdit from '../ActivityEdit/ActivityEdit.svelte';
  import type { ActivityNodeValue } from '../ActivityNodes/ActivityNode/ActivityNode.svelte';
  import type { ActivityTreeOnCreate, ActivityTreeOnUpdate } from '../ActivityTree.svelte';
  import Controls from './Controls/Controls.svelte';

  type Props = {
    value: ActivityNodeValue;
    onupdate?: ActivityTreeOnUpdate;
    oncreate?: ActivityTreeOnCreate;
    editMode: boolean;
  };

  const { value, onupdate, oncreate, editMode }: Props = $props();

  let showEditor = $state(false);
</script>

{#if showEditor && value.data}
  <ActivityEdit data={value.data} onsubmit={onupdate} onclose={() => (showEditor = false)} />
{:else}
  <p>
    {value.data?.description}
  </p>

  {#if editMode}
    <Controls {oncreate} {value} bind:showEditor />
  {/if}
{/if}
