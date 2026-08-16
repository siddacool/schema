<script>
  import { page } from '$app/state';
  import { updatePlanFields } from '$lib/features/plan/logic/crud.svelte';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const planId = page.params.planId || '';

  const track = $derived(planDetailStore.plan?.track === false ? false : true);

  function toggleTrack() {
    if (!planId) {
      return;
    }

    updatePlanFields(planId, {
      track: !track,
    });
  }
</script>

<section class="TrackToggle">
  <Button
    aria-label={track ? 'Tracking enabled' : 'Tracking disabled'}
    class="TrackToggleButton"
    roundness={1}
    title={track ? 'Tracking enabled' : 'Tracking disabled'}
    compact
    color={track ? 'primary' : 'neutral'}
    onclick={toggleTrack}
    variant="text"
    size="small"
  >
    <Icon icon="material-symbols:alarm-outline" />
  </Button>
</section>

<style lang="scss">
  .TrackToggle {
    :global(.dodo-ui-Button.size--small.TrackToggleButton) {
      font-size: 1.3rem;
    }
  }
</style>
