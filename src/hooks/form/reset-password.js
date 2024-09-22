import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'src/routes/hooks/use-router';
import { useResetPasswordMutation } from 'src/api/user'; // Importa o hook para redefinir a senha

// Definindo o esquema de validação com yup
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(32, 'A senha pode ter até 32 caracteres')
    .required('A nova senha é obrigatória!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'As senhas devem corresponder!')
    .required('A confirmação da senha é obrigatória!'),
});

const defaultValues = {
  newPassword: '',
  confirmPassword: '',
};

export const useResetPasswordForm = () => {
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
  const [resetPassword] = useResetPasswordMutation(); // Hook para redefinir a senha

  const onSubmit = async (data) => {
    try {
      // Faz a requisição para redefinir a senha
      await resetPassword(data).unwrap();
      console.log('Senha redefinida com sucesso!');
      
      reset(); // Resetar formulário após sucesso
      router.push('/login');
    } catch (error) {
      console.error('Erro na redefinição de senha:', error);
      alert('Erro ao redefinir a senha. Tente novamente.');
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
