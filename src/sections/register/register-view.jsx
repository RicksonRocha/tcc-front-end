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
import schemaRegister from 'src/hooks/form/register';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { push } = useRouter();

  // Valores padrão para o formulário
  const defaultValues = {
    fullName: '',
    email: '',
    userType: '',
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaRegister),
    defaultValues,
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      reset(); // Resetar formulário após sucesso
      router.push('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ mt: 2 }}>
        <TextField
          label="Nome Completo"
          fullWidth
          {...register('fullName')}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />

        <TextField
          label="E-mail"
          fullWidth
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <RadioGroup
          aria-label="user-type"
          name="userType"
          {...register('userType')}
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

        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 2, cursor: 'pointer' }}>
          <Link variant="subtitle2" underline="hover" onClick={() => push('/login')}>
            Já tem uma conta? Entrar
          </Link>
        </Stack>
      </Card>
    </Box>
  );
}
