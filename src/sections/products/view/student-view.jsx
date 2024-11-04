import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useSnackbar } from 'notistack'; // Importando useSnackbar
import StudentCard from '../student-card';
import StudentFilters from '../student-filters';

export default function StudentView() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const { enqueueSnackbar } = useSnackbar(); // Inicializando o Notistack
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/university/student');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setStudents(data);
        setError(null);
      } catch (err) {

        // Exibindo a notificação de erro com Notistack
        enqueueSnackbar("Erro ao carregar alunos.", {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [enqueueSnackbar]);

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

    if (error) {
      return (
        <Grid item xs={12}>
          <Typography color="error" variant="h6" align="center">
            {error}
          </Typography>
        </Grid>
      );
    }

    if (students.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography variant="body1" align="left" sx={{ ml: 3 }}>
            Nenhum aluno encontrado.
          </Typography>
        </Grid>
      );
    }

    return students.map((student) => (
      <Grid key={student.id} xs={12} sm={6} md={3}>
        <StudentCard student={student} />
      </Grid>
    ));
  };

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
            onOpenFilter={() => setOpenFilter(true)}
            onCloseFilter={() => setOpenFilter(false)}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {renderContent()}
      </Grid>
    </Container>
  );
}





