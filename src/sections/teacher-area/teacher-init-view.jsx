import {
  Container,
  Stack,
  Typography,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Divider,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetTeamByidTeacherQuery } from 'src/api/team';
import { useRouter } from 'src/routes/hooks';
import { useNavigate } from 'react-router-dom';
import AppRequestsCard from '../overview/app-requests-card';
import NotificationRequestsCard from '../overview/notification-requests-card';

export default function TeacherInitView() {
  const user = useSelector((state) => state.auth.auth.user);
  const userId = user?.id;

  const { data, isLoading, error } = useGetTeamByidTeacherQuery(userId, {
    skip: !userId,
  });
  const { push } = useRouter();
  const navigate = useNavigate();
  // Garante que tccs sempre seja array
  const tccs = Array.isArray(data) ? data : [];

  if (!userId) {
    return (
      <Container sx={{ height: 'auto', py: 4 }}>
        <Typography color="error">Usuário não autenticado.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ height: 'auto', py: 4 }}>
      <Stack direction="column" alignItems="start" mb={3}>
        <Typography variant="h4" mb={1}>
          Bem-Vindo Professor!
        </Typography>
        <Typography variant="body1" textAlign="start">
          Equipes que você está gerenciando:
        </Typography>
      </Stack>
      <Card sx={{ width: '100%', px: 2, py: 2 }}>
        {(() => {
          if (isLoading) {
            return <Typography>Carregando...</Typography>;
          }

          if (error) {
            return <Typography color="error">Erro ao carregar TCCs.</Typography>;
          }

          if (tccs.length === 0) {
            return <Typography>Nenhum TCC encontrado.</Typography>;
          }

          return (
            <>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                  <Box sx={{ width: 55, height: 40 }} />
                  <span>Nome do TCC</span>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <span>Quantidade de membros</span>
                </Box>
                <Box sx={{ width: 140, textAlign: 'right', pr: 2 }}>
                  <span>Ação</span>
                </Box>
              </Box>
              <Divider sx={{ mb: 1 }} />

              {/* Lista de TCCs */}
              <List disablePadding>
                {tccs.map((tcc, index) => {
                  const memberCount = tcc.members?.length || 0;
                  return (
                    <Box key={tcc.id}>
                      <ListItem
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          px: 1,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 600 }}
                            >
                              {tcc?.name?.trim() ? tcc.name.trim().charAt(0).toUpperCase() : '?'}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={tcc.name || 'Sem título'} />
                        </Box>

                        <Box sx={{ flex: 1, textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            {memberCount} membro{memberCount === 1 ? '' : 's'}
                          </Typography>
                        </Box>

                        <Box sx={{ width: 140, display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/tcc/${tcc.id}`)}
                          >
                            Ver mais
                          </Button>
                        </Box>
                      </ListItem>

                      {index < tccs.length - 1 && <Divider sx={{ my: 1, opacity: 0.2 }} />}
                    </Box>
                  );
                })}
              </List>
            </>
          );
        })()}
      </Card>
      <AppRequestsCard />
    </Container>
  );
}
