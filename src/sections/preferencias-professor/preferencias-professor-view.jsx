import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'src/routes/hooks/use-router';
import { useForm } from 'react-hook-form';
import schemaPreferenciasProfessor from 'src/hooks/form/preferencias-professor';
import { useDispatch, useSelector } from 'react-redux';
import { preferenciasUserProfessor } from 'src/features/auth/auth-actions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { turnos, linguagens_de_programacao, habilidades_pessoais, temas_de_interesse, disciplinas_lecionadas } from './opcoes';

// ----------------------------------------------------------------------

export default function PreferenciasProfessorView() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { push } = useRouter();

  const defaultValues = {
    turno: [], // Ajuste para array
    linguagemProgramacao: [],
    disciplinasLecionadas: [],
    habilidadesPessoais: [],
    temasDeInteresse: [],
    disponivelOrientacao: '',
  };

  const {
    register: preferenciasProfessor,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaPreferenciasProfessor), 
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(preferenciasUserProfessor({ ...data }));
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ mt: 2 }}>
        {/* Turno (Menu suspenso com múltipla seleção) */}
        <FormControl fullWidth error={!!errors.turno}>
          <InputLabel>Turno</InputLabel>
          <Select
            label="Turno"
            multiple
            value={watch('turno') || []} // Verifica o valor de 'turno'
            onChange={(e) => {
              const selected = e.target.value;
              setValue('turno', selected); // Atualiza o valor de 'turno'
            }}
            renderValue={(selected) => selected.join(', ')} // Mostra os valores selecionados no campo
            error={!!errors.turno}
          >
            {turnos.map((turno) => (
              <MenuItem key={turno} value={turno}>
                <Checkbox checked={watch('turno')?.includes(turno)} />
                {turno}
              </MenuItem>
            ))}
          </Select>
          {errors.turno && <Typography color="error">{errors.turno.message}</Typography>}
        </FormControl>

        {/* Disponível para Orientação (Seleção simples) */}
        <FormControl fullWidth error={!!errors.disponivelOrientacao}>
          <InputLabel>Disponível para Orientação</InputLabel>
          <Select
            label="Disponível para Orientação"
            {...preferenciasProfessor('disponivelOrientacao')}
            error={!!errors.disponivelOrientacao}
          >
            {['Sim', 'Não'].map((opcao) => (
              <MenuItem key={opcao} value={opcao}>
                {opcao}
              </MenuItem>
            ))}
          </Select>
          {errors.disponivelOrientacao && (
            <Typography color="error">{errors.disponivelOrientacao.message}</Typography>
          )}
        </FormControl>

        {/* Linguagem de Programação (Seleção múltipla) */}
        <FormControl fullWidth error={!!errors.linguagemProgramacao}>
          <InputLabel>Linguagem de Programação</InputLabel>
          <Select
            label="Linguagem de Programação"
            multiple
            value={watch('linguagemProgramacao') || []}
            onChange={(e) => {
              const selected = e.target.value;
              if (selected.length <= 3) { // Limite de 3 linguagens
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
          {errors.linguagemProgramacao && <Typography color="error">{errors.linguagemProgramacao.message}</Typography>}
        </FormControl>

        {/* Disciplinas Lecionadas (Seleção múltipla) */}
        <FormControl fullWidth error={!!errors.disciplinasLecionadas}>
          <InputLabel>Disciplinas Lecionadas</InputLabel>
          <Select
            label="Disciplinas Lecionadas"
            multiple
            value={watch('disciplinasLecionadas') || []}
            onChange={(e) => {
              const selected = e.target.value;
              setValue('disciplinasLecionadas', selected);
            }}
            renderValue={(selected) => selected.join(', ')}
            error={!!errors.disciplinasLecionadas}
          >
            {disciplinas_lecionadas.map((disciplina) => (
              <MenuItem key={disciplina} value={disciplina}>
                <Checkbox checked={watch('disciplinasLecionadas')?.includes(disciplina)} />
                {disciplina}
              </MenuItem>
            ))}
          </Select>
          {errors.disciplinasLecionadas && <Typography color="error">{errors.disciplinasLecionadas.message}</Typography>}
        </FormControl>

        {/* Habilidades Pessoais (Seleção múltipla) */}
        <FormControl fullWidth error={!!errors.habilidadesPessoais}>
          <InputLabel>Habilidades Pessoais</InputLabel>
          <Select
            label="Habilidades Pessoais"
            multiple
            value={watch('habilidadesPessoais') || []}
            onChange={(e) => {
              const selected = e.target.value;
              if (selected.length <= 4) { // Limite de 4 habilidades
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
          {errors.habilidadesPessoais && <Typography color="error">{errors.habilidadesPessoais.message}</Typography>}
        </FormControl>

        {/* Temas de Interesse (Seleção múltipla) */}
        <FormControl fullWidth error={!!errors.temasDeInteresse}>
          <InputLabel>Temas de Interesse</InputLabel>
          <Select
            label="Temas de Interesse"
            multiple
            value={watch('temasDeInteresse') || []}
            onChange={(e) => {
              const selected = e.target.value;
              if (selected.length <= 4) { // Limite de 4 temas
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
          {errors.temasDeInteresse && <Typography color="error">{errors.temasDeInteresse.message}</Typography>}
        </FormControl>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 3 }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" color="primary">
          Salvar
        </LoadingButton>
      </Stack>
    </form>
  );
  
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ p: 4, width: '100%', maxWidth: 400, overflow: 'auto' }}>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Compartilhe conosco suas preferências!
        </Typography>

        {renderForm()}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 2, cursor: 'pointer' }}
        >
          {/* <Link variant="subtitle2" underline="hover" onClick={() => push('/login')}>
            Já tem uma conta? Entrar
          </Link> */}
        </Stack>
      </Card>
    </Box>
  );
}