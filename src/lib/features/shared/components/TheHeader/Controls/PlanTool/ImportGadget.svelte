<script lang="ts">
  import { importPlan } from '$lib/features/plan/logic/import.svelte';
  import type { ExportPlanData } from '$lib/features/plan/types/export';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';

  async function handleImport(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    try {
      const data = JSON.parse(await file.text()) as ExportPlanData;

      await importPlan(data);

      toasts.add({
        title: 'Success',
        description: 'Plan imported successfully',
        color: 'primary',
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Error',
        description: message,
        color: 'danger',
      });
    } finally {
      input.value = '';
    }
  }
</script>

<input
  id="TheHeaderImportGadgetInput"
  type="file"
  accept=".json,.schema"
  hidden
  onchange={handleImport}
/>

<style lang="scss">
  input {
    position: absolute;
    z-index: -200;
  }
</style>
