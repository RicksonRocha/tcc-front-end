import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const TEACHERS_NAMES = [
  'Jaime',
  'Rafaella',
  'Jeroniza',
  'Alex',
  'Rafael',
  'João Eugênio',
  'Razer',
  'Dieval',
  'Pedro',
  'Alessandro',
];

const TURNOS = ['Vespertino', 'Noturno', 'Vespertino e Noturno'];

// ----------------------------------------------------------------------

export const teachers = [...Array(10)].map((_, index) => {
  const disponibilidade = faker.datatype.boolean(); 
  const turno = TURNOS[faker.number.int({ min: 0, max: 2 })];
  const status = disponibilidade ? 'Disponível para Orientação' : 'Indisponível para Orientação'; 

  return {
    id: faker.string.uuid(),
    name: TEACHERS_NAMES[index],
    disponibilidade,
    turno,
    status,
  };
});



