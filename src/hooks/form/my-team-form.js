import * as yup from 'yup';

// Esquema de validação com Yup
const schemaTeamForm = yup.object().shape({
  tccTitle: yup.string().required('O título do TCC é obrigatório!'),
  tccDescription: yup.string().required('A descrição da proposta é obrigatória!'),
  members: yup
    .array()
    .of(yup.string().required('Cada integrante precisa ter um nome.'))
    .min(1, 'Pelo menos um integrante é obrigatório!'),
  advisor: yup.string().notRequired(), // O orientador é opcional
  temasDeInteresse: yup
    .array()
    .of(yup.string().required('Cada tema precisa ser válido.'))
    .min(1, 'É necessário selecionar pelo menos 1 tema de interesse!')
    .max(3, 'Você pode selecionar no máximo 3 temas de interesse!')
    .required('Os temas de interesse são obrigatórios!'),
});

export default schemaTeamForm;


