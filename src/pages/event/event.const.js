const radioOptions = [
  { value: true, label: 'Ativo' },
  { value: false, label: 'Cancelado' },
];

const colorStatus = {
  scheduled: '#FFD700', // Amarelo para "Agendado"
  confirmed: '#2196F3', // Azul para "Confirmado"
  completed: '#4CAF50', // Verde para "Concluído"
  canceled: '#F44336', // Vermelho para "Cancelado"
};

export { colorStatus, radioOptions };
