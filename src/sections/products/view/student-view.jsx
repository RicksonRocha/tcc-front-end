import { useState } from 'react';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useSnackbar } from 'notistack';
import { useGetPreferencesQuery } from 'src/api/preference';
import { useGetTeamsQuery } from 'src/api/team';
import StudentCard from '../student-card';
import StudentFilters from '../student-filters';
import Clustering from './clustering';

export default function StudentView() {
  const { enqueueSnackbar } = useSnackbar();
  const { data: teams = [] } = useGetTeamsQuery();

  // Consulta as preferências
  const { data: preferences = [], isLoading, error } = useGetPreferencesQuery();

  const user = useSelector((state) => state.auth?.auth?.user);

  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState({
    teamStatus: '',
    turno: '',
    linguagemProgramacao: [],
    bancoDeDados: [],
    habilidadesPessoais: [],
    temasDeInteresse: [],
    modalidadeTrabalho: [],
  });

  if (error) {
    enqueueSnackbar("Erro ao carregar as preferências dos alunos.", {
      variant: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
    });
  }

  const filteredPreferences = preferences.filter((pref) => {
    const {
      teamStatus,
      turno,
      linguagemProgramacao,
      bancoDeDados,
      habilidadesPessoais,
      temasDeInteresse,
      modalidadeTrabalho,
    } = filterState;

    if (turno && pref.turno !== turno) return false;
    if (
      linguagemProgramacao.length > 0 &&
      !linguagemProgramacao.some(lang => pref.linguagemProgramacao?.includes(lang))
    )
      return false;
    if (
      bancoDeDados.length > 0 &&
      !bancoDeDados.some(bd => pref.bancoDeDados?.includes(bd))
    )
      return false;
    if (
      habilidadesPessoais.length > 0 &&
      !habilidadesPessoais.some(hab => pref.habilidadesPessoais?.includes(hab))
    )
      return false;
    if (
      temasDeInteresse.length > 0 &&
      !temasDeInteresse.some(tema => pref.temasDeInteresse?.includes(tema))
    )
      return false;

    if (modalidadeTrabalho.length > 0 &&
      !modalidadeTrabalho.includes(pref.modalidadeTrabalho)) {
      return false;
    }

    // Filtro por situação do aluno (equipe)
    if (teamStatus) {
      const isInTeam = pref.user_id && teams.some(team => team.createdById === pref.user_id);
      if (teamStatus === 'Com equipe' && !isInTeam) return false;
      if (teamStatus === 'Sem equipe' && isInTeam) return false;
    }

    return true;
  });

  // Remove as preferências do usuário logado
  const filteredPreferencesWithoutLoggedUser = filteredPreferences.filter(
    (pref) => (user ? pref.user_id !== user.id : true)
  );

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

    if (filteredPreferencesWithoutLoggedUser.length === 0) {
      return (
        <Grid xs={12}>
          <Typography variant="body1" align="left">
            Nenhum aluno encontrado.
          </Typography>
        </Grid>
      );
    }

    return filteredPreferencesWithoutLoggedUser.map((pref) => (
      <Grid key={pref.id} xs={12} sm={6} md={3}>
        <StudentCard student={pref} />
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
          <Clustering />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {renderContent()}
      </Grid>
    </Container>
  );
}
