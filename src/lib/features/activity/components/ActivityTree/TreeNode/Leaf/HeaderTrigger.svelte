<script lang="ts">
  import MarkdownEngine from '$lib/components/MarkdownEngine/MarkdownEngine.svelte';
  import type { Activity } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../../types';
  import Icon from '@iconify/svelte';
  import Track from '../Track.svelte';

  type Props = {
    class?: string;
    node: ActivityTreeNodeValue;
    onselect: (value: string | undefined) => void;
    editMode: boolean;
    trackedActivity: Activity[] | undefined;
    track: boolean;
  };

  const {
    class: className = '',
    node,
    onselect,
    editMode,
    track,
    trackedActivity,
  }: Props = $props();
  const trackHeader = $derived(
    track && trackedActivity?.some((item) => item._id === (node.id as string)) ? true : false,
  );
  const classes = $derived(['HeaderTrigger', className].filter(Boolean));

  function selectToggle() {
    if (!editMode) {
      return;
    }

    onselect(node.id as string);
  }

  function onkeydown(e: KeyboardEvent) {
    e.stopPropagation();
  }
</script>

<div class={classes.join(' ')} onclick={selectToggle} {onkeydown} role="presentation">
  <spn class="TriggerIcon">
    <Icon icon="icon-park-outline:dot" />
  </spn>

  {#if trackHeader}
    <Track />
  {/if}

  <div class="description">
    <MarkdownEngine source={node.data?.description || ''} />
  </div>
</div>

<style lang="scss">
  .HeaderTrigger {
    background-color: transparent;
    border: 0;
    display: flex;
    width: 100%;
    padding: var(--dodo-ui-space);
    display: flex;
    align-items: flex-start;
    flex: 1;
    min-height: 40px;
    color: inherit;
    font-family: inherit;
    cursor: default;

    .description {
      margin: 0;
      margin-left: 4px;
      font-size: 1rem;
      overflow: hidden;
      margin-top: 2px;

      @media (min-width: 600px) {
        font-size: 1.1rem;
      }
    }

    :global(.TriggerIcon) {
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
      margin-top: 3px;
    }
  }
</style>
