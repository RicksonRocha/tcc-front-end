import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schemaLogin = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório!'),
  password: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(32, 'A senha pode ter até 32 caracteres')
    .required('A senha é obrigatória!'),
});

export default schemaLogin;
