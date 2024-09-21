import { useForm } from 'react-hook-form';

import { useRouter } from 'src/routes/hooks';

// Função para validação teste e manipulação do formulário de redefinição de senha
export const useResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const router = useRouter();

  const onSubmit = (data) => {
    console.log('Form data:', data);

    if (data.newPassword === data.confirmPassword) {
      console.log('Senha redefinida com sucesso!');
      
      router.push('/login');
    } else {
      console.error('Falha na redefinição: senhas não correspondem.');
      alert('As senhas não correspondem. Tente novamente.');
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
