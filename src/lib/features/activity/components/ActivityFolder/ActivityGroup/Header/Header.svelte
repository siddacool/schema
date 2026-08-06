<script lang="ts">
  import type {
    ActivityGroup,
    ActivityCreateFormData,
    Activity,
  } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { Card } from '@flightlesslabs/dodo-ui';
  import Toolbar from './Toolbar/Toolbar.svelte';

  import Trigger from './Trigger.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    editMode: boolean;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    onupdate,
    ondelete,
    editMode,
  }: Props = $props();

  const classes = $derived(['Header', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Card class="HeaderCard" shadow={0}>
    <Trigger />
    <p>
      {data.description}
    </p>

    <Toolbar {data} {oncreate} {onupdate} {ondelete} {editMode} />
  </Card>
</div>

<style lang="scss">
  .Header {
    display: flex;
    width: 100%;
    flex-direction: column;

    p {
      margin: 0;
      flex: 1;
      margin-left: 4px;
      font-size: 1.2rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    :global(.HeaderCard) {
      display: flex;
      align-items: center;
      padding: calc(var(--dodo-ui-space)) calc(var(--dodo-ui-space) * 0.8);
    }
  }
</style>
