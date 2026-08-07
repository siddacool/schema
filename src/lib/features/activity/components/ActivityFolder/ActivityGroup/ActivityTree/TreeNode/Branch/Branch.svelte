<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../../ActivityTree.svelte';
  import { Card } from '@flightlesslabs/dodo-ui';
  import Toolbar from '../Toolbar/Toolbar.svelte';
  import Trigger from './Trigger.svelte';
  import Description from './Description.svelte';

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
  <Card class="TreeNodeCard" shadow={0} outline>
    <Trigger {onupdate} {node} {data} />
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

    :global(.TreeNodeCard) {
      padding: calc(var(--dodo-ui-space)) calc(var(--dodo-ui-space));
      border-color: transparent;
      display: flex;
      align-items: flex-start;

      &:hover {
        background-color: var(--dodo-color-neutral-100);
      }
    }

    &.expanded {
      :global(.TreeNodeCard) {
        border-color: var(--dodo-color-neutral-300);
      }
    }
  }
</style>
