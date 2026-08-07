<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../ActivityTree.svelte';
  import Toolbar from './Toolbar/Toolbar.svelte';
  import { Card } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    planType: PlanType;
    group: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    node: ActivityTreeNodeValue;
  };

  const {
    class: className = '',
    planType,
    group,
    oncreate,
    onupdate,
    ondelete,
    maxLevels,
    editMode,
    node,
  }: Props = $props();

  const classes = $derived(['TreeNode', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Card class="TreeNodeCard" shadow={0}>
    <div class="description">{node.data?.description}</div>
    <Toolbar data={group} {oncreate} {onupdate} {ondelete} {maxLevels} {editMode} {node} />
  </Card>
</div>

<style lang="scss">
  .TreeNode {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 4px;

    :global(.TreeNodeCard) {
      display: flex;
      padding: calc(var(--dodo-ui-space)) calc(var(--dodo-ui-space));
      align-items: center;
    }

    &:hover {
      :global(.TreeNodeCard) {
        background-color: var(--dodo-color-neutral-100);
      }
    }

    .description {
      margin: 0;
      flex: 1;
      font-size: 0.95rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
