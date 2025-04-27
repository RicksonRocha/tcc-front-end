import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Nome é um campo obrigatório'),
  description: yup.string().required('Descrição é um campo obrigatório'),
  startDate: yup.date().required('Início é um campo obrigatório'),
  endDate: yup.date().required('Fim é um campo obrigatório'),
  isActive: yup.boolean().default(false),
  team: yup.string()
});

export { schema };
