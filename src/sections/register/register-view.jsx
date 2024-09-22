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
import { useRegisterForm } from 'src/hooks/form/register';
import { useRouter } from 'src/routes/hooks/use-router'; 
import { useRegisterUserMutation } from 'src/api/user';


// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { push } = useRouter(); // Hook de navegação

  const { register, handleSubmit, errors, onSubmit: formSubmit } = useRegisterForm();
  
  const [registerUser, { isLoading }] = useRegisterUserMutation(); // Hook de registro de usuário
  
  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
      console.log('Usuário registrado com sucesso:', response);
      // Redirecionar para login ou mostrar mensagem de sucesso
      push('/login');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert('Erro ao registrar. Tente novamente.');
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
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
          <Typography variant="h5" align="center">
            Realize seu cadastro!
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ mt: 3 }}>
              <TextField
                label="Nome Completo"
                fullWidth
                {...register('fullName', { required: 'Nome Completo é obrigatório!' })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />

              <TextField
                label="E-mail"
                fullWidth
                type="email"
                {...register('email', { 
                  required: 'E-mail é obrigatório!', 
                  pattern: { 
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                    message: 'E-mail inválido!' 
                  } 
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <RadioGroup
                aria-label="user-type"
                name="userType"
                {...register('userType', { required: 'Tipo de usuário é obrigatório!' })}
                row
              >
                <FormControlLabel value="aluno" control={<Radio />} label="Aluno" />
                <FormControlLabel value="professor" control={<Radio />} label="Professor" />
              </RadioGroup>

              {errors.userType && <Typography color="error">{errors.userType?.message}</Typography>}

              <TextField
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                {...register('password', { required: 'Senha é obrigatória!' })}
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

              <TextField
                label="Confirmação de Senha"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                {...register('confirmPassword', { required: 'Confirmação de senha é obrigatória!' })}
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
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                loading={isLoading} // Indicador de carregamento
              >
                Salvar
              </LoadingButton>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 3, cursor: 'pointer' }}>
              <Link variant="subtitle2" underline="hover" onClick={() => push('/login')}>
                Já tem uma conta? Entrar
              </Link>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Box>
  );
}

