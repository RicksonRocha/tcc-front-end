import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useSnackbar } from 'notistack';
import { useGetStudentsQuery } from 'src/api/student'; 
import StudentCard from '../student-card';
import StudentFilters from '../student-filters';

export default function StudentView() {
  const { enqueueSnackbar } = useSnackbar();
  
  // Usando o hook 
  const { data: students = [], isLoading, error } = useGetStudentsQuery();
  
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

  if (error) {
    enqueueSnackbar("Erro ao carregar alunos.", {
      variant: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    });
  }

  // Filtra alunos com base nos critérios de `filterState`
  const filteredStudents = students.filter((student) => {
    const {
      studentTeam, turno, linguagem, techBD, habilidadesPessoais,
      temasTCC, modalidadeAgendas,
    } = filterState;

    if (studentTeam && student.status !== studentTeam) return false;
    if (turno && student.turno !== turno) return false;
    if (linguagem.length > 0 && !linguagem.some((lang) => student.linguagem?.includes(lang))) return false;
    if (techBD.length > 0 && !techBD.some((tech) => student.techBD?.includes(tech))) return false;
    if (habilidadesPessoais.length > 0 && !habilidadesPessoais.some((habilidade) => student.habilidadesPessoais?.includes(habilidade))) return false;
    if (temasTCC.length > 0 && !temasTCC.some((tema) => student.temasTCC?.includes(tema))) return false;
    if (modalidadeAgendas.length > 0 && !modalidadeAgendas.some((modalidade) => student.modalidadeAgendas?.includes(modalidade))) return false;

    return true;
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

    if (filteredStudents.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            Nenhum aluno encontrado.
          </Typography>
        </Grid>
      );
    }

    return filteredStudents.map((student) => (
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





