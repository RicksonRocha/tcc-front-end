import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks/use-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaResetPassword from 'src/hooks/form/reset-password';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from 'src/features/auth/auth-actions';

// ----------------------------------------------------------------------

export default function ResetPasswordView() {
  const theme = useTheme();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const defaultValues = {
    email: '',
    newPassword: '',
    confirmPassword: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaResetPassword),
    defaultValues, // Incluindo valores padrão
  });

  const onSubmit = async (data) => {
    try {
      // Dispatch do thunk, enviando email e a nova senha
      const result = await dispatch(
        resetPassword({
          email: data.email,
          newsenha: data.newPassword,
        })
      );

      if (resetPassword.fulfilled.match(result)) {
        // Se for sucesso, exibe a mensagem e reseta o formulário
        reset();
        alert('Senha redefinida com sucesso!');
      } else {
        // Se houver erro, exibe a mensagem de erro
        alert(result.payload || 'Erro ao redefinir a senha.');
      }
    } catch (e) {
      console.log(e);
      alert('Houve um erro ao redefinir sua senha.');
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
                {...register('email')} // Registrando o campo de email
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Nova Senha"
                type={showNewPassword ? 'text' : 'password'}
                fullWidth
                {...register('newPassword')}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                        <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirmação de Senha"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                Salvar
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
