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

export default function MyTeamForm({ teamId }) {
  const [isClosed, setIsClosed] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { data: teamData } = useGetTeamByIdQuery(teamId, { skip: !teamId });
  const { data: teams = [] } = useGetTeamsQuery();
  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();
  const {
    data: students = [],
    isLoading: isLoadingStudents,
    isError,
    error,
  } = useGetStudentsQuery();

  const {
    data: teachers = [],
    isLoading: isLoadingTeachers,
    isError: isTeachersError,
    error: teachersError,
  } = useGetTeachersQuery();

  const {
    data: professorPreferences = [],
    isLoading: isLoadingPreferences,
    isError: isPrefError,
  } = useGetProfessorPreferencesQuery();

  const { push } = useRouter();

  const user = useSelector((state) => state.auth.auth.user);

  useEffect(() => {
    if (isError) {
      let msg = `Erro ao carregar estudantes: ${error?.message || 'Erro desconhecido.'}`;
      if (error.status === 403) {
        msg = `${msg} Você não tem permissão para acessar os conteúdo.`;
      }
      setSuccessMessage(msg);
    } else if (!isLoadingStudents && students.length === 0) {
      setSuccessMessage('Nenhum estudante encontrado.');
    } else {
      setSuccessMessage('');
    }
  }, [students, isLoadingStudents, isError, error]);

  useEffect(() => {
    if (isTeachersError) {
      let msg = `Erro ao carregar Professores: ${teachersError?.message || 'Erro desconhecido.'}`;
      if (teachersError.status === 403) {
        msg = `${msg} Você não tem permissão para acessar os dados dos Professores.`;
      }
      setSuccessMessage(msg);
    } else if (!isLoadingTeachers && teachers.length === 0) {
      setSuccessMessage('Nenhum Professor encontrado.');
    } else {
      setSuccessMessage('');
    }
  }, [teachers, isLoadingTeachers, isTeachersError, teachersError]);

  const sortedStudents = students
    .filter((student) => student?.name)
    .sort((a, b) => a.name.localeCompare(b.name));

  const preferenceMap = professorPreferences.reduce((map, pref) => {
    map[pref.user_id] = pref;
    return map;
  }, {});

  const availableTeachers = teachers.filter((teacher) => {
    const preference = preferenceMap[teacher.id];
    return preference && preference.disponivelOrientacao?.toLowerCase() === 'sim';
  });

  const sortedTeachers = availableTeachers
    .filter((teacher) => teacher?.name)
    .sort((a, b) => a.name.localeCompare(b.name));

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
    if (!teamData && user && user.name) {
      setValue('members', [user.name]);
    }
  }, [teamData, user, setValue]);

  useEffect(() => {
    if (teamData) {
      reset({
        tccTitle: teamData.name || '',
        tccDescription: teamData.description || '',
        members: teamData.members || [],
        advisor: teamData.teacherTcc || '',
        temasDeInteresse: teamData.themes || [],
      });
      setIsClosed(teamData.isActive || false);
    }
  }, [teamData, reset]);

  const onSubmit = async (data) => {
    if (
      teams &&
      data.members.some((member) =>
        teamId
          ? teams.some(
              (team) => team.id !== teamId && team.members && team.members.includes(member)
            )
          : teams.some((team) => team.members && team.members.includes(member))
      )
    ) {
      setSuccessMessage('1 ou mais membros já fazem parte de outra equipe de TCC!');
      return;
    }

    let membersList = data.members || [];
    if (!membersList.includes(user.name)) {
      membersList = [...membersList, user.name];
    }

    const formData = {
      name: data.tccTitle,
      description: data.tccDescription,
      isActive: isClosed,
      teacherTcc: data.advisor,
      members: membersList,
      themes: data.temasDeInteresse,
      createdById: user.id,
      createdByEmail: user.email,
    };

    try {
      if (teamId) {
        await updateTeam({ id: teamId, ...formData }).unwrap();
        setSuccessMessage('Equipe atualizada com sucesso!');
      } else {
        await createTeam(formData).unwrap();
        setSuccessMessage('Equipe criada com sucesso!');
      }
      setTimeout(() => push(teamId ? '/' : '/equipes'), 3000);
    } catch (err) {
      setSuccessMessage(`Erro ao salvar equipe: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      if (teamId) {
        await deleteTeam(teamId).unwrap();
        setSuccessMessage('Equipe excluída com sucesso!');
        setTimeout(() => push('/'), 3000);
      }
    } catch (err) {
      setSuccessMessage(`Erro ao excluir equipe: ${err.message}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Card sx={{ p: 3, width: '50vw', maxWidth: '50vw', overflowX: 'hidden', overflowY: 'visible' }}>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Formulário
        </Typography>

        {successMessage && (
          <Alert severity={successMessage.includes('sucesso') ? 'success' : 'error'} sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                label="Título do TCC"
                fullWidth
                {...register('tccTitle')}
                InputLabelProps={{ shrink: true }}
                error={!!errors.tccTitle}
                helperText={errors.tccTitle?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descrição da Proposta"
                fullWidth
                multiline
                rows={3}
                {...register('tccDescription')}
                InputLabelProps={{ shrink: true }}
                error={!!errors.tccDescription}
                helperText={errors.tccDescription?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="members"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    options={sortedStudents.map((student) => student.name)}
                    loading={isLoadingStudents}
                    freeSolo={false}
                    value={field.value}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nomes dos Integrantes"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.members}
                        helperText={
                          errors.members?.message || (isLoadingStudents ? 'Carregando...' : '')
                        }
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="advisor"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={sortedTeachers}
                    getOptionLabel={(teacher) => teacher.name}
                    loading={isLoadingTeachers || isLoadingPreferences}
                    value={sortedTeachers.find((teacher) => teacher.id === field.value) || null}
                    onChange={(event, newValue) => field.onChange(newValue ? newValue.id : null)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Orientador(a)"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.advisor}
                        helperText={
                          errors.advisor?.message ||
                          (isLoadingTeachers || isLoadingPreferences
                            ? 'Carregando professores...'
                            : sortedTeachers.length === 0
                            ? 'Nenhum(a) professor(a) disponível.'
                            : '')
                        }
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.temasDeInteresse} sx={{ minHeight: 40, width: '100%' }}>
                <InputLabel shrink>Temas de Interesse</InputLabel>
                <Select
                  label="Temas de Interesse"
                  multiple
                  value={temasDeInteresse}
                  onChange={(e) => {
                    const selected = e.target.value;
                    if (selected.length <= 3) {
                      setValue('temasDeInteresse', selected, { shouldValidate: true });
                    }
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {selected.join(', ')}
                    </Box>
                  )}
                  sx={{
                    width: '100%',
                    '& .MuiSelect-select': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                  }}
                >
                  {TEMAS_TCC_OPTIONS.map((tema) => (
                    <MenuItem key={tema} value={tema}>
                      <Checkbox checked={temasDeInteresse.includes(tema)} />
                      {tema}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.temasDeInteresse && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors.temasDeInteresse?.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Switch
                  checked={isClosed}
                  onChange={(event) => setIsClosed(event.target.checked)}
                  disabled={members.length < 2}
                />
                <Typography color="#6c7b88" sx={{ fontSize: '16px' }}>
                  Fechar Equipe {members.length < 2 && '(Requer ao menos 2 membros)'}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ alignSelf: 'center', mt: 2, px: 3, fontSize: '16px' }}
              onClick={() => push(teamId ? '/' : '/equipes')}
            >
              Voltar
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              sx={{ alignSelf: 'center', mt: 2, px: 3, fontSize: '16px' }}
            >
              Salvar
            </LoadingButton>
            {teamId && (
              <Button
                variant="contained"
                color="error"
                sx={{ alignSelf: 'center', mt: 2, px: 3, fontSize: '16px' }}
                onClick={handleDelete}
              >
                Excluir
              </Button>
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