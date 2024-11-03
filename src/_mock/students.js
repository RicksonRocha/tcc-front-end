import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const STUDENTS_NAMES = [
  'João Silva',
  'Maria Oliveira',
  'Pedro Souza',
  'Ana Costa',
  'Lucas Pereira',
  'Gabriela Mendes',
  'Carlos Lima',
  'Fernanda Rocha',
  'Rafael Barbosa',
  'Isabela Santos',
  'Bruno Ferreira',
  'Juliana Alves',
];

const TURNOS = ['Vespertino', 'Noturno'];

// ----------------------------------------------------------------------

export const students = [...Array(12)].map((_, index) => {
  const inTeam = faker.datatype.boolean(); // Indicar se o aluno está em uma equipe
  const turno = TURNOS[faker.number.int({ min: 0, max: 1 })];
  const status = inTeam ? 'Com equipe' : 'Sem equipe'; 

  return {
    id: faker.string.uuid(),
    name: STUDENTS_NAMES[index],
    inTeam,
    turno,
    status,
  };
});



