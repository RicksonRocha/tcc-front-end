import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useSnackbar } from 'notistack';
import { useGetTeamsQuery } from 'src/api/team'; 
import TeamCard from '../team-card';
import TeamFilters from '../team-filters';

export default function TeamsView() {
  const { enqueueSnackbar } = useSnackbar();
  
  // Usando o hook 
  const { data: teams = [], isLoading, error } = useGetTeamsQuery();
  
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredTeam, setFilteredTeam] = useState({
    teamStatus: '',
    themes: [],
    teacherTcc: [],
  });

  if (error) {
    enqueueSnackbar("Erro ao carregar equipes.", {
      variant: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    });
  }

  const filteredTeams = teams.filter((team) => {
    const { teamStatus, themes, teacherTcc } = filteredTeam;

    const statusMatch = !teamStatus || (teamStatus === 'Completa' ? team.isActive : !team.isActive);
    const themesMatch = themes.length === 0 || themes.some((tema) => team.themes?.includes(tema));
    const teacherTccMatch =
      teacherTcc.length === 0 ||
      (teacherTcc.includes('Com orientador(a)') && team.teacherTcc) ||
      (teacherTcc.includes('Sem orientador(a)') && !team.teacherTcc);

    return statusMatch && themesMatch && teacherTccMatch;
  });

  const renderContent = () => {
    if (isLoading) {
      return Array.from(new Array(8)).map((_, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <Skeleton variant="rounded" height={200} sx={{ borderRadius: 2 }} />
          <Skeleton variant="text" height={32} sx={{ mt: 2, width: '60%' }} />
          <Skeleton variant="text" height={32} sx={{ width: '80%' }} />
        </Grid>
      ));
    }

    if (filteredTeams.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography variant="body1" align="left" sx={{ ml: 3 }}>
            Nenhuma equipe encontrada.
          </Typography>
        </Grid>
      );
    }

    return filteredTeams.map((team) => (
      <Grid key={team.id} xs={12} sm={6} md={3}>
        <TeamCard team={team} />
      </Grid>
    ));
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Equipes
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-start"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <TeamFilters
            openFilter={openFilter}
            onOpenFilter={() => setOpenFilter(true)}
            onCloseFilter={() => setOpenFilter(false)}
            setFilteredTeam={setFilteredTeam}
          />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {renderContent()}
      </Grid>
    </Container>
  );
}




