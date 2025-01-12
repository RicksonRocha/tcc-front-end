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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaTeamForm from 'src/hooks/form/my-team-form';
import { useGetTeamByIdQuery, useCreateTeamMutation, useUpdateTeamMutation } from 'src/api/team';
import { TEMAS_TCC_OPTIONS } from 'src/constants/constants';
import { useRouter } from 'src/routes/hooks/use-router';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

export default function MyTeamForm({ teamId }) {
  const [isClosed, setIsClosed] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [advisorValue, setAdvisorValue] = useState('');

  const { data: teamData } = useGetTeamByIdQuery(teamId, { skip: !teamId });
  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const { push } = useRouter();

  // Obtém o email do usuário logado a partir do estado global
  const userEmail = useSelector((state) => state.auth.auth.email);

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
    if (teamData) {
      reset({
        tccTitle: teamData.name || '',
        tccDescription: teamData.description || '',
        members: teamData.members || [],
        advisor: teamData.teacherTcc || '',
        temasDeInteresse: teamData.themes || [],
      });
      setIsClosed(teamData.isActive || false);
      setAdvisorValue(teamData.teacherTcc || '');
    }
  }, [teamData, reset]);

  const onSubmit = async (data) => {
    const formData = {
      name: data.tccTitle,
      description: data.tccDescription,
      isActive: isClosed,
      teacherTcc: advisorValue,
      members: data.members,
      themes: data.temasDeInteresse,
      createdBy: userEmail, // Inclui o usuário logado como criador da equipe
    };

    try {
      if (teamId) {
        await updateTeam({ id: teamId, ...formData }).unwrap();
        setSuccessMessage('Equipe atualizada com sucesso!');
      } else {
        await createTeam(formData).unwrap();
        setSuccessMessage('Equipe criada com sucesso!');
      }

      // Aguarda 2 segundos antes de redirecionar
      setTimeout(() => {
        push('/equipes');
      }, 3000);
    } catch (error) {
      console.error('Erro ao salvar equipe:', error);
      setSuccessMessage(`Erro ao salvar equipe: ${error.message}`);
    }

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, px: 2 }}>
      <Card sx={{ p: 3, width: '100%', maxWidth: '100%', overflow: 'auto' }}>
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
                InputLabelProps={{ shrink: true }} // Garante que o label não sobreponha
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
                InputLabelProps={{ shrink: true }} // Adicionado para corrigir sobreposição
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
                        InputLabelProps={{ shrink: true }} // Adicionado para corrigir sobreposição
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
                InputLabelProps={{ shrink: true }} // Adicionado para corrigir sobreposição
                error={!!errors.advisor}
                helperText={errors.advisor?.message}
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
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              sx={{ maxWidth: 300, fontSize: '16px' }}
              onClick={() => push('/equipes')} // Redireciona para a tela de equipes
            >
              Voltar
            </Button>
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




