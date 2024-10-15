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
import { useTheme } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaTeamForm from 'src/hooks/form/my-team-form';
import { useRouter } from 'src/routes/hooks/use-router';
import Alert from '@mui/material/Alert';

export default function MyTeamForm() {
  const theme = useTheme();
  const { push } = useRouter();

  const [isClosed, setIsClosed] = useState(false); // Estado para "Fechar equipe"
  const [successMessage, setSuccessMessage] = useState(''); // Mensagem de sucesso
  const [advisorValue, setAdvisorValue] = useState(''); // Estado para capturar o valor do orientador

  // Configurando o useForm
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schemaTeamForm),
    defaultValues: {
      tccTitle: '',
      tccDescription: '',
      members: [],
      advisor: '',
    },
  });

  const members = watch('members');

  // Recuperar os dados salvos do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('teamData');

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset({
        tccTitle: parsedData.tccTitle || '',
        tccDescription: parsedData.tccDescription || '',
        members: parsedData.members || [],
        advisor: parsedData.advisor || '',
      });
      setIsClosed(parsedData.isClosed || false); // Atualiza o estado do switch
      setAdvisorValue(parsedData.advisor || ''); // Atualiza o valor do orientador
    }
  }, [reset]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      isClosed,
      advisor: advisorValue, // Salvar o valor do orientador capturado
    };

    // Salvar os dados no localStorage
    localStorage.setItem('teamData', JSON.stringify(formData));

    // Exibir a mensagem de sucesso
    setSuccessMessage('Cadastro salvo com sucesso no localStorage!');

    // Resetar o formulário
    reset({
      tccTitle: '',
      tccDescription: '',
      members: [],
      advisor: '',
    });
    setIsClosed(false); // Resetar o switch
    setAdvisorValue(''); // Resetar o orientador
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
        px: 2, 
      }}
    >
      <Card sx={{ p: 3, width: '100%', maxWidth: 800, overflow: 'auto' }}>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Formulário
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Campo para Título do TCC */}
            <Grid item xs={12}>
              <TextField
                label="Título do TCC"
                fullWidth
                {...register('tccTitle')}
                error={!!errors.tccTitle}
                helperText={errors.tccTitle?.message}
              />
            </Grid>

            {/* Campo para Descrição */}
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

            {/* Campo para listagem de nomes dos integrantes */}
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

            {/* Campo para o nome do orientador */}
            <Grid item xs={12}>
              <TextField
                label="Orientador(a)"
                fullWidth
                value={advisorValue} // Valor do orientador controlado por estado
                onChange={(event) => setAdvisorValue(event.target.value)} // Capturar valor
                error={!!errors.advisor}
                helperText={errors.advisor?.message}
              />
            </Grid>

            {/* Switch para ativar/desativar Fechar equipe */}
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Switch
                  checked={isClosed}
                  onChange={(event) => setIsClosed(event.target.checked)}
                  disabled={members.length < 2} // Desabilitar se houver menos de 2 membros
                />
                <Typography color="#6c7b88" sx={{ fontSize: '16px' }}>
                  Fechar Equipe {members.length < 2 && '(Requer ao menos 2 membros)'}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          {/* Botão de Salvar */}
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
  team: PropTypes.object,
};

