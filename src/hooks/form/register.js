import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'src/routes/hooks/use-router';
import { useRegisterUserMutation } from 'src/api/user'; // Importa o hook para registrar usuário

// Esquema de validação com Yup
const schemaRegister = yup.object().shape({
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

export default schemaRegister;

