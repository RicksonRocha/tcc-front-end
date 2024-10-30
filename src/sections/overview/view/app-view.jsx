import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppOrderTimeline from '../app-order-timeline';
import AppCalendar from '../app-calendar';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Olá, bem vindo(a) 👋
      </Typography>

      <Grid container spacing={3}>

        {/* Timeline Sobre o Sistema */}
        <Grid xs={6} md={6} lg={6}>
          <AppOrderTimeline
            title="Sobre o Sistema"
            list={[...Array(6)].map((_, index) => ({
              id: index,
              title: [
                'Apresenta sugestões de união entre perfis para desenvolvimento do TCC',
                'Auxilia a conexão de diferentes ideias',
                'Permite filtragens para perfis, equipes e orientadores',
                'Disponibiliza seção de Cronograma e Materiais de Apoio',
                'Possibilita mais organização e transparência',
                'Permite acompanhamento do(a) orientador(a)',
              ][index],
              type: `order${index + 1}`,
            }))}
            sx={{ width: '100%' }} 
          />
        </Grid>

        {/* Timeline Fases do TCC */}
        <Grid xs={6} md={6} lg={6}>
          <AppOrderTimeline
            title="Fases Gerais do Trabalho de Conclusão de Curso"
            list={[...Array(6)].map((_, index) => ({
              id: index,
              title: [
                'Formação da equipe',
                'Definição de professor(a) orientador(a)',
                'Aprovação da proposta',
                'Desenvolvimento e entrega do TCC 1',
                'Validação com orientador(a)',
                'Desenvolvimento e entrega do TCC 2',
              ][index],
              type: `order${index + 1}`,
            }))}
            sx={{ width: '100%' }} 
          />
        </Grid>

        {/* Calendário com próximos eventos - Simulação */}
        <Grid xs={12} md={12} lg={12}>
          <AppCalendar />
        </Grid>

      </Grid>
    </Container>
  );
}
