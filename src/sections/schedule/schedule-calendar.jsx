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
  Tooltip,
  IconButton,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import Iconify from 'src/components/iconify';

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: 'ic:round-view-module' },
  { value: 'timeGridWeek', label: 'Week', icon: 'ic:round-view-week' },
  { value: 'timeGridDay', label: 'Day', icon: 'ic:round-view-day' },
  { value: 'listWeek', label: 'Agenda', icon: 'ic:round-view-agenda' },
];

export default function ScheduleCalendar({ handleToggle, events, setSelectedEvent }) {
  const calendarRef = useRef(null);
  const [view, setView] = useState('dayGridMonth');
  const [date, setDate] = useState(new Date());

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
    handleToggle();
  };

  const handleSelectRange = (arg) => {
    handleToggle();
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

  return (
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
  );
}
