<script lang="ts">
  import ListPicker from '$lib/components/ListPicker/ListPicker.svelte';
  import { planTypeOptions } from '../../config';
  import type { PlanType } from '../../types/plan-type';
  import OptionLabel from './OptionLabel.svelte';

  type Props = {
    value: PlanType;
    disabled?: boolean;
    id?: string;
    class?: string;
  };

  let { value = $bindable(), disabled, id, class: className = '' }: Props = $props();

  const classes = $derived(['PlanTypeListPicker', className].filter(Boolean));
</script>

<ListPicker options={planTypeOptions} bind:value {id} {disabled} class={classes.join(' ')}>
  {#snippet customLabel(props)}
    <OptionLabel {...props} value={props.value as PlanType} />
  {/snippet}
</ListPicker>
