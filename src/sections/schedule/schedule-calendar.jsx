import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useRef, useState, useEffect } from 'react';
import interactionPlugin from '@fullcalendar/interaction';

import {
  Box,
  Card,
  Stack,
  Button,
  Dialog,
  Tooltip,
  IconButton,
  Typography,
  ToggleButton,
  DialogContent,
  ToggleButtonGroup,
} from '@mui/material';

import { useToggle } from 'src/hooks/use-toggle';

import Iconify from 'src/components/iconify';

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: 'ic:round-view-module' },
  { value: 'timeGridWeek', label: 'Week', icon: 'ic:round-view-week' },
  { value: 'timeGridDay', label: 'Day', icon: 'ic:round-view-day' },
  { value: 'listWeek', label: 'Agenda', icon: 'ic:round-view-agenda' },
];

export default function ScheduleCalendar() {
  const { toggle: toggleEvent, handleToggle: handleToggleEvent } = useToggle();

  const calendarRef = useRef(null);
  const [view, setView] = useState('dayGridMonth');
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleDropEvent = async ({ event }) => {};

  const handleSelectEvent = (arg) => {
    setSelectedEvent(arg.event);
    handleToggleEvent();
  };

  const handleSelectRange = (arg) => {
    handleToggleEvent();
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
  };

  const handleClickDatePrevNext = (mode) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi[mode]();
      setDate(calendarApi.getDate());
    }
  };

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = 'dayGridMonth';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [calendarRef, setView]);

  const events = [
    {
      id: 1,
      allDay: false,
      color: '#00AB55',
      description: 'Engenharia de Requisitos',
      start: new Date(),
      end: new Date(),
      title: 'Reunião com Orientador',
    },
  ];

  return (
    <>
      <Card>
        <Box
          sx={{
            m: 2,
            gap: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ToggleButtonGroup
            size="small"
            color="primary"
            value={view}
            exclusive
            onChange={(_, viewOption) => handleChangeView(viewOption)}
          >
            {VIEW_OPTIONS.map((viewOption) => (
              <Tooltip key={viewOption.value} title={viewOption.label}>
                <ToggleButton
                  size="small"
                  value={view}
                  selected={viewOption.value === view}
                  onChange={() => handleChangeView(viewOption.value)}
                >
                  <Iconify icon={viewOption.icon} />
                </ToggleButton>
              </Tooltip>
            ))}
          </ToggleButtonGroup>

          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={() => handleClickDatePrevNext('prev')}>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>

            <Typography variant="h6">{date.toDateString()}</Typography>

            <IconButton onClick={() => handleClickDatePrevNext('next')}>
              <Iconify icon="eva:arrow-ios-forward-fill" />
            </IconButton>
          </Stack>

          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => handleClickDatePrevNext('today')}
          >
            Hoje
          </Button>
        </Box>

        <Box m={2}>
          <FullCalendar
            weekends
            editable
            droppable
            selectable
            allDayMaintainDuration
            eventResizableFromStart
            events={events}
            initialEvents={events}
            ref={calendarRef}
            initialDate={date}
            initialView={view}
            dayMaxEventRows={3}
            eventDisplay="block"
            headerToolbar={false}
            select={handleSelectRange}
            eventDrop={handleDropEvent}
            eventClick={handleSelectEvent}
            eventResize={() => {}}
            height="auto"
            plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
          />
        </Box>
      </Card>

      <Dialog fullWidth maxWidth="md" open={toggleEvent} onClose={handleToggleEvent}>
        <DialogContent sx={{ py: 3 }}>
          {selectedEvent && (
            <p>Formulário do Cronograma</p>
            //   <ScheduleEventForm
            //     scheduleEventId={selectedEvent.id}
            //     onCancel={handleToggleEvent}
            //     onSave={handleToggleEvent}
            //   />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
