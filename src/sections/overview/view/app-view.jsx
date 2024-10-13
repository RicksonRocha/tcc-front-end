import React from 'react';
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppOrderTimeline from '../app-order-timeline';
import AppTeam from '../app-team';

// ----------------------------------------------------------------------

export default function AppView() {

  // Simulação de dados do aluno logado
  const teamData = {
    teamName: 'Sistema xpto',
    description: 'Um sistema para facilitar a organização e acompanhamento de TCCs.',
    members: ['João Silva', 'Ana Pereira', 'Carlos Santos'],
    orientador: 'Prof. Dr. Maria Oliveira',
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Olá, bem vindo(a) 👋
      </Typography>

      <Grid container spacing={3}>

        <Grid xs={12} md={12} lg={12}>
          <AppOrderTimeline
            title="Sobre o Sistema"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Apresenta sugestões de união entre perfis para desenvolvimento do TCC',
                'Permite filtragens para perfis, equipes e orientadores',
                'Disponibiliza seção de Cronograma e Materiais de Apoio',
                'Possibilita mais organização e transparência',
                'Permite acompanhamento do(a) orientador(a)'
              ][index],
              type: `order${index + 1}`,
            }))}
            sx={{ width: '100%' }} 
          />
        </Grid>

        {/* Card com informações da equipe */}
        <Grid xs={12} md={12} lg={12}>
          <AppTeam
            teamName={teamData.teamName}
            description={teamData.description}
            members={teamData.members}
            orientador={teamData.orientador}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
