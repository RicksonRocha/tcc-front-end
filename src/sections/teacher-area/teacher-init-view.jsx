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

export default function TeacherInitView() {
  const user = useSelector((state) => state.auth.auth.user);
  const { data: tccs = [], isLoading, error } = useGetTeamByidTeacherQuery(user?.id);
  const { push } = useRouter();
  const navigate = useNavigate();

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
        {isLoading ? (
          <Typography>Carregando...</Typography>
        ) : error ? (
          <Typography color="error">Erro ao carregar TCCs.</Typography>
        ) : tccs.length === 0 ? (
          <Typography>Nenhum TCC encontrado.</Typography>
        ) : (
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
              {/* Avatar + Nome */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <Box sx={{ width: 55, height: 40 }} /> {/* Espaço reservado para o avatar */}
                <span>Nome do TCC</span>
              </Box>
              {/* Quantidade de membros */}
              <Box sx={{ flex: 1, textAlign: 'center' }}>
                <span>Quantidade de membros</span>
              </Box>
              {/* Ação */}
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
                      {/* Avatar + título */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 600 }}>
                            {tcc?.name?.trim() ? tcc.name.trim().charAt(0).toUpperCase() : '?'}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={tcc.name || 'Sem título'} />
                      </Box>

                      {/* Quantidade de membros */}
                      <Box sx={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          {memberCount} membro{memberCount === 1 ? '' : 's'}
                        </Typography>
                      </Box>

                      {/* Botão Ver mais */}
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
        )}
      </Card>
    </Container>
  );
}
