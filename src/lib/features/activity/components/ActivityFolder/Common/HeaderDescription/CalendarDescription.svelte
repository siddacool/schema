<script lang="ts">
  import type { ActivityGroup } from '$lib/features/activity/types';
  import { createDate } from '$lib/utils/date-time/createDate';

  type Props = {
    data: ActivityGroup;
  };

  const { data }: Props = $props();
  const dateMoment = $derived(createDate(data.description));
  const isSameYear = $derived(dateMoment.isSame(createDate(), 'year'));
  const format = $derived(isSameYear ? 'MMM, DD' : 'MMM, DD YYYY');
  const dateFormated = $derived(createDate(data.description).format(format));
</script>

{dateFormated}
