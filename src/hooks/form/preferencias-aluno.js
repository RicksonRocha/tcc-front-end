import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'src/routes/hooks/use-router';

// Esquema de validação com Yup
const schemaPreferenciasAluno = yup.object().shape({
  turno: yup
    .string()
    .required('Turno é obrigatório!'),
  linguagemProgramacao: yup
    .string()
    .max(3, 'Pode-se informar até 3 linguagens')
    .required('Linguagem de programação é obrigatório!'),
  bancoDeDados: yup
    .string()
    .max(2, 'Pode-se informar até 2 bancos de dados')
    .required('Banco de dados é obrigatório!'),
  nivelDeExperiencia: yup
    .string()
    .required('Nível de experiência é obrigatório!'),
  habilidadesPessoais: yup
    .string()
    .min(2, 'Deve ser informado no mínimo 2 habilidades')
    .max(4, 'Pode-se informar até 4 habilidades')
    .required('Habilidades pessoais é obrigatório!'),
  temasDeInteresse: yup
    .string()
    .min(2, 'Deve ser informado no mínimo 2 temas de interesse')
    .max(4, 'Pode-se informar até 4 temas')
    .required('Temas de interesse é obrigatório!'),
});

export default schemaPreferenciasAluno;