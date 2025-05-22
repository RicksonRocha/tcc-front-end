import React, { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Link,
  Card,
  CardContent,
  Grid,
  Stack,
  Button,
  Dialog,
  Container,
  Typography,
  InputLabel,
  Breadcrumbs,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Box,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Controller } from 'react-hook-form';
import {
  turnos,
  disponivel_orientacao,
  linguagens_programacao,
  disciplinas_lecionadas,
  habilidades_pessoais,
  temas_interesse,
  disponibilidades,
  modalidades_trabalho,
} from 'src/sections/professor-preferences/opcoes';

export default function MyProfileProfessorView(props) {
  const {
    open,
    handleOpen,
    onSubmit,
    isLoading,
    formMethods: {
      handleSubmit,
      control,
      formState: { errors },
      watch,
      setValue,
      reset,
    },
    preferenceData,
  } = props;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (open && preferenceData) {
      reset(preferenceData);
    }
  }, [open, preferenceData, reset]);

  useEffect(() => {
    if (preferenceData) {
      setSnackbarMessage('Preferências carregadas com sucesso!');
      setSnackbarOpen(true);
    }
  }, [preferenceData]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderFormFields = () => (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <Controller
        name="shift"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.shift}>
            <InputLabel>Turno</InputLabel>
            <Select {...field} label="Turno" value={field.value || ''}>
              {turnos.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
            {errors.shift && (
              <Typography variant="caption" color="error">
                {errors.shift.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="availableForAdvising"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.availableForAdvising}>
            <InputLabel>Disponível para Orientação</InputLabel>
            <Select {...field} label="Disponível para Orientação" value={field.value || ''}>
              {disponivel_orientacao.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
            {errors.availableForAdvising && (
              <Typography variant="caption" color="error">
                {errors.availableForAdvising.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {[
        {
          name: 'programmingLanguages',
          label: 'Linguagens de Programação',
          options: linguagens_programacao,
        },
        {
          name: 'taughtSubjects',
          label: 'Disciplinas Lecionadas',
          options: disciplinas_lecionadas,
        },
        { name: 'personalSkills', label: 'Habilidades Pessoais', options: habilidades_pessoais },
        { name: 'interestTopics', label: 'Temas de Interesse', options: temas_interesse },
      ].map(({ name, label, options }) => (
        <FormControl fullWidth key={name} error={!!errors[name]}>
          <InputLabel>{label}</InputLabel>
          <Select
            multiple
            label={label}
            value={watch(name) || []}
            onChange={(e) => setValue(name, e.target.value)}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 250,
                },
              },
            }}
          >
            {options.map((opt) => (
              <MenuItem key={opt} value={opt}>
                <Checkbox checked={(watch(name) || []).includes(opt)} />
                {opt}
              </MenuItem>
            ))}
          </Select>
          {errors[name] && (
            <Typography variant="caption" color="error">
              {errors[name].message}
            </Typography>
          )}
        </FormControl>
      ))}

      <Controller
        name="availability"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.availability}>
            <InputLabel>Disponibilidade</InputLabel>
            <Select {...field} label="Disponibilidade" value={field.value || ''}>
              {disponibilidades.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
            {errors.availability && (
              <Typography variant="caption" color="error">
                {errors.availability.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="workModality"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.workModality}>
            <InputLabel>Modalidade de Trabalho</InputLabel>
            <Select {...field} label="Modalidade de Trabalho" value={field.value || ''}>
              {modalidades_trabalho.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
            {errors.workModality && (
              <Typography variant="caption" color="error">
                {errors.workModality.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
    </Stack>
  );

  const renderPreferenceCard = () => (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ position: 'relative' }}>
          <Typography variant="h6" gutterBottom>
            Suas Preferências
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              reset(preferenceData);
              handleOpen();
            }}
            sx={{ position: 'absolute', top: 0, right: 0 }}
          >
            Editar
          </Button>
          {preferenceData && (
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight="bold">Turno:</Typography>
                  <Typography>{preferenceData.shift}</Typography>

                  <Typography fontWeight="bold" mt={2}>
                    Disponível para Orientação:
                  </Typography>
                  <Typography>{preferenceData.availableForAdvising}</Typography>

                  <Typography fontWeight="bold" mt={2}>
                    Linguagens de Programação:
                  </Typography>
                  <Typography>{(preferenceData.programmingLanguages || []).join(', ')}</Typography>

                  <Typography fontWeight="bold" mt={2}>
                    Disciplinas Lecionadas:
                  </Typography>
                  <Typography>{(preferenceData.taughtSubjects || []).join(', ')}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight="bold">Habilidades Pessoais:</Typography>
                  <Typography>{(preferenceData.personalSkills || []).join(', ')}</Typography>

                  <Typography fontWeight="bold" mt={2}>
                    Temas de Interesse:
                  </Typography>
                  <Typography>{(preferenceData.interestTopics || []).join(', ')}</Typography>

                  <Typography fontWeight="bold" mt={2}>
                    Disponibilidade:
                  </Typography>
                  <Typography>{preferenceData.availability}</Typography>

                  <Typography fontWeight="bold" mt={2}>
                    Modalidade de Trabalho:
                  </Typography>
                  <Typography>{preferenceData.workModality}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  const renderInitialCard = () => (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Stack
        sx={{ height: '50vh', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Olá! Precisamos preencher suas informações 🙂
        </Typography>
        <Typography sx={{ mb: 2 }}>Preencha com atenção para configurar seu perfil!</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Iniciar questionário
        </Button>
      </Stack>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>Meu Perfil</title>
      </Helmet>

      <Container sx={{ mt: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Stack>
            <Typography variant="h4" mb={1}>
              Meu Perfil
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="text.primary" href="/">
                Início
              </Link>
              <Typography color="inherit">Meu Perfil</Typography>
            </Breadcrumbs>
          </Stack>
        </Stack>

        {preferenceData ? renderPreferenceCard() : renderInitialCard()}
      </Container>

      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle>Preferências</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>{renderFormFields()}</form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Fechar</Button>
          <LoadingButton
            type="submit"
            loading={isLoading}
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Salvar
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%', textAlign: 'center' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
