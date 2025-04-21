import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { useGetTeamsQuery } from 'src/api/team';

import AppOrderTimeline from '../app-order-timeline';
import AppCalendar from '../app-calendar';
import AppTeam from '../app-team';
import AppRequestsCard from '../app-requests-card';

export default function AppView() {
  // Obtém os dados do usuário logado
  const user = useSelector((state) => state.auth.auth.user);

  // Consulta todas as equipes
  const { data: teams = [], isLoading, isError } = useGetTeamsQuery();

  // Filtra para encontrar a equipe que contenha o nome do usuário
  const myTeam = teams.find((team) => team.members?.some((member) => member.userId === user?.id));
  const renderTeamContent = () => {
    if (isLoading) {
      return <Typography variant="body1">Carregando equipe...</Typography>;
    }
    if (isError) {
      return (
        <Typography variant="body1" color="error">
          Erro ao carregar equipe.
        </Typography>
      );
    }
    return <AppTeam team={myTeam} />;
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Olá, bem vindo(a) 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12}>
          <Box sx={{ mt: 3, width: '100%' }}>{renderTeamContent()}</Box>
        </Grid>

        <Grid item xs={12}>
          <AppRequestsCard />
        </Grid>

        <Grid item xs={12}>
          <AppCalendar />
        </Grid>
      </Grid>
    </Container>
  );
}
