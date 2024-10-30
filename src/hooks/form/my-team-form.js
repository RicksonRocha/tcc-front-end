import * as yup from 'yup';

// Esquema de validação com Yup
const schemaTeamForm = yup.object().shape({
  tccTitle: yup.string().required('O título do TCC é obrigatório!'),
  tccDescription: yup.string().required('A descrição da proposta é obrigatória!'),
  members: yup
    .array()
    .of(yup.string().required('Cada integrante precisa ter um nome.'))
    .min(1, 'Pelo menos um integrante é obrigatório!'),
  advisor: yup.string().notRequired(), 
});

export default schemaTeamForm;
