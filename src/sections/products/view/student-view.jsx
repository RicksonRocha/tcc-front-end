import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import StudentCard from '../student-card';
import StudentFilters from '../student-filters';

export default function StudentView() {
  const [students, setStudents] = useState([]); // Estado para armazenar os alunos da API
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
  const [error, setError] = useState(null); // Estado para armazenar o erro

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/university/student');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setStudents(data); // Armazena os dados dos alunos no estado
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar estudantes:", err);
        setError({ message: "Erro ao carregar alunos", details: err.toString() });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Para exibir mensagens de erro, carregamento ou lista vazia
  if (isLoading) return <Typography>Carregando...</Typography>;
  if (error && error.message) return <Typography>Erro ao carregar alunos: {error.message}</Typography>;
  if (students.length === 0) return <Typography>Nenhum aluno encontrado.</Typography>;

  // Filtra alunos 
  const filteredStudents = students.filter((student) => {
    
    // Filtra por equipe
    if (filterState.studentTeam && student.status !== filterState.studentTeam) {
      return false;
    }

    // Filtra por turno
    if (filterState.turno && student.turno !== filterState.turno) {
      return false;
    }

    // Filtra por linguagem de programação
    if (filterState.linguagem.length > 0 &&
      !filterState.linguagem.some((linguagem) => student.linguagem?.includes(linguagem))) {
      return false;
    }

    // Filtra por tecnologia de banco de dados
    if (filterState.techBD.length > 0 &&
      !filterState.techBD.some((tech) => student.techBD?.includes(tech))) {
      return false;
    }

    // Filtra por habilidades pessoais
    if (filterState.habilidadesPessoais.length > 0 &&
      !filterState.habilidadesPessoais.some((habilidade) => student.habilidadesPessoais?.includes(habilidade))) {
      return false;
    }

    // Filtra por temas de TCC
    if (filterState.temasTCC.length > 0 &&
      !filterState.temasTCC.some((tema) => student.temasTCC?.includes(tema))) {
      return false;
    }

    // Filtra por modalidade de agenda
    if (filterState.modalidadeAgendas.length > 0 &&
      !filterState.modalidadeAgendas.some((modalidade) => student.modalidadeAgendas?.includes(modalidade))) {
      return false;
    }

    return true;
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
            onOpenFilter={() => setOpenFilter(true)}
            onCloseFilter={() => setOpenFilter(false)}
            filterState={filterState}
            setFilterState={setFilterState}
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




