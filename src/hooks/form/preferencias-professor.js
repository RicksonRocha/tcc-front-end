import * as yup from 'yup';

const schemaPreferenciasProfessor = yup.object().shape({
  turno: yup.string().required('Turno é obrigatório!'),
  disponivelOrientacao: yup.string().required('Disponibilidade para orientação é obrigatória!'),
  linguagensProgramacao: yup.array().of(yup.string()),
  disciplinasLecionadas: yup.array().of(yup.string()),
  habilidadesPessoais: yup.array().of(yup.string()),
  temasInteresse: yup.array().of(yup.string()),
  disponibilidade: yup.string().required('Disponibilidade é obrigatória!'),
  modalidadeTrabalho: yup.string().required('Modalidade de trabalho é obrigatória!'),
});

export default schemaPreferenciasProfessor;
