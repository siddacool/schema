<script>
  import { modals } from '@flightlesslabs/dodo-ui-bits';
  import BaseAddButton from './BaseAddButton.svelte';

  function onclick() {
    modals.add('inform', {
      title: 'Read mode on',
      description: `Read mode is on. Can't add a new activity`,
    });
  }
</script>

<BaseAddButton preventAdd {onclick} />
