import { Button, Container, Stack, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

import ScheduleCalendar from '../schedule-calendar';

export default function ScheduleView() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Cronograma</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Nova agenda
        </Button>
      </Stack>

      <ScheduleCalendar />
    </Container>
  );
}
