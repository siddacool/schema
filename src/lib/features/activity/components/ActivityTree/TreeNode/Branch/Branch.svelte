<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import { Card } from '@flightlesslabs/dodo-ui';
  import Toolbar from '../Toolbar/Toolbar.svelte';
  import Trigger from './Trigger.svelte';
  import Description from './Description.svelte';
  import type { ActivityTreeNodeValue } from '../../types';

  type Props = {
    class?: string;
    planType: PlanType;
    group: ActivityGroup;
    data: Activity;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    node: ActivityTreeNodeValue;
    onselect: (value: string | undefined) => void;
  };

  const {
    class: className = '',
    planType,
    group,
    data,
    oncreate,
    onupdate,
    ondelete,
    maxLevels,
    editMode,
    node,
    onselect,
  }: Props = $props();

  const expanded = $derived(node.isExpanded);
  const classes = $derived(['Branch', `${expanded ? 'expanded' : ''}`, className].filter(Boolean));

  function onclick(e: MouseEvent) {
    e.stopPropagation();
  }

  function onkeydown(e: KeyboardEvent) {
    e.stopPropagation();
  }
</script>

<div class={classes.join(' ')} {onclick} {onkeydown} role="presentation">
  <Card class="TreeNodeCard" shadow={0}>
    <Trigger {onupdate} {node} {data} {onselect} />
    <Description {node} />

    {#if expanded}
      <Toolbar {oncreate} {onupdate} {ondelete} {maxLevels} {editMode} {node} {data} />
    {/if}
  </Card>
</div>

<style lang="scss">
  .Branch {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: inherit;
    text-decoration: none;
    margin: 0;
    padding: 0;
    z-index: 1;
    position: relative;

    :global(.TreeNodeCard) {
      padding: 0 calc(var(--dodo-ui-space) * 0.8);
      padding-left: 0;
      display: flex;
      align-items: flex-start;
      background-color: transparent;
      background-color: var(--dodo-color-neutral-50);

      &:hover {
        background-color: var(--dodo-color-neutral-100);
      }
    }

    &.expanded {
      :global(.TreeNodeCard) {
        background-color: var(--dodo-color-neutral-100);
        border-color: var(--dodo-color-neutral-400);

        &:hover {
          background-color: var(--dodo-color-neutral-200);
        }
      }
    }

    :global(.Toolbar) {
      padding: calc(var(--dodo-ui-space) * 0.8) 0;
    }
  }
</style>
