<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import type { ActivityTreeOnCreate } from '../../../../ActivityTree.svelte';
  import CreateActivityModal from '../../../../ActivityBaseCard/DisplayCard/Controls/CreateActivity/CreateActivityModal.svelte';

  type Props = {
    path: string | undefined;
    oncreate?: ActivityTreeOnCreate;
  };

  let { oncreate, path }: Props = $props();
  let open = $state(false);

  function handleClick(e: MouseEvent) {
    e.stopPropagation();

    open = true;
  }
</script>

<div class="CreateActivity">
  <Button roundness={1} color="primary" onclick={handleClick}>Create activity</Button>
</div>

<CreateActivityModal bind:open {path} {oncreate} />
