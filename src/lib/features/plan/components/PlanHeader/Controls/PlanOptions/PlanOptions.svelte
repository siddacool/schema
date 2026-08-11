<script>
  import DropdownTool from './DropdownTool.svelte';
  import EditPlanAction from './EditPlanAction/EditPlanAction.svelte';
  import DeletePlan from './Options/DeletePlan.svelte';
  import EditPlan from './Options/EditPlan.svelte';
  import ExportPlan from './Options/ExportPlan.svelte';
</script>

<DropdownTool>
  <EditPlan />
  <ExportPlan />
  <DeletePlan />
</DropdownTool>

<EditPlanAction />
