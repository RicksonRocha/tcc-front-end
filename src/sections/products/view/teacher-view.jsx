import { useState } from 'react';
import { useGetProfessorPreferencesQuery } from 'src/api/preference-prof';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TeacherFilters from '../teacher-filters';
import Clustering from './clustering';
import TeacherCard from '../teacher-card';

export default function TeacherView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState({
    teacherDisp: '',
    turno: '',
    temasTCC: [],
  });

  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  // Busca os dados reais das preferências de professor
  const { data: professorPreferences = [], isLoading, error } = useGetProfessorPreferencesQuery();

  // Converte o valor real de disponivelOrientacao para o label usado no filtro
  const getOrientationStatus = teacher =>
    teacher.disponivelOrientacao === 'Sim'
      ? 'Disponível para Orientação'
      : 'Indisponível para Orientação';

  // Filtra os professores com base nos filtros aplicados
  const filteredTeachers = professorPreferences.filter((teacher) => {
    if (filterState.teacherDisp && getOrientationStatus(teacher) !== filterState.teacherDisp) {
      return false;
    }
    if (filterState.turno && teacher.turno !== filterState.turno) {
      return false;
    }
    if (filterState.temasTCC.length > 0) {
      const temas = teacher.temasInteresse
        ? teacher.temasInteresse.split(',').map((t) => t.trim())
        : [];
      if (!filterState.temasTCC.some((tema) => temas.includes(tema))) {
        return false;
      }
    }
    return true;
  });

  let content;
  if (isLoading) {
    content = <Typography>Carregando...</Typography>;
  } else if (error) {
    content = <Typography>Erro ao carregar orientadores.</Typography>;
  } else {
    content = filteredTeachers.map((teacher) => (
      <Grid key={teacher.id} xs={12} sm={6} md={3}>
        <TeacherCard teacher={teacher} />
      </Grid>
    ));
  }

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
            filterState={filterState}
            setFilterState={setFilterState}
          />
          <Clustering targetRole="professor" />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {content}
      </Grid>
    </Container>
  );
}