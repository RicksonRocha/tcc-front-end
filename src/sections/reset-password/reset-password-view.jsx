import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import { useRouter } from 'src/routes/hooks/use-router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { resetPassword } from 'src/features/auth/auth-actions';
import { useSnackbar } from 'notistack'; 

// ----------------------------------------------------------------------

export default function ResetPasswordView() {
  const theme = useTheme();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); 

  const defaultValues = {
    email: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      // Dispatch do thunk, enviando o email
      const result = await dispatch(
        resetPassword({
          email: data.email,
        })
      );

      if (resetPassword.fulfilled.match(result)) {
        enqueueSnackbar('Redefinição de senha enviada com sucesso. Acesse seu e-mail!', { variant: 'success' });
        reset();
        setTimeout(() => push('/login'), 3000);
      } else {
        enqueueSnackbar(result.payload || 'Erro ao solicitar redefinição de senha.', { variant: 'error' });
      }
    } catch (e) {
      enqueueSnackbar('Houve um erro ao solicitar redefinição de senha.', { variant: 'error' });
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
              {/* Campo de email */}
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
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
                Enviar
              </LoadingButton>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ my: 0, cursor: 'pointer' }}
            >
              <Link variant="subtitle2" underline="hover" onClick={() => push('/login')}>
                Entrar
              </Link>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Box>
  );
}

