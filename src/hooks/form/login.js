import { useForm } from 'react-hook-form';

import { useRouter } from 'src/routes/hooks';

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const router = useRouter();

  const onSubmit = (data) => {
    console.log('Form data:', data);

    // Simulação de verificação de credenciais
    if (data.email === 'teste@exemplo.com' && data.password === '123456') {
      console.log('Login bem-sucedido!');
      
      // Redirecionar o usuário para o dashboard
      router.push('/dashboard');
    } else {
      console.error('Falha no login: credenciais inválidas.');
      alert('E-mail ou senha inválidos. Tente novamente.');
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
