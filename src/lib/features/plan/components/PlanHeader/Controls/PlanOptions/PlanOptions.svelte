<script>
  import DropdownTool from './DropdownTool.svelte';
  import EditPlanAction from './EditPlanAction/EditPlanAction.svelte';
  import DeletePlan from './Options/DeletePlan.svelte';
  import EditPlan from './Options/EditPlan/EditPlan.svelte';
</script>

<DropdownTool>
  <EditPlan />
  <DeletePlan />
</DropdownTool>

<EditPlanAction />
