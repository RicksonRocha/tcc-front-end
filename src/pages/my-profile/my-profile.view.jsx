// my-profile.view.jsx
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
  bancos_de_dados,
  framework_front,
  disponibilidades,
  nivel_experiencia,
  temas_de_interesse,
  habilidades_pessoais,
  linguagens_de_programacao,
  modalidades_trabalho,
} from 'src/sections/preferencias-aluno/opcoes';

export default function MyProfileView(props) {
  const {
    open,
    handleOpen,
    onSubmit,
    isLoading,
    formMethods: {
      handleSubmit,
      register,
      control,
      formState: { errors },
      watch,
      setValue,
      reset,
    },
    preferenceData,
  } = props;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Sempre que o diálogo for aberto e houver dados, repopula o formulário
  useEffect(() => {
    if (open && preferenceData) {
      reset(preferenceData);
    }
  }, [open, preferenceData, reset]);

  // Exibe o Snackbar quando preferenceData é atualizada (após salvar ou editar)
  useEffect(() => {
    if (preferenceData) {
      setSnackbarMessage("Preferências carregadas com sucesso!");
      setSnackbarOpen(true);
    }
  }, [preferenceData]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // ---------------------------
  // Renderiza os campos do formulário (edição)
  // ---------------------------
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
              {turnos.map((turno) => (
                <MenuItem key={turno} value={turno}>
                  {turno}
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

      {/* Linguagem de Programação */}
      <FormControl fullWidth error={!!errors.linguagemProgramacao}>
        <InputLabel>Linguagem de Programação</InputLabel>
        <Select
          fullWidth
          label="Linguagem de Programação"
          multiple
          value={watch('linguagemProgramacao') || []}
          onChange={(e) => {
            const selected = e.target.value;
            // Máximo 2 opções
            if (selected.length <= 2) setValue('linguagemProgramacao', selected);
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {linguagens_de_programacao.map((linguagem) => (
            <MenuItem key={linguagem} value={linguagem}>
              <Checkbox checked={watch('linguagemProgramacao')?.includes(linguagem)} />
              {linguagem}
            </MenuItem>
          ))}
        </Select>
        {errors.linguagemProgramacao && (
          <Typography variant="caption" color="error">
            {errors.linguagemProgramacao.message}
          </Typography>
        )}
      </FormControl>

      {/* Banco de Dados */}
      <FormControl fullWidth error={!!errors.bancoDeDados}>
        <InputLabel>Banco de Dados</InputLabel>
        <Select
          label="Banco de Dados"
          multiple
          value={watch('bancoDeDados') || []}
          onChange={(e) => {
            const selected = e.target.value;
            // Máximo 2 opções
            if (selected.length <= 2) setValue('bancoDeDados', selected);
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {bancos_de_dados.map((banco) => (
            <MenuItem key={banco} value={banco}>
              <Checkbox checked={watch('bancoDeDados')?.includes(banco)} />
              {banco}
            </MenuItem>
          ))}
        </Select>
        {errors.bancoDeDados && (
          <Typography variant="caption" color="error">
            {errors.bancoDeDados.message}
          </Typography>
        )}
      </FormControl>

      {/* Nível de Experiência */}
      <Controller
        name="nivelDeExperiencia"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.nivelDeExperiencia}>
            <InputLabel>Nível de Experiência</InputLabel>
            <Select {...field} label="Nível de Experiência">
              {nivel_experiencia.map((nivel) => (
                <MenuItem key={nivel} value={nivel}>
                  {nivel}
                </MenuItem>
              ))}
            </Select>
            {errors.nivelDeExperiencia && (
              <Typography variant="caption" color="error">
                {errors.nivelDeExperiencia.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Habilidades Pessoais */}
      <Controller
        name="habilidadesPessoais"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.habilidadesPessoais}>
            <InputLabel>Habilidades Pessoais</InputLabel>
            <Select
              {...field}
              label="Habilidades Pessoais"
              multiple
              onChange={(e) => {
                const selected = e.target.value;
                // Máximo 3 opções
                if (selected.length <= 3) field.onChange(selected);
              }}
              renderValue={(selected) => selected.join(', ')}
            >
              {habilidades_pessoais.map((habilidade) => (
                <MenuItem key={habilidade} value={habilidade}>
                  <Checkbox checked={field.value?.includes(habilidade)} />
                  {habilidade}
                </MenuItem>
              ))}
            </Select>
            {errors.habilidadesPessoais && (
              <Typography variant="caption" color="error">
                {errors.habilidadesPessoais.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Temas de Interesse */}
      <Controller
        name="temasDeInteresse"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.temasDeInteresse}>
            <InputLabel>Temas de Interesse</InputLabel>
            <Select
              {...field}
              label="Temas de Interesse"
              multiple
              onChange={(e) => {
                const selected = e.target.value;
                // Máximo 3 opções
                if (selected.length <= 3) field.onChange(selected);
              }}
              renderValue={(selected) => selected.join(', ')}
            >
              {temas_de_interesse.map((tema) => (
                <MenuItem key={tema} value={tema}>
                  <Checkbox checked={field.value?.includes(tema)} />
                  {tema}
                </MenuItem>
              ))}
            </Select>
            {errors.temasDeInteresse && (
              <Typography variant="caption" color="error">
                {errors.temasDeInteresse.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Disponibilidade */}
      <Controller
        name="disponibilidade"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.disponibilidade}>
            <InputLabel>Disponibilidade</InputLabel>
            <Select {...field} label="Disponibilidade">
              {disponibilidades.map((disp) => (
                <MenuItem key={disp} value={disp}>
                  {disp}
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
              {modalidades_trabalho.map((modalidade) => (
                <MenuItem key={modalidade} value={modalidade}>
                  {modalidade}
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

      {/* Framework Front-end */}
      <FormControl fullWidth error={!!errors.frameworkFront}>
        <InputLabel>Framework Front-end</InputLabel>
        <Select
          label="Framework Front-end"
          multiple
          value={watch('frameworkFront') || []}
          onChange={(e) => {
            const selected = e.target.value;
            // Máximo 2 opções
            if (selected.length <= 2) setValue('frameworkFront', selected);
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {framework_front.map((fw) => (
            <MenuItem key={fw} value={fw}>
              <Checkbox checked={watch('frameworkFront')?.includes(fw)} />
              {fw}
            </MenuItem>
          ))}
        </Select>
        {errors.frameworkFront && (
          <Typography variant="caption" color="error">
            {errors.frameworkFront.message}
          </Typography>
        )}
      </FormControl>
    </Stack>
  );

  // ---------------------------
  // Renderização do card de exibição das preferências
  // ---------------------------
  const renderPreferenceCard = () => (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ position: 'relative' }}>
          <Typography variant="h6" gutterBottom>
            Suas Preferências
          </Typography>
          {/* Botão de editar no canto superior direito */}
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
                {/* Primeira Coluna */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Turno:
                    </Typography>
                    <Typography variant="body1">{preferenceData.turno}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Disponibilidade:
                    </Typography>
                    <Typography variant="body1">{preferenceData.disponibilidade}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Linguagens de Programação:
                    </Typography>
                    <Typography variant="body1">
                      {preferenceData.linguagemProgramacao.join(', ')}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Bancos de Dados:
                    </Typography>
                    <Typography variant="body1">
                      {preferenceData.bancoDeDados.join(', ')}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Framework Front-end:
                    </Typography>
                    <Typography variant="body1">
                      {preferenceData.frameworkFront.join(', ')}
                    </Typography>
                  </Box>
                </Grid>
                {/* Segunda Coluna */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Nível de Experiência:
                    </Typography>
                    <Typography variant="body1">
                      {preferenceData.nivelDeExperiencia}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Modalidade de Trabalho:
                    </Typography>
                    <Typography variant="body1">
                      {preferenceData.modalidadeTrabalho}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Habilidades Pessoais:
                    </Typography>
                    <Typography variant="body1">
                      {preferenceData.habilidadesPessoais.join(', ')}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                      Temas de Interesse:
                    </Typography>
                    <Typography variant="body1">
                      {preferenceData.temasDeInteresse.join(', ')}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  // Card inicial (quando não há preferência cadastrada)
  const renderInitialCard = () => (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Stack sx={{ height: '50vh', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Olá! Precisamos preencher suas informações 🙂
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Preencha com atenção para que possamos encontrar colegas compatíveis com seu perfil!
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
              Meu perfil
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="text.primary" href="/">
                Início
              </Link>
              <Typography color="inherit">Meu perfil</Typography>
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