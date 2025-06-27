import { useState } from 'react';
import { useGetProfessorPreferencesQuery } from 'src/api/preference-prof';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useGetTeamByMemberQuery } from 'src/api/team';
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

  const currentUser = useSelector((state) => state.auth?.auth?.user);

  const { data: teamMember } = useGetTeamByMemberQuery(currentUser?.id, { skip: !currentUser?.id });

  const { data: professorPreferences = [], isLoading, error } = useGetProfessorPreferencesQuery();

  const getOrientationStatus = (teacher) => {
    const value = teacher.disponivelOrientacao || teacher.availableForAdvising || '';
    return value.toLowerCase() === 'sim'
      ? 'Disponível para Orientação'
      : 'Indisponível para Orientação';
  };

  const filteredTeachers = professorPreferences.filter((teacher) => {
    if (filterState.teacherDisp && getOrientationStatus(teacher) !== filterState.teacherDisp) {
      return false;
    }
    const turno = teacher.turno || teacher.shift;
    if (filterState.turno && turno !== filterState.turno) {
      return false;
    }
    const temas = teacher.temasInteresse || teacher.interestTopics || [];
    const temasList = typeof temas === 'string' ? temas.split(',').map((t) => t.trim()) : temas;
    if (
      filterState.temasTCC.length > 0 &&
      !filterState.temasTCC.some((tema) => temasList.includes(tema))
    ) {
      return false;
    }
    return true;
  });

  let content;
  if (error) {
    content = <Typography>Erro ao carregar orientadores.</Typography>;
  } else {
    content = filteredTeachers.map((teacher) => (
      <Grid key={teacher.id} xs={12} sm={6} md={3}>
        <TeacherCard teacher={teacher} teamMember={teamMember} />
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
          <Clustering targetRole="professor" teamMember={teamMember} />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {content}
      </Grid>
    </Container>
  );
}
