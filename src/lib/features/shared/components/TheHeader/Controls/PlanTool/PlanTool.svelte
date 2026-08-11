<script>
  import { Group } from '@flightlesslabs/dodo-ui';
  import CreatePlan from './CreatePlan.svelte';
  import PlanOptions from './PlanOptions/PlanOptions.svelte';
  import ImportGadget from './ImportGadget.svelte';
</script>

<ImportGadget />
<div class="PlanTool">
  <Group attached>
    <CreatePlan />
    <PlanOptions />
  </Group>
</div>

<style class="scss">
  .PlanTool {
    margin-right: 6px;
    :global(.dodo-ui-Button) {
      margin: 0;
    }
  }
</style>
