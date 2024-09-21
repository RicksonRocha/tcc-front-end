import { useForm } from 'react-hook-form';

import { useRouter } from 'src/routes/hooks';

// Função para validação teste e manipulação do formulário de registro
export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const router = useRouter();

  const onSubmit = (data) => {
    console.log('Form data:', data);

    // Simulação de cadastro de usuário
    if (data.password === data.confirmPassword) {
      console.log('Cadastro bem-sucedido!');
      
      // Redirecionar o usuário para a página de login
      router.push('/login');
    } else {
      console.error('Falha no cadastro: senhas não correspondem.');
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
