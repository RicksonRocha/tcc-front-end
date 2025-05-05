import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Stack,
  Divider,
  Card,
  Box,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useGetTeamByIdQuery } from 'src/api/team';
import { useGetEventsQuery } from 'src/api/event'; // IMPORTANTE

export default function TccDetailView() {
  const { teamId } = useParams();
  const { data: team, isLoading, isError } = useGetTeamByIdQuery(teamId);
  const {
    data: events = [],
    isLoading: loadingEvents,
    isError: errorEvents,
  } = useGetEventsQuery(teamId); // NOVO

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (isError || !team) return <Typography>Erro ao carregar TCC</Typography>;

  return (
    <Container sx={{ height: 'auto', py: 4 }}>
      <Stack direction="column" alignItems="start" mb={3}>
        <Typography variant="h4" mb={1}>
          Detalhes do TCC
        </Typography>

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

          {/* Cabeçalho fixo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 1,
              py: 1,
              fontWeight: 'bold',
              color: 'text.secondary',
            }}
          >
            <Box sx={{ gap: 2, flex: 1 }}>
              <span>Nome do evento</span>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'left' }}>
              <span>Descrição do evento</span>
            </Box>
            <Box sx={{ width: 120, textAlign: 'left', pr: 2 }}>
              <span>Início</span>
            </Box>
            <Box sx={{ width: 120, textAlign: 'left', pr: 2 }}>
              <span>Fim</span>
            </Box>
          </Box>
          <Divider sx={{ mb: 1 }} />

          {/* Lista de eventos */}
          {loadingEvents && (
            <Typography>Carregando eventos...</Typography>
          )}

          {!loadingEvents && errorEvents && (
            <Typography color="error">Erro ao carregar eventos.</Typography>
          )}

          {!loadingEvents && !errorEvents && events.length === 0 && (
            <Typography>Nenhum evento encontrado.</Typography>
          )}

          {!loadingEvents && !errorEvents && events.length > 0 && (
            <List disablePadding>
              {events.map((event, index) => (
                <Box key={event.id}>
                  <ListItem
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 1,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">{event.name}</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                    </Box>
                    <Box sx={{ width: 120 }}>
                      <Typography variant="body2">
                        {new Date(event.startDate).toLocaleDateString('pt-BR')}
                      </Typography>
                    </Box>
                    <Box sx={{ width: 120 }}>
                      <Typography variant="body2">
                        {new Date(event.endDate).toLocaleDateString('pt-BR')}
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < events.length - 1 && <Divider sx={{ my: 1, opacity: 0.2 }} />}
                </Box>
              ))}
            </List>
          )}
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
