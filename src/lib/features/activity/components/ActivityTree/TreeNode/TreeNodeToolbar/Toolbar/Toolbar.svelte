<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import DropdownTool from './DropdownTool.svelte';
  import Edit from './Options/Edit.svelte';
  import Add from './Options/Add.svelte';
  import Delete from './Options/Delete.svelte';
  import type { ActivityTreeNodeValue } from '../../../types';
  import Duplicate from './Options/Duplicate.svelte';

  type Props = {
    maxLevels: number;
    data: Activity;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
    onduplicate?: (data: Activity) => Promise<void>;
    node: ActivityTreeNodeValue;
  };

  const { data, ondelete, maxLevels, node, onduplicate }: Props = $props();
</script>

<DropdownTool>
  <Add {data} {maxLevels} {node} />
  <Duplicate {data} {onduplicate} {node} />
  <Edit {data} />
  <Delete {data} {ondelete} />
</DropdownTool>
