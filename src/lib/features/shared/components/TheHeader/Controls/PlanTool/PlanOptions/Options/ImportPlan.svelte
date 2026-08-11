<script lang="ts">
  import { DropdownMenuItem } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';

  async function onclick() {
    const filPicker = document.getElementById('TheHeaderImportGadgetInput') as
      HTMLInputElement | undefined;

    filPicker?.showPicker();
  }
</script>

<DropdownMenuItem outline class="ImportPlanDropdownMenuItem" {onclick}>
  <span class="Icon">
    <Icon icon="material-symbols:upload-rounded" />
  </span>
  Import plan
</DropdownMenuItem>

<style lang="scss">
  :global(.ImportPlanDropdownMenuItem .Icon) {
    font-size: 1.4rem;
  }
</style>
