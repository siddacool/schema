<script>
  import { DropdownMenuItem } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';

  const planId = page.params.planId || '';
</script>

<DropdownMenuItem
  onSelect={() => goto(resolve(`/plans/${planId}/edit`))}
  outline
  class="EditPlanDropdownMenuItem"
>
  <span class="Icon">
    <Icon icon="material-symbols:edit-outline" />
  </span>
  Edit plan
</DropdownMenuItem>

<style lang="scss">
  :global(.EditPlanDropdownMenuItem .Icon) {
    font-size: 1.3rem;
  }
</style>
