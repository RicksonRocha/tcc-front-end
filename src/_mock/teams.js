import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const TEAMS_NAME = [
  'Desenvolvimento de um Sistema Automatizado de Gestão de Projetos com Integração de Metodologias Ágeis',
  'Aplicação de Inteligência Artificial para Análise Preditiva no Setor de E-commerce',
  'Criação de uma Plataforma de E-learning com Realidade Aumentada para Aulas Interativas',
  'Implementação de um Sistema de Gestão Empresarial Baseado em Cloud Computing para Pequenas e Médias Empresas',
  'Desenvolvimento de um Sistema de Big Data para Otimização de Processos Logísticos',
  'Plataforma de Desenvolvimento Colaborativo com Ferramentas Integradas de DevOps',
  'Sistema de Automação de Processos com Integração de Robotic Process Automation (RPA)',
  'Criação de um Sistema de Gestão de Comunidades com Foco em Experiência do Usuário e Engajamento',
  'Desenvolvimento de uma Aplicação Mobile para Monitoramento de Saúde com Integração de Dispositivos Wearables',
  'Desenvolvimento de uma Ferramenta de Design Assistida por Inteligência Artificial para Criação de Interfaces Interativas',
  'Solução de Reconhecimento de Padrões usando Redes Neurais para Detecção de Fraudes em Transações Financeiras',
  'Aplicação de Realidade Virtual para Simulação de Ambientes de Treinamento Corporativo',
];

// ----------------------------------------------------------------------

export const teams = [...Array(12)].map((_, index) => {
  const members = faker.number.int({ min: 2, max: 5 }); // Adicionando quantidade de membros (2 a 5)
  const status = members < 5 ? 'Equipe Aberta' : 'Equipe Completa'; // Status baseado no número de membros

  return {
    id: faker.string.uuid(),
    name: TEAMS_NAME[index],
    members,
    status,
  };
});


