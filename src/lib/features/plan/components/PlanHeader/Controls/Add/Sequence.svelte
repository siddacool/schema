<script>
  import BaseAddButton from './BaseAddButton.svelte';

  function onclick() {
    const button = document.getElementById('ActivityFolderMainCreateButton');

    button?.click();
  }
</script>

<BaseAddButton {onclick} />
