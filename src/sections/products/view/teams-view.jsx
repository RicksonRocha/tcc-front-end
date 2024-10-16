import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { teams } from 'src/_mock/teams'; 

import TeamCard from '../team-card';
import TeamFilters from '../team-filters';

// ----------------------------------------------------------------------

export default function TeamsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredTeam, setFilteredTeam] = useState(''); 

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // Filtrar equipes com base no status de equipe (Aberta ou Completa)
  const filteredTeams = teams.filter((team) => {
    if (filteredTeam === '') return true; 
    return team.status === filteredTeam; 
  });

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
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            setFilteredTeam={setFilteredTeam} // Passa a função de filtro de equipe
          />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {filteredTeams.map((team) => (
          <Grid key={team.id} xs={12} sm={6} md={3}>
            <TeamCard team={team} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

