<script lang="ts">
  import type { PlanType } from '../../types/plan-type';
  import PlanTypeIcon from '../PlanTypeIcon.svelte';

  type Props = {
    value: PlanType;
    label: string;
    class?: string;
  };

  let { value, class: className = '', label }: Props = $props();

  const classes = $derived(['OptionLabel', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <PlanTypeIcon {value} />
  <div class="description">
    {label}
  </div>
</div>

<style lang="scss">
  .OptionLabel {
    display: flex;
    align-items: center;
    color: var(--dodo-color-neutral-800);

    :global(.PlanTypeIcon) {
      font-size: 1.5rem;
      margin-right: 4px;
      color: var(--dodo-color-neutral-600);
    }
    .description {
      display: flex;
      align-items: center;
    }
  }
</style>
