<script lang="ts">
  import { planDetailStore } from '../../store/detail.svelte';

  const plan = $derived(planDetailStore.plan);
</script>

{#if plan}
  <div class="Title">
    {plan.name}
  </div>
{/if}

<style lang="scss">
  .Title {
    margin: 0;
    font-size: 1.1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: inherit;
    text-decoration: none;
  }
</style>
