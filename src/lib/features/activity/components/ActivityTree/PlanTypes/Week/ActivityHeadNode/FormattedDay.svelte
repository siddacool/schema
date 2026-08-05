<script lang="ts">
  import { daysOptions } from '$lib/features/activity/config/week';

  type Props = {
    value: string;
  };

  let { value }: Props = $props();
  const formattedValue = $derived(daysOptions.find((item) => item.value === value)?.label || value);
</script>

<p class="FormattedDay">
  {formattedValue}
</p>

<style lang="scss">
  .FormattedDay {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 400;
    min-height: 28px;
  }
</style>
