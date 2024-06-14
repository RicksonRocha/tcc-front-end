import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Card, Grid, Button, Typography } from '@mui/material';

import { RHFDate, FormProvider, RHFTextField } from 'src/components/hook-form';

import AnalyticsTasks from '../overview/app-tasks';

export default function ScheduleForm({
  handleToggle,
  events,
  setEvents,
  selectedEvent,
  setSelectedEvent,
}) {
  const schema = yup.object().shape({
    title: yup.string().required('Nome é um campo obrigatório'),
    description: yup.string().required('Descrição é um campo obrigatório'),
    date: yup.date().required('Data é um campo obrigatório'),
  });

  const defaultValues = useMemo(
    () =>
      selectedEvent
        ? {
            allDay: false,
            color: '#00AB55',
            description: selectedEvent.extendedProps.description ?? '',
            date: selectedEvent.start ?? '',
            title: selectedEvent.title ?? '',
          }
        : {},
    [selectedEvent]
  );

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    if (!selectedEvent) {
      setEvents((evs) => [
        ...evs,
        {
          id: uuidv4(),
          allDay: false,
          color: '#00AB55',
          description: data.description,
          start: data.date,
          end: data.date,
          title: data.title,
        },
      ]);
    } else {
      const updatedEvents = events.map((ev) => {
        if (ev.id === selectedEvent.id) {
          return {
            ...ev,
            description: data.description,
            start: data.date,
            end: data.date,
            title: data.title,
          };
        }
        return ev;
      });

      setEvents(updatedEvents);
    }
    handleToggle();
    reset();
  };

  const handleDelete = () => {
    const newEvents = events.filter((ev) => ev.id !== selectedEvent.id);
    setEvents(newEvents);
    handleToggle();
  };

  const handleCancel = () => {
    setSelectedEvent(null);
    handleToggle();
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  console.log(selectedEvent);

  return (
    <Card sx={{ p: 2 }}>
      <Grid container item justifyContent="space-between">
        <Typography variant="h4">{`${!selectedEvent ? 'Criar' : 'Editar'} agenda`}</Typography>
        {selectedEvent && (
          <Button onClick={handleDelete} variant="contained" color="error">
            Excluir evento
          </Button>
        )}
      </Grid>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container item spacing={2} mt={2}>
          <Grid item md={12}>
            <RHFTextField name="title" label="Título" />
          </Grid>
          <Grid item md={12}>
            <RHFTextField name="description" label="Descrição" />
          </Grid>

          <Grid item md={12}>
            <RHFDate name="date" label="Data" />
          </Grid>

          <Grid xs={12} md={12}>
            <AnalyticsTasks
              title="Propostas na reunião"
              list={[
                { id: '1', name: 'Create FireStone Logo' },
                { id: '2', name: 'Add SCSS and JS files if required' },
                { id: '3', name: 'Stakeholder Meeting' },
                { id: '4', name: 'Scoping & Estimations' },
                { id: '5', name: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
        <Grid item container mt={1} spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button type="submit" color="success" variant="contained">
              Salvar
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleCancel} color="warning" variant="outlined">
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
}
