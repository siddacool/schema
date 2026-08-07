<script lang="ts">
  import type {
    ActivityGroup,
    ActivityCreateFormData,
    Activity,
  } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import Toolbar from './Toolbar/Toolbar.svelte';

  import Trigger from './Trigger.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
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
  <Trigger />
  <div class="description">
    {data.description}
  </div>

  <Toolbar {data} {oncreate} {onupdate} {ondelete} {editMode} {planType} />
</div>

<style lang="scss">
  .Header {
    display: flex;
    width: 100%;
    align-items: center;

    .description {
      margin: 0;
      flex: 1;
      margin-left: 4px;
      font-size: 1.2rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
