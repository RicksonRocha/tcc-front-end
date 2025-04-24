import * as yup from 'yup';

// Esquema de validação com Yup
const schemaTeamForm = yup.object().shape({
  tccTitle: yup
    .string()
    .required('O título do TCC é obrigatório!')
    .min(30, 'O título do TCC deve ter no mínimo 30 caracteres.')
    .max(80, 'O título do TCC deve ter no máximo 80 caracteres.'),
    
  tccDescription: yup
    .string()
    .required('A descrição da proposta é obrigatória!')
    .min(180, 'A descrição da proposta deve ter no mínimo 180 caracteres.')
    .max(255, 'A descrição da proposta deve ter no máximo 255 caracteres.'),

  members: yup
    .array()
    .of(
      yup.object().shape({
        userId: yup.number().nullable(), // agora aceita null
        userName: yup.string().required('Nome do integrante é obrigatório.'),
      })
    )
    .min(1, 'Pelo menos um integrante é obrigatório!'),

  advisor: yup.mixed().nullable(), // aceita null ou string/number

  temasDeInteresse: yup
    .array()
    .of(yup.string().required('Cada tema precisa ser válido.'))
    .min(1, 'É necessário selecionar pelo menos 1 tema de interesse!')
    .max(3, 'Você pode selecionar no máximo 3 temas de interesse!')
    .required('Os temas de interesse são obrigatórios!'),
});

export default schemaTeamForm;