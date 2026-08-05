<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import { WeekDays } from '../../types/week';
  import { daysOptions } from '../../config/week';

  type Props = {
    value: WeekDays;
    onclick?: (value: WeekDays) => void;
    disabled?: boolean;
  };

  const { onclick, value, disabled }: Props = $props();

  const label = $derived(daysOptions.find((item) => item.value === value)?.label || '');

  function handleClick(e: MouseEvent) {
    e.stopPropagation();

    if (onclick) {
      onclick(value);
    }
  }
</script>

<Button class="DayButton" onclick={handleClick} variant="solid" {disabled} color="neutral" outline>
  {label}
</Button>
