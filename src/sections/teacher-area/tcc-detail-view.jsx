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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useGetTeamByIdQuery } from 'src/api/team';
import { useGetEventsQuery } from 'src/api/event';
import { useGetMaterialsByTeamIdQuery } from 'src/api/materials-support';

export default function TccDetailView() {
  const { teamId } = useParams();

  const { data: team, isLoading, isError } = useGetTeamByIdQuery(teamId);
  const {
    data: events = [],
    isLoading: loadingEvents,
    isError: errorEvents,
  } = useGetEventsQuery(teamId);
  const {
    data: materials = [],
    isLoading: loadingMaterials,
    isError: errorMaterials,
  } = useGetMaterialsByTeamIdQuery(teamId);

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (isError || !team) return <Typography>Erro ao carregar TCC</Typography>;

  // Função auxiliar para renderizar a tabela de eventos
  function renderEventsTable() {
    if (loadingEvents) {
      return <Typography>Carregando eventos...</Typography>;
    }
    if (errorEvents) {
      return <Typography color="error">Erro ao carregar eventos.</Typography>;
    }
    if (events.length === 0) {
      return <Typography>Nenhum evento encontrado.</Typography>;
    }
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nome</strong>
              </TableCell>
              <TableCell>
                <strong>Descrição</strong>
              </TableCell>
              <TableCell>
                <strong>Início</strong>
              </TableCell>
              <TableCell>
                <strong>Fim</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>
                  {new Date(event.startDate).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  {new Date(event.endDate).toLocaleDateString('pt-BR')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  // Função auxiliar para renderizar a tabela de materiais
  function renderMaterialsTable() {
    if (loadingMaterials) {
      return <Typography>Carregando materiais...</Typography>;
    }
    if (errorMaterials) {
      return <Typography color="error">Erro ao carregar materiais.</Typography>;
    }
    if (materials.length === 0) {
      return <Typography>Nenhum material encontrado.</Typography>;
    }
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nome</strong>
              </TableCell>
              <TableCell>
                <strong>Autor</strong>
              </TableCell>
              <TableCell>
                <strong>Link</strong>
              </TableCell>
              <TableCell>
                <strong>Data</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.name}</TableCell>
                <TableCell>{material.autor}</TableCell>
                <TableCell>
                  <a
                    href={material.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1976d2' }}
                  >
                    Acessar
                  </a>
                </TableCell>
                <TableCell>
                  {new Date(material.date).toLocaleDateString('pt-BR')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

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
          <Typography variant="body1">
            {team.isActive ? 'Completa' : 'Aberta'}
          </Typography>
        </Box>
      </Card>

      {/* Eventos em tabela */}
      <Card sx={{ width: '100%', px: 3, py: 3, my: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Próximos eventos
          </Typography>
          {renderEventsTable()}
        </Box>
      </Card>

      {/* Materiais de apoio em tabela */}
      <Card sx={{ width: '100%', px: 3, py: 3, my: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Materiais de apoio
          </Typography>
          {renderMaterialsTable()}
        </Box>
      </Card>
    </Container>
  );
}
