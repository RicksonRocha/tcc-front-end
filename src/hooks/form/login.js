import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'src/routes/hooks/use-router';

export const useLoginForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório!'),
    password: yup
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .max(32, 'A senha pode ter até 32 caracteres')
      .required('A senha é obrigatória!'),
  });

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
    resolver: yupResolver(schema),
    defaultValues, // Incluindo valores padrão
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      console.log('Dados do formulário:', data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    reset,
  };
};
