import {
  Container,
  Stack,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  Divider,
  Skeleton,
  Grid,
} from '@mui/material';
import { useGetTeamsQuery } from 'src/api/team';

export default function TeacherInitView() {
  // Chamada à API usando Redux Toolkit Query
  const { data: tccs = [], isLoading, error } = useGetTeamsQuery();

  return (
    <Container
      sx={{ height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <Stack direction="column" alignItems="start">
        <Typography variant="h4" mb={1}>
          Bem-Vindo Professor!
        </Typography>
        <Typography variant="body1" textAlign="start" mb={3}>
          Equipes que você esta gerenciando:
        </Typography>
      </Stack>

      <Card sx={{ pl: 2.5, pr: 2.5, pt: 1.5, pb: 1.5, height: 'auto', width: '100%' }}>
        {isLoading ? (
          // Skeletons durante o carregamento
          <List>
            {Array.from(new Array(5)).map((_, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton width="60%" />}
                  secondary={<Skeleton width="80%" />}
                />
              </ListItem>
            ))}
          </List>
        ) : error ? (
          // Mensagem de erro
          <Typography variant="body1" color="error" textAlign="center">
            Erro ao carregar TCCs.
          </Typography>
        ) : tccs.length > 0 ? (
          // Renderiza a lista de TCCs
          <List disablePadding>
            {tccs.map((tcc, index) => {
              // Trunca a descrição para no máximo 100 caracteres
              const truncatedDescription =
                tcc.description.length > 100
                  ? `${tcc.description.slice(0, 100)}...`
                  : tcc.description;

              // Limita os membros a 1 nome e exibe "e mais X" se houver mais
              const truncatedMembers =
                tcc.members.length > 1
                  ? `${tcc.members[0]} e mais ${tcc.members.length - 1}`
                  : tcc.members.join(', ');

              return (
                <div key={tcc.id}>
                  <ListItem sx={{ pr: 0, pl: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main', fontSize: '0.90rem', mr: 2 }}>
                        {tcc.name[0].toUpperCase()} {/* Primeira letra do nome */}
                      </Avatar>
                    </ListItemAvatar>

                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <ListItemText primary={tcc.name} secondary={truncatedDescription} />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <ListItemText
                          primary={`Membros: ${truncatedMembers}`}
                          sx={{ minWidth: '200px' }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <ListItemButton
                          sx={{
                            fontSize: '0.90rem',
                            bgcolor: 'primary.main',
                            color: 'white',
                            fontWeight: 'medium',
                            borderRadius: 1,
                            py: 1,
                            px: 2,
                            width: '160px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            transition: '0.3s',
                            '&:hover': { bgcolor: 'primary.dark', boxShadow: 2 },
                          }}
                        >
                          Ver equipe
                        </ListItemButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                  {index < tccs.length - 1 && <Divider />}
                </div>
              );
            })}
          </List>
        ) : (
          <Typography variant="body1" textAlign="center">
            Nenhum TCC encontrado.
          </Typography>
        )}
      </Card>
    </Container>
  );
}
