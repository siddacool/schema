<script lang="ts">
  import Instructions from '$lib/components/Instructions/Instructions.svelte';
  import SiteLogo from '$lib/components/SiteLogo/SiteLogo.svelte';
  import Icon from '@iconify/svelte';
</script>

<div class="PlansListPageInstructions">
  <Instructions>
    <h1 class="title"><SiteLogo /> Schema</h1>
    <h2 class="siteDescription">Plan, schedule, manage</h2>
    <h3 class="siteFeatures">
      Create workout routines, travel itineraries, habbit calendars with ease and flexibility.
    </h3>

    <p>
      Click on <span class="addButton"><Icon icon="material-symbols:add-rounded" /></span> button to add
      create a plan.
    </p>
  </Instructions>
</div>

<style lang="scss">
  .title {
    display: flex;
    align-items: center;
    justify-self: center;
    font-size: 2.4rem;
    font-weight: 500;
    font-family: 'Crimson Pro', serif;
    font-style: italic;

    :global(.SiteLogo) {
      margin-right: var(--dodo-ui-space);
    }

    @media (min-width: 600px) {
      font-size: 2.7rem;
    }
  }

  .siteDescription {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--dodo-color-neutral-600);

    @media (min-width: 600px) {
      font-size: 1.5rem;
    }
  }

  .siteFeatures {
    font-size: 1.2rem;
    font-weight: 400;
    font-family: 'Crimson Pro', serif;
    color: var(--dodo-color-neutral-600);

    @media (min-width: 600px) {
      font-size: 1.3rem;
    }
  }

  p {
    .addButton {
      font-size: 1.3rem;
    }
  }
</style>
