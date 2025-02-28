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
} from 'src/sections/preferencias-professor/opcoes';

export default function MyProfileProfessorView(props) {
  const {
    open,
    handleOpen,
    onSubmit,
    isLoading,
    formMethods: { handleSubmit, control, formState: { errors }, watch, setValue, reset },
    preferenceData,
  } = props;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (open && preferenceData) {
      reset(preferenceData);
    }
  }, [open, preferenceData, reset]);

  useEffect(() => {
    if (preferenceData) {
      setSnackbarMessage("Preferências carregadas com sucesso!");
      setSnackbarOpen(true);
    }
  }, [preferenceData]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderFormFields = () => (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {/* Turno */}
      <Controller
        name="turno"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.turno}>
            <InputLabel>Turno</InputLabel>
            <Select {...field} label="Turno">
              {turnos.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
            {errors.turno && (
              <Typography variant="caption" color="error">
                {errors.turno.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Disponível para Orientação */}
      <Controller
        name="disponivelOrientacao"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.disponivelOrientacao}>
            <InputLabel>Disponível para Orientação</InputLabel>
            <Select {...field} label="Disponível para Orientação">
              {disponivel_orientacao.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
            {errors.disponivelOrientacao && (
              <Typography variant="caption" color="error">
                {errors.disponivelOrientacao.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Linguagens de Programação */}
      <FormControl fullWidth error={!!errors.linguagensProgramacao}>
        <InputLabel>Linguagens de Programação</InputLabel>
        <Select
          fullWidth
          label="Linguagens de Programação"
          multiple
          value={watch('linguagensProgramacao') || []}
          onChange={(e) => {
            const selected = e.target.value;
            setValue('linguagensProgramacao', selected);
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {linguagens_programacao.map((lang) => (
            <MenuItem key={lang} value={lang}>
              <Checkbox checked={watch('linguagensProgramacao')?.includes(lang)} />
              {lang}
            </MenuItem>
          ))}
        </Select>
        {errors.linguagensProgramacao && (
          <Typography variant="caption" color="error">
            {errors.linguagensProgramacao.message}
          </Typography>
        )}
      </FormControl>

      {/* Disciplinas Lecionadas */}
      <FormControl fullWidth error={!!errors.disciplinasLecionadas}>
        <InputLabel>Disciplinas Lecionadas</InputLabel>
        <Select
          fullWidth
          label="Disciplinas Lecionadas"
          multiple
          value={watch('disciplinasLecionadas') || []}
          onChange={(e) => {
            const selected = e.target.value;
            setValue('disciplinasLecionadas', selected);
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {disciplinas_lecionadas.map((disc) => (
            <MenuItem key={disc} value={disc}>
              <Checkbox checked={watch('disciplinasLecionadas')?.includes(disc)} />
              {disc}
            </MenuItem>
          ))}
        </Select>
        {errors.disciplinasLecionadas && (
          <Typography variant="caption" color="error">
            {errors.disciplinasLecionadas.message}
          </Typography>
        )}
      </FormControl>

      {/* Habilidades Pessoais */}
      <FormControl fullWidth error={!!errors.habilidadesPessoais}>
        <InputLabel>Habilidades Pessoais</InputLabel>
        <Select
          fullWidth
          label="Habilidades Pessoais"
          multiple
          value={watch('habilidadesPessoais') || []}
          onChange={(e) => {
            const selected = e.target.value;
            setValue('habilidadesPessoais', selected);
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {habilidades_pessoais.map((hab) => (
            <MenuItem key={hab} value={hab}>
              <Checkbox checked={watch('habilidadesPessoais')?.includes(hab)} />
              {hab}
            </MenuItem>
          ))}
        </Select>
        {errors.habilidadesPessoais && (
          <Typography variant="caption" color="error">
            {errors.habilidadesPessoais.message}
          </Typography>
        )}
      </FormControl>

      {/* Temas de Interesse */}
      <FormControl fullWidth error={!!errors.temasInteresse}>
        <InputLabel>Temas de Interesse</InputLabel>
        <Select
          fullWidth
          label="Temas de Interesse"
          multiple
          value={watch('temasInteresse') || []}
          onChange={(e) => {
            const selected = e.target.value;
            setValue('temasInteresse', selected);
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {temas_interesse.map((tema) => (
            <MenuItem key={tema} value={tema}>
              <Checkbox checked={watch('temasInteresse')?.includes(tema)} />
              {tema}
            </MenuItem>
          ))}
        </Select>
        {errors.temasInteresse && (
          <Typography variant="caption" color="error">
            {errors.temasInteresse.message}
          </Typography>
        )}
      </FormControl>

      {/* Disponibilidade */}
      <Controller
        name="disponibilidade"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.disponibilidade}>
            <InputLabel>Disponibilidade</InputLabel>
            <Select {...field} label="Disponibilidade">
              {disponibilidades.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
            {errors.disponibilidade && (
              <Typography variant="caption" color="error">
                {errors.disponibilidade.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Modalidade de Trabalho */}
      <Controller
        name="modalidadeTrabalho"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.modalidadeTrabalho}>
            <InputLabel>Modalidade de Trabalho</InputLabel>
            <Select {...field} label="Modalidade de Trabalho">
              {modalidades_trabalho.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
            {errors.modalidadeTrabalho && (
              <Typography variant="caption" color="error">
                {errors.modalidadeTrabalho.message}
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
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Turno:
                    </Typography>
                    <Typography variant="body1">{preferenceData.turno}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Disponível para Orientação:
                    </Typography>
                    <Typography variant="body1">{preferenceData.disponivelOrientacao}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Linguagens de Programação:
                    </Typography>
                    <Typography variant="body1">
                      {Array.isArray(preferenceData.linguagensProgramacao)
                        ? preferenceData.linguagensProgramacao.join(', ')
                        : preferenceData.linguagensProgramacao}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Disciplinas Lecionadas:
                    </Typography>
                    <Typography variant="body1">
                      {Array.isArray(preferenceData.disciplinasLecionadas)
                        ? preferenceData.disciplinasLecionadas.join(', ')
                        : preferenceData.disciplinasLecionadas}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Habilidades Pessoais:
                    </Typography>
                    <Typography variant="body1">
                      {Array.isArray(preferenceData.habilidadesPessoais)
                        ? preferenceData.habilidadesPessoais.join(', ')
                        : preferenceData.habilidadesPessoais}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Temas de Interesse:
                    </Typography>
                    <Typography variant="body1">
                      {Array.isArray(preferenceData.temasInteresse)
                        ? preferenceData.temasInteresse.join(', ')
                        : preferenceData.temasInteresse}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Disponibilidade:
                    </Typography>
                    <Typography variant="body1">{preferenceData.disponibilidade}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Modalidade de Trabalho:
                    </Typography>
                    <Typography variant="body1">{preferenceData.modalidadeTrabalho}</Typography>
                  </Box>
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
      <Stack sx={{ height: '50vh', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Olá! Precisamos preencher suas informações 🙂
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Preencha com atenção para configurar seu perfil!
        </Typography>
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
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%', textAlign: 'center' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
