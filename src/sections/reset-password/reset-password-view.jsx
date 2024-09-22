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

import { useResetPasswordForm } from 'src/hooks/form/reset-password';
import { useRouter } from 'src/routes/hooks/use-router';

// ----------------------------------------------------------------------

export default function ResetPasswordView() {
  const theme = useTheme();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Usando o hook de formulário de redefinição de senha
  const { register, handleSubmit, errors, onSubmit } = useResetPasswordForm();
  const { push } = useRouter();

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
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 3 }}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" color="primary">
                Salvar
              </LoadingButton>
            </Stack>

            {/* Link para a tela de login */}
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 3, cursor: 'pointer' }}>
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