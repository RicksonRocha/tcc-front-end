import * as yup from 'yup';

const schemaPreferenciasProfessor = yup.object().shape({
  shift: yup.string().required('Turno é obrigatório!'),
  availableForAdvising: yup.string().required('Disponibilidade para orientação é obrigatória!'),
  programmingLanguages: yup
    .array()
    .of(yup.string())
    .min(3, 'Selecione pelo menos 3 linguagens!'),
  taughtSubjects: yup
    .array()
    .of(yup.string())
    .min(3, 'Selecione pelo menos 3 disciplinas!'),
  personalSkills: yup
    .array()
    .of(yup.string())
    .min(3, 'Selecione pelo menos 3 habilidades!'),
  interestTopics: yup
    .array()
    .of(yup.string())
    .min(3, 'Selecione pelo menos 3 temas de interesse!'),
  availability: yup.string().required('Disponibilidade é obrigatória!'),
  workModality: yup.string().required('Modalidade de trabalho é obrigatória!'),
});

export default schemaPreferenciasProfessor;
