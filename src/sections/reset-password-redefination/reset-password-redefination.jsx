import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import { useRouter } from 'src/routes/hooks/use-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updatePassword } from 'src/features/auth/auth-actions';
import { useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack'; 

// ----------------------------------------------------------------------

export default function ResetPasswordRedefinationView() {
  const theme = useTheme();
  const [searchParams] = useSearchParams(); // Hook para capturar os parâmetros da URL
  const token = searchParams.get('token'); // Obtém o valor do parâmetro "token" na URL
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // Esquema de validação com Yup
  const schema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .required('A nova senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
      .required('A confirmação da senha é obrigatória'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!token) {
      enqueueSnackbar('Token não encontrado na URL.', { variant: 'error' });
      return;
    }
    try {
      // Dispatch do thunk para redefinir senha
      const result = await dispatch(
        updatePassword({
          token, // Passa o token capturado da URL
          newPassword: data.password, // Passa a nova senha
        })
      );

      if (updatePassword.fulfilled.match(result)) {
        reset();
        enqueueSnackbar('Senha redefinida com sucesso!', { variant: 'success' });
        setTimeout(() => push('/login'), 2500);
      } else {
        enqueueSnackbar(result.payload || 'Erro ao redefinir senha.', { variant: 'error' });
      }
    } catch (e) {
      enqueueSnackbar('Houve um erro ao redefinir a senha.', { variant: 'error' });
    }
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h5" align="center">
            Redefinir Senha
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ mt: 3 }}>
              {/* Campo de nova senha */}
              <TextField
                label="Nova Senha"
                type="password"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              {/* Campo de confirmar senha */}
              <TextField
                label="Confirmar Nova Senha"
                type="password"
                fullWidth
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 3 }}>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Redefinir Senha
              </LoadingButton>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ my: 0, cursor: 'pointer' }}
            />
          </form>
        </Card>
      </Stack>
    </Box>
  );
}

