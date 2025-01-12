import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'src/routes/hooks/use-router';
import { useForm } from 'react-hook-form';
import schemaPreferenciasAluno from 'src/hooks/form/preferencias-aluno';
import { preferenciasUserAluno } from 'src/features/auth/auth-actions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import {
  turnos,
  bancos_de_dados,
  framework_front,
  disponibilidades,
  nivel_experiencia,
  temas_de_interesse,
  habilidades_pessoais,
  linguagens_de_programacao,
} from './opcoes';

// ----------------------------------------------------------------------

export default function PreferenciasAlunoView() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { push } = useRouter();

  const defaultValues = {
    turno: '',
    linguagemProgramacao: [],
    bancoDeDados: [],
    nivelDeExperiencia: '',
    habilidadesPessoais: [],
    temasDeInteresse: [],
    disponibilidade: '',
    modalidadeTrabalho: '',
    frameworkFront: [],
  };

  const {
    register: preferenciasAluno,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaPreferenciasAluno),
    defaultValues,
  });

  // Obtém o ID do usuário logado
  const userId = useSelector((state) => state.auth.auth.id);

  // const onSubmit = async (data) => {
  //   try {
  //     const payload = {
  //       ...data,
  //       userId, // Inclui o userId no payload
  //     };
  
  //     console.log('Payload enviado:', payload);
  
  //     await dispatch(preferenciasUserAluno(payload));
  //     reset();
  //   } catch (e) {
  //     console.error('Erro ao criar preferências:', e);
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      await dispatch(preferenciasUserAluno(data));
      reset();
    } catch (e) {
      console.error('Erro ao criar preferências:', e);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {' '}
        {/* Reduzi o spacing de 3 para 2 */}
        {/* Turno (Seleção simples) */}
        <FormControl fullWidth error={!!errors.turno} sx={{ minHeight: 40 }}>
          <InputLabel>Turno</InputLabel>
          <Select label="Turno" {...preferenciasAluno('turno')} error={!!errors.turno}>
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
        {/* Linguagem de Programação (Seleção múltipla) */}
        <FormControl fullWidth error={!!errors.linguagemProgramacao} sx={{ minHeight: 40 }}>
          <InputLabel>Linguagem de Programação</InputLabel>
          <Select
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
        {/* Banco de Dados (Seleção múltipla) */}
        <FormControl fullWidth error={!!errors.bancoDeDados} sx={{ minHeight: 40 }}>
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
        {/* Nível de Experiência (Seleção simples) */}
        <FormControl fullWidth error={!!errors.nivelDeExperiencia} sx={{ minHeight: 40 }}>
          <InputLabel>Nível de Experiência</InputLabel>
          <Select
            label="Nível de Experiência"
            {...preferenciasAluno('nivelDeExperiencia')}
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
        {/* Habilidades Pessoais (Seleção múltipla em menu suspenso) */}
        <FormControl fullWidth error={!!errors.habilidadesPessoais} sx={{ minHeight: 40 }}>
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
        {/* Temas de Interesse (Seleção múltipla em menu suspenso) */}
        <FormControl fullWidth error={!!errors.temasDeInteresse} sx={{ minHeight: 40 }}>
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
        {/* Disponibilidade (Seleção simples) */}
        <FormControl fullWidth error={!!errors.disponibilidade} sx={{ minHeight: 40 }}>
          <InputLabel>Disponibilidade</InputLabel>
          <Select
            label="Disponibilidade"
            {...preferenciasAluno('disponibilidade')}
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
        {/* **Novo Campo: Framework Front-end (Seleção múltipla)** */}
        <FormControl fullWidth error={!!errors.frameworkFront} sx={{ minHeight: 40 }}>
          <InputLabel>Framework Front-end</InputLabel>
          <Select
            label="Framework Front-end"
            multiple
            value={watch('frameworkFront') || []}
            onChange={(e) => {
              const selected = e.target.value;
              if (selected.length <= 2) {
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
        {/* Fim do Novo Campo */}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
        {' '}
        {}
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: '50%' }}
        >
          Salvar
        </LoadingButton>
      </Stack>
    </form>
  );

  return (
    <Card>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Compartilhe conosco suas preferências!
      </Typography>

      {renderForm()}
    </Card>
  );
}
