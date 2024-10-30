import * as yup from 'yup';

// Esquema de validação com Yup
const schemaPreferenciasProfessor = yup.object().shape({
  turno: yup
    .array()
    .required('Turno é obrigatório!'),
  disponivelOrientacao: yup
    .string()
    .required('Disponibilidade é obrigatório!'),
  linguagemProgramacao: yup
    .array()
    .min(1, 'Deve ser informado no mínimo 1 linguagem de programação')
    .max(2, 'Pode-se informar até 2 linguagens')
    .required('Linguagem de programação é obrigatória!'),
  disciplinasLecionadas: yup
    .array()
    .min(2, 'Deve ser informado no mínimo 2 disciplinas')
    .max(4, 'Pode-se informar até 4 disciplinas')
    .required('Disciplinas são obrigatórias!'),
  habilidadesPessoais: yup
    .array()
    .min(2, 'Deve ser informado no mínimo 2 habilidades')
    .max(3, 'Pode-se informar até 3 habilidades')
    .required('Habilidades pessoais são obrigatórias!'),
  temasDeInteresse: yup
    .array()
    .min(2, 'Deve ser informado no mínimo 2 temas de interesse')
    .max(3, 'Pode-se informar até 3 temas de interesse')
    .required('Temas de interesse são obrigatórios!'),
  disponibilidade: yup
    .array()
    .required('Disponibilidade é obrigatório!'),
  modalidadeTrabalho: yup
    .array()
    .required('Modalidade de trabalho é obrigatório!'),
});

export default schemaPreferenciasProfessor;