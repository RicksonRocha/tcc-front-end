import { useForm } from 'react-hook-form';
import { useRouter } from 'src/routes/hooks';

export const useRegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    console.log('Form data:', data);

    if (data.password === data.confirmPassword) {
      console.log('Cadastro bem-sucedido!');
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
