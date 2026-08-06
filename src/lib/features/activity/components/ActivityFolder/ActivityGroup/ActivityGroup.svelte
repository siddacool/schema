<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { AccordionItem } from '@flightlesslabs/dodo-ui-bits';
  import type { Activity, ActivityCreateFormData, ActivityGroup } from '../../../types';
  import { WeekDays } from '../../../types/week';
  import Header from './Header/Header.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    startOfWeek: WeekDays;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    onupdate,
    ondelete,
    maxLevels,
    editMode,
    startOfWeek,
  }: Props = $props();

  const classes = $derived(['ActivityGroup', className].filter(Boolean));
</script>

<AccordionItem class={classes.join(' ')} value={data._id}>
  {#snippet customHeaderContent()}
    <Header {planType} {oncreate} {onupdate} {ondelete} {editMode} {data} />
  {/snippet}
</AccordionItem>

<style>
  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed'] .Toolbar) {
    display: none;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='open'] .HeaderCard) {
    background-color: var(--dodo-color-primary-50);
  }
</style>
