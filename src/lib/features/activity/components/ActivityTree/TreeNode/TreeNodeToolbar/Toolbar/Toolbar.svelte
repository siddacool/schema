<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import DropdownTool from './DropdownTool.svelte';
  import Edit from './Options/Edit.svelte';
  import Add from './Options/Add.svelte';
  import Delete from './Options/Delete.svelte';
  import type { ActivityTreeNodeValue } from '../../../types';

  type Props = {
    maxLevels: number;
    node: ActivityTreeNodeValue;
    data: Activity;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
  };

  const { data, ondelete, maxLevels, node }: Props = $props();
</script>

<DropdownTool>
  <Add {data} {maxLevels} {node} />
  <Edit {data} />
  <Delete {data} {ondelete} />
</DropdownTool>
