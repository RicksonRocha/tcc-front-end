import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { students } from 'src/_mock/students'; // Alunos mocados
import StudentCard from '../student-card';
import StudentFilters from '../student-filters';

// ----------------------------------------------------------------------

export default function StudentView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState({
    studentTeam: '',
    turno: '',
    linguagem: [],
    techBD: [],
    habilidadesPessoais: [],
    temasTCC: [],
    modalidadeAgendas: [],
  });

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // Filtros nos alunos
  const filteredStudents = students.filter((student) => {

    // Por equipe
    if (filterState.studentTeam && student.status !== filterState.studentTeam) {
      return false;
    }

    // Por turno
    if (filterState.turno && student.turno !== filterState.turno) {
      return false;
    }

    // Podem vir outros filtros aqui (como o de linguagem, techBD, etc.)

    return true; // Retorna o aluno se todos os filtros forem atendidos
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Alunos
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-start"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <StudentFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            filterState={filterState} // Passa o estado de filtros
            setFilterState={setFilterState} // Passa a função para atualizar os filtros
          />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {filteredStudents.map((student) => (
          <Grid key={student.id} xs={12} sm={6} md={3}>
            <StudentCard student={student} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
