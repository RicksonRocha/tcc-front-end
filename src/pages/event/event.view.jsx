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
  Select,
  Divider,
  Tooltip,
  Skeleton,
  MenuItem,
  TextField,
  IconButton,
  Breadcrumbs,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Card,
} from '@mui/material';

import Iconify from 'src/components/iconify';

import { DateTimePicker } from '@mui/x-date-pickers';
import EventsCalendar from 'src/sections/events/events-calendar';
import Label from 'src/components/label';

export default function EventsView(props) {
  const {
    handleToggle,
    handleClose,
    events,
    isFetching,
    methods,
    onSubmit,
    selectedEvent,
    handleDelete,
    deleting,
    setSelectedEvent,
    open,
    creating,
    updating,
    refetch,
    isTeacher,
    myTeam,
  } = props;

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = methods;

  const renderCalendar = myTeam ? (
    <EventsCalendar
      handleToggle={handleToggle}
      events={events}
      setSelectedEvent={setSelectedEvent}
      refetch={refetch}
    />
  ) : (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3, mt: 3 }}>
      <Stack
        sx={{
          height: '50vh',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="18" sx={{ mb: 2 }}>
          Você precisa estar em uma equipe para ter acesso à esse recurso🔎
          <br />
          Na aba{' '}
          <strong>
            <em>Equipes</em>
          </strong>{' '}
          é possível visualizar todos os grupos disponíveis!
        </Typography>
      </Stack>
    </Card>
  );

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
          disabled={isTeacher || !myTeam}
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
            renderCalendar
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
                  name="name"
                  label="Nome"
                  required
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="description"
                  label="Descrição"
                  required
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DateTimePicker
                  name="startDate"
                  label="Início"
                  size="small"
                  required
                  {...register('startDate')}
                  value={watch('startDate')}
                  onChange={(e) => {
                    setValue('startDate', e, { shouldDirty: true });
                  }}
                  error={!!errors?.startDate}
                  helperText={errors.startDate?.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DateTimePicker
                  name="endDate"
                  label="Fim"
                  size="small"
                  required
                  {...register('endDate')}
                  value={watch('endDate')}
                  onChange={(e) => {
                    setValue('endDate', e, { shouldDirty: true });
                  }}
                  error={!!errors?.endDate}
                  helperText={errors.endDate?.message}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6} container alignItems="center">
                <Grid item xs={6} md={2}>
                  Ativo?
                </Grid>
                <Grid item xs={12} md={4}>
                  <Select
                    fullWidth
                    name="isActive"
                    {...register('isActive')}
                    value={watch('isActive')}
                    error={!!errors?.isActive}
                    helperText={errors.isActive?.message}
                  >
                    <MenuItem value>Sim</MenuItem>
                    <MenuItem value={false}>Não</MenuItem>
                  </Select>
                </Grid>
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
