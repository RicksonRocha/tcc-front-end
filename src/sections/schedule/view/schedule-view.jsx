import { useState } from 'react';

import { Stack, Button, Dialog, Container, Typography, DialogContent } from '@mui/material';

import { useToggle } from 'src/hooks/use-toggle';

import Iconify from 'src/components/iconify';

import ScheduleForm from '../schedule-form';
import ScheduleCalendar from '../schedule-calendar';

export default function ScheduleView() {
  const { toggle, handleToggle } = useToggle();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Cronograma</Typography>

        <Button
          onClick={handleToggle}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Nova agenda
        </Button>
      </Stack>

      <ScheduleCalendar
        handleToggle={handleToggle}
        events={events}
        setEvents={setEvents}
        setSelectedEvent={setSelectedEvent}
      />

      <Dialog fullWidth maxWidth="md" open={toggle} onClose={handleToggle}>
        <DialogContent sx={{ py: 3 }}>
          <ScheduleForm
            handleToggle={handleToggle}
            events={events}
            setEvents={setEvents}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
