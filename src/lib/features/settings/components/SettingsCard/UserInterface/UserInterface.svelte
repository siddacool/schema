<script>
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import Theme from './Theme.svelte';
  import DateFormat from './DateFormat.svelte';
</script>

<Column>
  <Grid gap={3}>
    <Theme />
    <DateFormat />
  </Grid>
</Column>
