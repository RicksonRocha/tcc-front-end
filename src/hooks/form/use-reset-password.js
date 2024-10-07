import * as yup from 'yup';
import { useRouter } from 'src/routes/hooks/use-router';
import { useResetPasswordMutation } from 'src/api/user'; // Importa o hook para redefinir a senha

// Definindo o esquema de validação com yup
const schemaResetPassword = yup.object().shape({
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

export default schemaResetPassword;




