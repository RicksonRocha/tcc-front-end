import { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks/use-router';
import { useForm } from 'react-hook-form';
import schemaLogin from 'src/hooks/form/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { userLogin } from 'src/features/auth/auth-actions';
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaLogin),
    defaultValues, // Incluindo valores padrão
  });

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(userLogin(data));

      if (response.payload.error) {
        enqueueSnackbar(response.payload.message, { variant: 'error' });
        return;
      }

      reset();
      push('/');
    } catch (e) {
      console.log('error', e);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          label="E-mail"
          {...register('email')} // Registrando o campo com o hook de formulário
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ my: 3, cursor: 'pointer' }}
      >
        <Link variant="subtitle2" underline="hover" onClick={() => push('/forgot-password')}>
          Esqueceu sua senha?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="primary">
        Login
      </LoadingButton>
    </form>
  );

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
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
          <Typography variant="h5" align="center">
            Sistema de Formação e Gestão de Grupos de TCC
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 2, mb: 5 }}>
            Não possui uma conta?
            <Link
              variant="subtitle2"
              sx={{ ml: 0.5, cursor: 'pointer' }}
              onClick={() => push('/register')}
            >
              Cadastre-se
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
