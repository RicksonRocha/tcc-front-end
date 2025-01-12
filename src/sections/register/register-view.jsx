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
import Alert from '@mui/material/Alert';
import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'src/routes/hooks/use-router';
import { useForm, Controller } from 'react-hook-form';
import schemaRegister from 'src/hooks/form/register';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'src/features/auth/auth-actions';

export default function RegisterView() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Estado para mensagem de sucesso
  const dispatch = useDispatch();
  const { push } = useRouter();

  const defaultValues = {
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  };

  const {
    auth: { user },
    loading,
  } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaRegister),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(registerUser(data)).unwrap(); // Garante que os dados sejam acessados
      console.log('Response:', response); // Debug para verificar a resposta correta
  
      if (response) {
        setSuccessMessage('Cadastro realizado com sucesso!');
        reset(); // Limpa os campos do formulário
        setTimeout(() => {
          setSuccessMessage('');
          push('/login'); // Redireciona após sucesso
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error); // Mensagem clara para debug
    }
  };  

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ mt: 2 }}>
        <TextField
          label="Nome Completo"
          fullWidth
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="E-mail"
          fullWidth
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Ajustado para usar Controller */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="ALUNO" control={<Radio />} label="Aluno" />
              <FormControlLabel value="PROFESSOR" control={<Radio />} label="Professor" />
            </RadioGroup>
          )}
        />
        {errors.role && <Typography color="error">{errors.role?.message}</Typography>}

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

        {/* Renderiza mensagem de sucesso */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {renderForm()}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 2, cursor: 'pointer' }}
        >
          <Link variant="subtitle2" underline="hover" onClick={() => push('/login')}>
            Já tem uma conta? Entrar
          </Link>
        </Stack>
      </Card>
    </Box>
  );
}



