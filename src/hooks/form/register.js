import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'src/routes/hooks/use-router';
import { useRegisterUserMutation } from 'src/api/user'; // Importa o hook para registrar usuário

// Esquema de validação com Yup
const schema = yup.object().shape({
  fullName: yup.string().required('Nome Completo é obrigatório!'),
  email: yup.string().email('E-mail inválido!').required('E-mail é obrigatório!'),
  userType: yup.string().required('Tipo de usuário é obrigatório!'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(32, 'A senha pode ter até 32 caracteres')
    .required('Senha é obrigatória!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas não correspondem!')
    .required('Confirmação de senha é obrigatória!'),
});

// Valores padrão para o formulário
const defaultValues = {
  fullName: '',
  email: '',
  userType: '',
  password: '',
  confirmPassword: '',
};

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues, 
  });

  const router = useRouter();
  const [registerUser] = useRegisterUserMutation(); 

  const onSubmit = async (data) => {
    try {
      // Faz a requisição para registrar o usuário
      const response = await registerUser(data).unwrap();
      console.log('Usuário registrado com sucesso:', response);

      reset(); // Resetar formulário após sucesso
      router.push('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
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
