<script>
  import { Text } from '@flightlesslabs/dodo-ui';
  import { DropdownMenuItem } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';

  function onclick() {
    const button = document.getElementById('EditPlanActionButton');

    if (button) {
      button?.click();
    }
  }
</script>

<DropdownMenuItem outline class="EditPlanDropdownMenuItem" {onclick}>
  <Text color="primary" class="PlanHeaderOptionEditText">
    <span class="Icon">
      <Icon icon="material-symbols:edit-outline" />
    </span>
    Edit plan
  </Text>
</DropdownMenuItem>

<style lang="scss">
  :global(.EditPlanDropdownMenuItem .Icon) {
    font-size: 1.3rem;
  }

  :global(.PlanHeaderOptionEditText) {
    display: flex;
    align-items: center;
  }
</style>
