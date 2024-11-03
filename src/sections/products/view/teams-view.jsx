import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TeamCard from '../team-card';
import TeamFilters from '../team-filters';

export default function TeamsView() {
  const [teams, setTeams] = useState([]); // Estado para armazenar as equipes da API
  const [isLoading, setIsLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredTeam, setFilteredTeam] = useState({
    teamStatus: '',
    temasTCC: [],
    orientador: [],
  }); 
  const [error, setError] = useState(null); // Estado para armazenar o erro

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/university/tcc'); // URL da API de equipes
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setTeams(data); // Armazena os dados das equipes no estado
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar equipes:", err);
        setError({ message: "Erro ao carregar equipes", details: err.toString() });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams(); 
  }, []);

  // Filtra equipes com base nos critérios selecionados em filteredTeam
  const filteredTeams = teams.filter((team) => {
    const { teamStatus, temasTCC, orientador } = filteredTeam;

    const statusMatch = !teamStatus || (teamStatus === 'Completa' ? team.isActive : !team.isActive);
    const temasMatch = temasTCC.length === 0 || temasTCC.some((tema) => team.temas?.includes(tema));
    const orientadorMatch =
      orientador.length === 0 ||
      (orientador.includes('Com orientador(a)') && team.orientador) ||
      (orientador.includes('Sem orientador(a)') && !team.orientador);

    return statusMatch && temasMatch && orientadorMatch;
  });

  // Para exibir mensagens de erro, carregamento ou lista vazia
  if (isLoading) return <Typography>Carregando...</Typography>;
  if (error && error.message) return <Typography>Erro ao carregar equipes: {error.message}</Typography>;
  if (teams.length === 0) return <Typography>Nenhuma equipe encontrada.</Typography>;

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
            setFilteredTeam={setFilteredTeam} // Passa o estado de filtro completo ao pai
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


