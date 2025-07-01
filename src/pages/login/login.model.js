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
import { Helmet } from 'react-helmet-async';

export const useLoginModel = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(schemaLogin),
    defaultValues, // Incluindo valores padrão
  });

  const { reset } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(userLogin(data));

      if (response.payload.error) {
        enqueueSnackbar(response.payload.message, { variant: 'error' });
        return;
      }

      reset();

      const path = {
        PROFESSOR: '/init-page-teacher',
        ALUNO: '/my-profile',
        ADMIN: '/crud-users-adm',
      };

      push(path[response.payload.user.role]);
    } catch (e) {
      console.log('error', e);
    }
  };

  return { theme, showPassword, setShowPassword, methods, push, onSubmit };
};
