<script lang="ts">
  import { resolve } from '$app/paths';
  import { planDetailStore } from '../../store/detail.svelte';

  const plan = $derived(planDetailStore.plan);
</script>

{#if plan}
  <div class="Title">
    / <a href={resolve(`/plans/${plan._id}`)}>{plan.name}</a>
  </div>
{/if}

<style lang="scss">
  .Title {
    margin: 0;
    font-size: 1.1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
</style>
