import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaTeamForm from 'src/hooks/form/my-team-form';
import {
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useGetTeamsQuery,
} from 'src/api/team';
import { TEMAS_TCC_OPTIONS } from 'src/constants/constants';
import { useRouter } from 'src/routes/hooks/use-router';
import { useGetStudentsQuery, useGetTeachersQuery } from 'src/api/user';
import { useGetProfessorPreferencesQuery } from 'src/api/preference-prof';
import { useSnackbar } from 'notistack';

export default function MyTeamForm({ teamId }) {
  const [isClosed, setIsClosed] = useState(false);
  const { data: teamData } = useGetTeamByIdQuery(teamId, { skip: !teamId });
  const { data: teams = [] } = useGetTeamsQuery();
  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();
  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTeamMutation();
  const { data: students = [], isLoading: isLoadingStudents } = useGetStudentsQuery();
  const { data: teachers = [], isLoading: isLoadingTeachers } = useGetTeachersQuery();
  const { data: professorPreferences = [], isLoading: isLoadingPreferences } =
    useGetProfessorPreferencesQuery();
  const { push } = useRouter();
  const user = useSelector((state) => state.auth.auth.user);

  const { enqueueSnackbar } = useSnackbar();

  const sortedStudents = students
    .filter((s) => s.name)
    .map((s) => ({ userId: s.id, userName: s.name }));

  const preferenceMap = professorPreferences.reduce((map, pref) => {
    map[pref.user_id] = pref;
    return map;
  }, {});

  const availableTeachers = teachers.filter((teacher) => {
    const pref = preferenceMap[teacher.id];
    return pref && pref.availableForAdvising?.toLowerCase() === 'sim';
  });

  const sortedTeachers = availableTeachers
    .map((t) => ({ userId: t.id, userName: t.name }))
    .sort((a, b) => a.userName.localeCompare(b.userName));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schemaTeamForm),
    defaultValues: {
      tccTitle: '',
      tccDescription: '',
      members: [],
      advisor: '',
      temasDeInteresse: [],
    },
  });

  const members = watch('members');
  const temasDeInteresse = watch('temasDeInteresse') || [];

  useEffect(() => {
    if (!teamData && user?.id && user?.name) {
      setValue('members', [{ userId: user.id, userName: user.name }]);
    }
  }, [teamData, user, setValue]);

  useEffect(() => {
    if (teamData) {
      reset({
        tccTitle: teamData.name || '',
        tccDescription: teamData.description || '',
        members:
          teamData.members?.map((m) =>
            typeof m === 'string' ? { userId: null, userName: m } : m
          ) || [],
        advisor: teamData.teacherTcc || '',
        temasDeInteresse: teamData.themes || [],
      });
      setIsClosed(teamData.isActive || false);
    }
  }, [teamData, reset]);

  const onSubmit = async (data) => {
    const currentTeamId = teamId;
    const memberIds = data.members.map((m) => m.userId);
    const memberNames = data.members.map((m) => m.userName);

    const memberAlreadyInOtherTeam = memberNames.some((name) =>
      teams.some(
        (team) =>
          team.id !== currentTeamId && team.members?.some((m) => m.userName === name || m === name)
      )
    );

    if (memberAlreadyInOtherTeam) {
      enqueueSnackbar('1 ou mais membros já fazem parte de outra equipe de TCC!', {
        variant: 'warning',
      });
      return;
    }

    // Garante que o criador esteja incluído
    if (!memberIds.includes(user.id)) {
      data.members.push({ userId: user.id, userName: user.name });
    }

    const formData = {
      name: data.tccTitle,
      description: data.tccDescription,
      isActive: isClosed,
      teacherTcc: data.advisor ? Number(data.advisor) : null,
      members: data.members.map((m) => ({
        userId: m.userId,
        userName: m.userName,
      })),
      themes: data.temasDeInteresse,
      createdById: user.id,
      createdByEmail: user.email,
    };

    try {
      if (teamId) {
        await updateTeam({ id: teamId, ...formData }).unwrap();
        enqueueSnackbar('Equipe atualizada com sucesso!', { variant: 'success' });
      } else {
        await createTeam(formData).unwrap();
        enqueueSnackbar('Equipe criada com sucesso!', { variant: 'success' });
      }
      setTimeout(() => push(teamId ? '/' : '/equipes'), 3000);
    } catch (err) {
      enqueueSnackbar(`Erro ao salvar equipe: ${err.message}`, { variant: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      if (teamId) {
        await deleteTeam(teamId).unwrap();
        enqueueSnackbar('Equipe excluída com sucesso!', { variant: 'success' });
        setTimeout(() => push('/'), 3000);
      }
    } catch (err) {
      enqueueSnackbar(`Erro ao excluir equipe: ${err.message}`, { variant: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Card sx={{ p: 3, width: '50vw', maxWidth: '50vw', overflowX: 'hidden' }}>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          {teamId ? 'Edição de equipe' : 'Criação de equipe'}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                label="Título do TCC"
                fullWidth
                {...register('tccTitle')}
                error={!!errors.tccTitle}
                helperText={errors.tccTitle?.message}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Descrição da Proposta"
                fullWidth
                multiline
                rows={3}
                {...register('tccDescription')}
                error={!!errors.tccDescription}
                helperText={errors.tccDescription?.message}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                name="members"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    options={sortedStudents}
                    getOptionLabel={(option) => option.userName}
                    isOptionEqualToValue={(a, b) => a.userId === b.userId}
                    value={field.value}
                    onChange={(e, newValue) => field.onChange(newValue)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={option.userName}
                          label={option.userName}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nomes dos Integrantes"
                        error={!!errors.members}
                        helperText={errors.members?.message || ''}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                name="advisor"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={sortedTeachers}
                    getOptionLabel={(t) => t.userName}
                    isOptionEqualToValue={(a, b) => a.userId === b.userId}
                    value={sortedTeachers.find((t) => t.userId === field.value) || null}
                    onChange={(e, newValue) => field.onChange(newValue ? newValue.userId : null)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Orientador(a)"
                        error={!!errors.advisor}
                        helperText={errors.advisor?.message || ' '}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth error={!!errors.temasDeInteresse}>
                <InputLabel shrink>Temas de Interesse</InputLabel>
                <Select
                  multiple
                  value={temasDeInteresse}
                  onChange={(e) => {
                    const selected = e.target.value;
                    if (selected.length <= 3) {
                      setValue('temasDeInteresse', selected, { shouldValidate: true });
                    }
                  }}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {TEMAS_TCC_OPTIONS.map((tema) => (
                    <MenuItem key={tema} value={tema}>
                      <Checkbox checked={temasDeInteresse.includes(tema)} />
                      {tema}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Switch
                  checked={isClosed}
                  onChange={(e) => setIsClosed(e.target.checked)}
                  disabled={members.length < 2}
                />
                <Typography color="#6c7b88">
                  Fechar Equipe {members.length < 2 && '(Requer ao menos 2 membros)'}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => push(teamId ? '/' : '/equipes')}
            >
              Voltar
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isCreating || isUpdating}
            >
              Salvar
            </LoadingButton>
            {teamId && (
              <LoadingButton
                variant="contained"
                color="error"
                onClick={handleDelete}
                loading={isDeleting}
              >
                Excluir
              </LoadingButton>
            )}
          </Stack>
        </form>
      </Card>
    </Box>
  );
}

MyTeamForm.propTypes = {
  teamId: PropTypes.number,
};
