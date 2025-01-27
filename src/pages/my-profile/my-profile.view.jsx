import { LoadingButton } from '@mui/lab';
import {
  Link,
  Card,
  Stack,
  Button,
  Dialog,
  Select,
  MenuItem,
  Checkbox,
  Container,
  Typography,
  InputLabel,
  Breadcrumbs,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import {
  turnos,
  bancos_de_dados,
  framework_front,
  disponibilidades,
  nivel_experiencia,
  temas_de_interesse,
  habilidades_pessoais,
  linguagens_de_programacao,
} from 'src/sections/preferencias-aluno/opcoes';
import { modalidades_trabalho } from 'src/sections/preferencias-professor/opcoes';

export default function MyProfileView(props) {
  const {
    open,
    handleOpen,
    onSubmit,
    isLoading,
    formMethods: {
      handleSubmit,
      register,
      formState: { errors },
      watch,
      setValue,
    },
  } = props;

  return (
    <>
      <Helmet>
        <title>Meu Perfil</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Stack direction="column">
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

        <Card
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack
            sx={{
              height: '50vh',
              width: '45vw',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5">Olá! Precisamos preencher suas informações</Typography>
            <Typography textAlign="center">
              Responda com atenção a todas as perguntas, elas são essenciais para encontrarmos
              membros e equipes para se conectarem com você
            </Typography>
            <Button sx={{ alignSelf: 'center', mt: 2 }} variant="contained" onClick={handleOpen}>
              Iniciar questionário
            </Button>
          </Stack>
        </Card>
      </Container>

      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle>Preferências</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <FormControl fullWidth error={!!errors.turno}>
                <InputLabel>Turno</InputLabel>
                <Select fullWidth label="Turno" {...register('turno')}>
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

              <FormControl fullWidth error={!!errors.linguagemProgramacao}>
                <InputLabel>Linguagem de Programação</InputLabel>
                <Select
                  fullWidth
                  label="Linguagem de Programação"
                  multiple
                  value={watch('linguagemProgramacao') || []}
                  onChange={(e) => {
                    const selected = e.target.value;
                    if (selected.length <= 3) {
                      setValue('linguagemProgramacao', selected);
                    }
                  }}
                  renderValue={(selected) => selected.join(', ')}
                  error={!!errors.linguagemProgramacao}
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

              <FormControl fullWidth error={!!errors.bancoDeDados}>
                <InputLabel>Banco de Dados</InputLabel>
                <Select
                  label="Banco de Dados"
                  multiple
                  value={watch('bancoDeDados') || []}
                  onChange={(e) => {
                    const selected = e.target.value;
                    if (selected.length <= 2) {
                      setValue('bancoDeDados', selected);
                    }
                  }}
                  renderValue={(selected) => selected.join(', ')}
                  error={!!errors.bancoDeDados}
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

              <FormControl fullWidth error={!!errors.nivelDeExperiencia}>
                <InputLabel>Nível de Experiência</InputLabel>
                <Select
                  label="Nível de Experiência"
                  {...register('nivelDeExperiencia')}
                  error={!!errors.nivelDeExperiencia}
                >
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

              <FormControl fullWidth error={!!errors.habilidadesPessoais}>
                <InputLabel>Habilidades Pessoais</InputLabel>
                <Select
                  label="Habilidades Pessoais"
                  multiple
                  value={watch('habilidadesPessoais') || []}
                  onChange={(e) => {
                    const selected = e.target.value;
                    if (selected.length <= 4) {
                      setValue('habilidadesPessoais', selected);
                    }
                  }}
                  renderValue={(selected) => selected.join(', ')}
                  error={!!errors.habilidadesPessoais}
                >
                  {habilidades_pessoais.map((habilidade) => (
                    <MenuItem key={habilidade} value={habilidade}>
                      <Checkbox checked={watch('habilidadesPessoais')?.includes(habilidade)} />
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

              <FormControl fullWidth error={!!errors.temasDeInteresse}>
                <InputLabel>Temas de Interesse</InputLabel>
                <Select
                  label="Temas de Interesse"
                  multiple
                  value={watch('temasDeInteresse') || []}
                  onChange={(e) => {
                    const selected = e.target.value;
                    if (selected.length <= 4) {
                      setValue('temasDeInteresse', selected);
                    }
                  }}
                  renderValue={(selected) => selected.join(', ')}
                  error={!!errors.temasDeInteresse}
                >
                  {temas_de_interesse.map((tema) => (
                    <MenuItem key={tema} value={tema}>
                      <Checkbox checked={watch('temasDeInteresse')?.includes(tema)} />
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

              <FormControl fullWidth error={!!errors.disponibilidade}>
                <InputLabel>Disponibilidade</InputLabel>
                <Select
                  label="Disponibilidade"
                  {...register('disponibilidade')}
                  error={!!errors.disponibilidade}
                >
                  {disponibilidades.map((disponibilidade) => (
                    <MenuItem key={disponibilidade} value={disponibilidade}>
                      {disponibilidade}
                    </MenuItem>
                  ))}
                </Select>
                {errors.disponibilidade && (
                  <Typography variant="caption" color="error">
                    {errors.disponibilidade.message}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth error={!!errors.modalidadeTrabalho}>
                <InputLabel>Modalidade de trabalho</InputLabel>
                <Select
                  label="Modalidade de trabalho"
                  {...register('modalidadeTrabalho')}
                  error={!!errors.modalidadeTrabalho}
                >
                  {modalidades_trabalho.map((modalidadeTrabalho) => (
                    <MenuItem key={modalidadeTrabalho} value={modalidadeTrabalho}>
                      {modalidadeTrabalho}
                    </MenuItem>
                  ))}
                </Select>
                {errors.modalidadeTrabalho && (
                  <Typography variant="caption" color="error">
                    {errors.modalidadeTrabalho.message}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth error={!!errors.frameworkFront}>
                <InputLabel>Framework Front-end</InputLabel>
                <Select
                  label="Framework Front-end"
                  multiple
                  value={watch('frameworkFront') || []}
                  onChange={(e) => {
                    const selected = e.target.value;
                    if (selected.length <= 5) {
                      setValue('frameworkFront', selected);
                    }
                  }}
                  renderValue={(selected) => selected.join(', ')}
                  error={!!errors.frameworkFront}
                >
                  {framework_front.map((framework) => (
                    <MenuItem key={framework} value={framework}>
                      <Checkbox checked={watch('frameworkFront')?.includes(framework)} />
                      {framework}
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
          </form>
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
    </>
  );
}
