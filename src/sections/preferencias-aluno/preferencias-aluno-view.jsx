import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'src/routes/hooks/use-router';
import { useForm } from 'react-hook-form';
import schemaPreferenciasAluno from 'src/hooks/form/preferencias-aluno';
import { useDispatch, useSelector } from 'react-redux';
import { preferenciasUserAluno } from 'src/features/auth/auth-actions';

// ----------------------------------------------------------------------

export default function PreferenciasAlunoView() {
  const theme = useTheme();
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const { push } = useRouter();

  // Valores padrão para o formulário
  const defaultValues = {
    turno: '',
    linguagemProgramacao: '',
    bancoDeDados: '',
    nivelDeExperiencia: '',
    habilidadesPessoais: '',
    temasDeInteresse: '',
  };

  const {
    auth: { user },
    loading,
  } = useSelector((state) => state.auth);

  const {
    preferenciasAluno,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaPreferenciasAluno),
    defaultValues,
  });

  console.log(errors);

  const onSubmit = async (data) => {
    try {
      await dispatch(preferenciasUserAluno({ ...data }));
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ mt: 2 }}>
        <TextField
          label="Turno"
          fullWidth
          {...preferenciasAluno('turno')}
          error={!!errors.turno}
          helperText={errors.turno?.message}
        />

        <TextField
          label="Linguagem de Programação"
          fullWidth
          type="linguagemProgramacao"
          {...preferenciasAluno('linguagemProgramacao')}
          error={!!errors.linguagemProgramacao}
          helperText={errors.linguagemProgramacao?.message}
        />

        <TextField
          label="Banco de Dados"
          fullWidth
          type="bancoDeDados"
          {...preferenciasAluno('bancoDeDados')}
          error={!!errors.bancoDeDados}
          helperText={errors.bancoDeDados?.message}
        />

        <TextField
          label="Nível de experiência"
          fullWidth
          type="nivelDeExperiencia"
          {...preferenciasAluno('nivelDeExperiencia')}
          error={!!errors.nivelDeExperiencia}
          helperText={errors.nivelDeExperiencia?.message}
        />

        <TextField
          label="Habilidades pessoais"
          fullWidth
          type="habilidadesPessoais"
          {...preferenciasAluno('habilidadesPessoais')}
          error={!!errors.habilidadesPessoais}
          helperText={errors.habilidadesPessoais?.message}
        />

      <TextField
          label="Temas de interesse"
          fullWidth
          type="temasDeInteresse"
          {...preferenciasAluno('temasDeInteresse')}
          error={!!errors.temasDeInteresse}
          helperText={errors.temasDeInteresse?.message}
        />
        
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
          Realize seu cadastro!
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