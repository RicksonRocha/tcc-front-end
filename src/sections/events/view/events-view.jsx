import * as yup from 'yup';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {
  Box,
  Link,
  Stack,
  Button,
  Dialog,
  Divider,
  Tooltip,
  Skeleton,
  TextField,
  IconButton,
  Breadcrumbs,
  DialogTitle,
  Autocomplete,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import Iconify from 'src/components/iconify';

import {
  useGetEventsQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} from 'src/api/event';
import { DateTimePicker } from '@mui/x-date-pickers';
import EventsCalendar from '../events-calendar';

const radioOptions = [
  { value: 'scheduled', label: 'Agendado' },
  { value: 'confirmed', label: 'Confirmado' },
  { value: 'completed', label: 'Concluído' },
  { value: 'canceled', label: 'Cancelado' },
];

const colorStatus = {
  scheduled: '#FFD700', // Amarelo para "Agendado"
  confirmed: '#2196F3', // Azul para "Confirmado"
  completed: '#4CAF50', // Verde para "Concluído"
  canceled: '#F44336', // Vermelho para "Cancelado"
};

export default function EventsView() {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const [createEvent, { isLoading: creating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: updating }] = useUpdateEventMutation();
  const [deleteEvent, { isLoading: deleting }] = useDeleteEventMutation();
  const { data, isFetching, refetch } = useGetEventsQuery();

  const handleToggle = () => {
    setOpen(!open);
  };

  const schema = yup.object().shape({
    title: yup.string().required('Título é um campo obrigatório'),
    description: yup.string().required('Descrição é um campo obrigatório'),
    start: yup.date().required('Início é um campo obrigatório'),
    end: yup.date().required('Fim é um campo obrigatório'),
    observation: yup.string().nullable(),
    responsible_id: yup.string().required('Responsável é um campo obrigatório'),
    group_id: yup.string().required('Núcleo é um campo obrigatório'),
    location: yup.string().required('Local é um campo obrigatório'),
    status: yup.string().required('Status é um campo obrigatório'),
  });

  const defaultValues = useMemo(
    () => ({
      title: selectedEvent?.title ?? null,
      description: selectedEvent?.extendedProps.description ?? null,
      observation: selectedEvent?.extendedProps.observation ?? null,
      location: selectedEvent?.extendedProps.location ?? null,
      status: selectedEvent?.extendedProps.status ?? null,
      group_id: selectedEvent?.extendedProps.group_id ?? null,
      responsible_id: selectedEvent?.extendedProps.responsible_id ?? null,
      start: selectedEvent?.start ?? null,
      end: selectedEvent?.end ?? null,
    }),
    [selectedEvent]
  );

  const defaultResponsible = useMemo(() => {
    const value = selectedEvent?.extendedProps?.responsible?.id;
    const label = selectedEvent?.extendedProps?.responsible?.name;
    return selectedEvent ? { value, label } : null;
  }, [selectedEvent]);

  const defaultGroup = useMemo(() => {
    const value = selectedEvent?.extendedProps?.group?.id;
    const label = selectedEvent?.extendedProps?.group?.name;
    return selectedEvent ? { value, label } : null;
  }, [selectedEvent]);

  const defaultStatus = useMemo(() => {
    const status = radioOptions.find((i) => i.value === selectedEvent?.extendedProps?.status);
    return status ?? null;
  }, [selectedEvent]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { isDirty, errors },
  } = methods;

  const onSubmit = async (payload) => {
    payload = {
      ...payload,
      start: format(payload.start, 'yyyy-MM-dd HH:mm'),
      end: format(payload.end, 'yyyy-MM-dd HH:mm'),
    };

    try {
      if (selectedEvent?.id) {
        await updateEvent({ id: selectedEvent.id, payload });
      } else {
        await createEvent(payload);
      }
    } catch (error) {
      console.log(error);
    }

    refetch();
    handleClose();
  };

  const handleDelete = async () => {
    if (selectedEvent?.id) {
      await deleteEvent(selectedEvent.id);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedEvent(null);
    handleToggle();
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);
  useEffect(() => {
    setEvents(data?.data?.map((i) => ({ ...i, color: colorStatus[i.status] })) ?? []);
  }, [data?.data]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Stack direction="column">
          <Typography variant="h4" mb={1}>
            Gestão de Eventos
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="text.primary" href="/">
              Dashboard
            </Link>

            <Typography color="inherit">Eventos</Typography>
            <Typography color="inherit">Lista</Typography>
          </Breadcrumbs>
        </Stack>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleToggle}
        >
          Novo
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          {isFetching ? (
            <Box sx={{ width: '100%', minHeight: '500px' }}>
              <Grid container spacing={2}>
                {Array.from({ length: 5 }).map((_, weekIndex) => (
                  <Grid container item xs={12} key={weekIndex} spacing={1}>
                    {Array.from({ length: 7 }).map((sk, dayIndex) => (
                      <Grid item xs={12 / 7} key={dayIndex}>
                        <Skeleton variant="rectangular" height={80} />
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <EventsCalendar
              handleToggle={handleToggle}
              events={events}
              setSelectedEvent={setSelectedEvent}
            />
          )}
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog fullWidth maxWidth="md" open={open} onClose={handleToggle}>
          <DialogTitle>{selectedEvent ? 'Editar' : 'Criar'} evento</DialogTitle>
          <DialogContent>
            <Grid container item spacing={2} mt={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="title"
                  label="Título"
                  required
                  {...register('newPassword')}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DateTimePicker name="start" label="Início" size="small" required />
              </Grid>
              <Grid item xs={12} md={3}>
                <DateTimePicker name="end" label="Fim" size="small" required />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="description"
                  label="Descrição"
                  size="small"
                  required
                  {...register('newPassword')}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="location"
                  label="Local"
                  size="small"
                  required
                  {...register('newPassword')}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="observation"
                  label="Observação"
                  size="small"
                  {...register('newPassword')}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  name="status"
                  label="Status"
                  required
                  size="small"
                  options={radioOptions}
                  defaultValue={defaultStatus}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            {selectedEvent && (
              <>
                <IconButton onClick={handleDelete} disabled={deleting}>
                  {deleting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Tooltip title="Excluir">
                      <Iconify icon="fluent:delete-28-regular" color="red" />
                    </Tooltip>
                  )}
                </IconButton>
                <Divider orientation="vertical" flexItem variant="middle" />
              </>
            )}

            <Button variant="soft" onClick={handleClose}>
              Cancelar
            </Button>
            <LoadingButton
              loading={creating || updating}
              variant="contained"
              type="submit"
              disabled={!isDirty}
              onClick={handleSubmit(onSubmit)}
            >
              Salvar
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </form>
    </Container>
  );
}
