import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { teachers } from 'src/_mock/teachers'; 
import TeacherCard from '../teacher-card';
import TeacherFilters from '../teacher-filters';

// ----------------------------------------------------------------------

export default function TeacherView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState({
    teacherDisp: '',
    turno: '',
    temasTCC: [],
  });

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // Filtros nos professores
  const filteredTeachers = teachers.filter((teacher) => {

    // Por equipe
    if (filterState.teacherDisp && teacher.status !== filterState.teacherDisp) {
      return false;
    }

    // Por turno
    if (filterState.turno && teacher.turno !== filterState.turno) {
      return false;
    }

    return true; 
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Orientadores
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-start"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <TeacherFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            filterState={filterState} // Passa o estado de filtros
            setFilterState={setFilterState} // Passa a função para atualizar os filtros
          />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {filteredTeachers.map((teacher) => (
          <Grid key={teacher.id} xs={12} sm={6} md={3}>
            <TeacherCard teacher={teacher} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
