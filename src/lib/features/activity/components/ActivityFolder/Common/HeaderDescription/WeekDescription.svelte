<script lang="ts">
  import { daysOptions } from '$lib/features/activity/config/week';
  import type { ActivityGroup } from '$lib/features/activity/types';

  type Props = {
    data: ActivityGroup;
  };

  const { data }: Props = $props();
  const day = $derived(daysOptions.find((item) => item.value === data.description)?.label);
</script>

{day}
