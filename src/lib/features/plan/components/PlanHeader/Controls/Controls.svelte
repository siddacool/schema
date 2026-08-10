<script>
  import PageHeadingNavControls from '$lib/components/PageHeadingNavControls/PageHeadingNavControls.svelte';
  import Add from './Add/Add.svelte';
  import EditModeToggle from './EditModeToggle.svelte';
  import PlanOptions from './PlanOptions/PlanOptions.svelte';
</script>

<PageHeadingNavControls>
  <EditModeToggle />
  <Add />
  <PlanOptions />
</PageHeadingNavControls>
