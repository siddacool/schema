<script lang="ts">
  import type { Activity, ActivityGroup } from '$lib/features/activity/types';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { DropdownMenuItem } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';

  type Props = {
    planType: PlanType;
    groups: ActivityGroup[];
    data: Activity;
  };

  const { planType, groups, data }: Props = $props();

  const isAvailableDays = $derived(groups.length < 7);

  function onclick() {
    const button = document.getElementById(`EditButton-${data._id}`);

    button?.click();
  }
</script>

{#snippet Edit()}
  <DropdownMenuItem outline class="ActivityFolderHeaderToolbarDropdownMenuItemEdit" {onclick}>
    <span class="Icon">
      <Icon icon="material-symbols:edit-outline" />
    </span>
    Edit
  </DropdownMenuItem>
{/snippet}

{#if planType === PlanType.WEEK}
  {#if isAvailableDays}
    {@render Edit()}
  {/if}
{:else}
  {@render Edit()}
{/if}

<style lang="scss">
  :global(.ActivityFolderHeaderToolbarDropdownMenuItemEdit .Icon) {
    font-size: 1.3rem;
  }
</style>
