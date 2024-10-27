import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaTeamForm from 'src/hooks/form/my-team-form';
import Alert from '@mui/material/Alert';
import { useGetTeamByIdQuery, useCreateTeamMutation, useUpdateTeamMutation } from 'src/api/team';

export default function MyTeamForm({ teamId }) {
  const [isClosed, setIsClosed] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [advisorValue, setAdvisorValue] = useState('');

  // Obtém dados da equipe pelo ID
  const { data: teamData } = useGetTeamByIdQuery(teamId, { skip: !teamId });
  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();

  const { control, register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    resolver: yupResolver(schemaTeamForm),
    defaultValues: {
      tccTitle: '',
      tccDescription: '',
      members: [],
      advisor: '',
    },
  });

  const members = watch('members');

  // Carrega os dados da equipe no formulário ao receber `teamData`
  useEffect(() => {
    if (teamData) {
      reset({
        tccTitle: teamData.name || '',
        tccDescription: teamData.description || '',
        members: teamData.integrantes || [],
        advisor: teamData.orientador || '',
      });
      setIsClosed(teamData.isActive || false);
      setAdvisorValue(teamData.orientador || '');
    }
  }, [teamData, reset]);

  const onSubmit = async (data) => {
    const formData = {
      name: data.tccTitle,
      description: data.tccDescription,
      isActive: isClosed,
      orientador: advisorValue,
      integrantes: data.members,
    };

    try {
      if (teamId) {
        await updateTeam({ id: teamId, ...formData }).unwrap();
        setSuccessMessage('Equipe atualizada com sucesso!');
      } else {
        await createTeam(formData).unwrap();
        setSuccessMessage('Equipe criada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar equipe:', error);
      setSuccessMessage(`Erro ao salvar equipe: ${error.message}`);
    }

    setTimeout(() => setSuccessMessage(''), 3000); // Limpa a mensagem após 3 segundos
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, px: 2 }}>
      <Card sx={{ p: 3, width: '100%', maxWidth: 800, overflow: 'auto' }}>
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
                error={!!errors.tccTitle}
                helperText={errors.tccTitle?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descrição da Proposta"
                fullWidth
                multiline
                rows={4}
                {...register('tccDescription')}
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
                    options={[]}
                    freeSolo
                    value={field.value}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nomes dos Integrantes"
                        error={!!errors.members}
                        helperText={errors.members?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Orientador(a)"
                fullWidth
                value={advisorValue}
                onChange={(event) => setAdvisorValue(event.target.value)}
                error={!!errors.advisor}
                helperText={errors.advisor?.message}
              />
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

          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              sx={{ maxWidth: 300, fontSize: '16px' }}
            >
              Salvar
            </LoadingButton>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}

MyTeamForm.propTypes = {
  teamId: PropTypes.number,
};

