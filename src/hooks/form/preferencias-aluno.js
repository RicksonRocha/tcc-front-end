import * as yup from 'yup';

// Esquema de validação com Yup
const schemaPreferenciasAluno = yup.object().shape({
  turno: yup
    .string()
    .required('Turno é obrigatório!'),
  linguagemProgramacao: yup
    .array()
    .min(1, 'Deve ser informado no mínimo 1 linguagem de programação')
    .max(3, 'Pode-se informar até 3 linguagens')
    .required('Linguagem de programação é obrigatória!'),
  bancoDeDados: yup
    .array()
    .min(1, 'Deve ser informado no mínimo 1 banco de dados')
    .max(2, 'Pode-se informar até 2 bancos de dados')
    .required('Banco de dados é obrigatório!'),
  nivelDeExperiencia: yup
    .string()
    .required('Nível de experiência é obrigatório!'),
  habilidadesPessoais: yup
    .array()
    .min(2, 'Deve ser informado no mínimo 2 habilidades')
    .max(4, 'Pode-se informar até 4 habilidades')
    .required('Habilidades pessoais são obrigatórias!'),
  temasDeInteresse: yup
    .array()
    .min(2, 'Deve ser informado no mínimo 2 temas de interesse')
    .max(4, 'Pode-se informar até 4 temas de interesse')
    .required('Temas de interesse são obrigatórios!'),
});

export default schemaPreferenciasAluno;