import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { teams } from 'src/_mock/teams';

import TeamCard from '../team-card';
import TeamSort from '../team-sort';
import TeamFilters from '../team-filters';

// ----------------------------------------------------------------------

export default function TeamsView() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
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
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <TeamFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <TeamSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {teams.map((team) => (
          <Grid key={team.id} xs={12} sm={6} md={3}>
            <TeamCard team={team} />
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}
