<script>
  import EditPlanForm from './EditPlanForm.svelte';

  let open = $state(false);

  function onclick() {
    open = true;
  }
</script>

<button id="EditPlanActionButton" {onclick}>Yo</button>

<EditPlanForm bind:open />

<style lang="scss">
  button {
    position: absolute;
    z-index: -200;
  }
</style>
