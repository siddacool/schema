<script lang="ts">
  import type { ActivityGroup } from '$lib/features/activity/types';

  type Props = {
    data: ActivityGroup;
  };

  const { data }: Props = $props();
</script>

{data.description}
