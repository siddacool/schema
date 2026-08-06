<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../ActivityTree.svelte';

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
  <p>{node.data?.description}</p>
</div>

<style lang="scss">
  .TreeNode {
    display: flex;
    align-items: center;
    width: 100%;
    padding: calc(var(--dodo-ui-space)) calc(var(--dodo-ui-space));
    border-radius: 8px;
    margin-left: 4px;

    &:hover {
      background-color: var(--dodo-color-neutral-100);
    }

    p {
      margin: 0;
      flex: 1;
      font-size: 1rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
