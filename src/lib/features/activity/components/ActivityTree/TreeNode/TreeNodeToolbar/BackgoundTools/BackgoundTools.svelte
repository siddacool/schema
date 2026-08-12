<script lang="ts">
  import type { ActivityCreateFormData, Activity } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../../../types';
  import AddActivity from './AddActivity.svelte';
  import Edit from './Edit.svelte';

  type Props = {
    maxLevels: number;
    node: ActivityTreeNodeValue;
    data: Activity;
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
  };

  const { data, oncreate, onupdate, maxLevels, node }: Props = $props();
</script>

<AddActivity {data} {oncreate} {maxLevels} {node} />
<Edit {data} {onupdate} />
