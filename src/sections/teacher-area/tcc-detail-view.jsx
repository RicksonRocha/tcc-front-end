import { useParams } from 'react-router-dom';
import { useGetTeamByIdQuery } from 'src/api/team';
import { Container, Typography, Stack, Divider, Card, Box, Breadcrumbs, Link } from '@mui/material';

export default function TccDetailView() {
  const { teamId } = useParams();
  const { data: team, isLoading, isError } = useGetTeamByIdQuery(teamId);

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (isError || !team) return <Typography>Erro ao carregar TCC</Typography>;

  return (
    <Container sx={{ height: 'auto', py: 4 }}>
      <Stack direction="column" alignItems="start" mb={3}>
        <Typography variant="h4" mb={1}>
          Detalhes do TCC
        </Typography>

        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="text.primary" href="/init-page-teacher">
            Início
          </Link>
          <Typography color="inherit">{team.name}</Typography>
        </Breadcrumbs>
      </Stack>

      <Card sx={{ width: '100%', px: 3, py: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Descrição
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {team.description}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Áreas de conhecimento
          </Typography>
          <Typography variant="body1">
            {team.themes?.join(', ') || 'Nenhum tema informado'}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Membros
          </Typography>
          <Typography variant="body1">
            {team.members?.length > 0
              ? team.members.map((m) => m.userName).join(', ')
              : 'Nenhum integrante'}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Status
          </Typography>
          <Typography variant="body1">{team.isActive ? 'Completa' : 'Aberta'}</Typography>
        </Box>
      </Card>

      <Card sx={{ width: '100%', px: 3, py: 3, my: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Próximos eventos
          </Typography>
        </Box>
      </Card>

      <Card sx={{ width: '100%', px: 3, py: 3, my: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Materiais de apoio
          </Typography>
        </Box>
      </Card>

      <Card sx={{ width: '100%', px: 3, py: 3, my: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Linha do tempo
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
