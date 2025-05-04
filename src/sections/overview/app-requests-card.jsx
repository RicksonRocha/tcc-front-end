import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useCreateNotificationMutation } from 'src/api/notifications';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import {
  useGetRequestsByOwnerQuery,
  useAcceptRequestEntryMutation,
  useDeleteRequestEntryMutation,
} from 'src/api/requestEntryTcc';

import { useGetTeamsQuery } from 'src/api/team';

export default function AppRequestsCard() {
  const currentUser = useSelector((state) => state.auth?.auth?.user);
  const { enqueueSnackbar } = useSnackbar();

  const { data: allTeams = [] } = useGetTeamsQuery();

  const {
    data: requests = [],
    isLoading,
    isError,
  } = useGetRequestsByOwnerQuery(currentUser?.id, {
    skip: !currentUser,
  });

  const [acceptRequestEntry] = useAcceptRequestEntryMutation();
  const [deleteRequestEntry] = useDeleteRequestEntryMutation();
  const [createNotification] = useCreateNotificationMutation();

  const handleAccept = async (request) => {
    try {
      await acceptRequestEntry(request.id).unwrap(); // isso já remove o request
      enqueueSnackbar('Solicitação aceita com sucesso.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao aceitar solicitação.', { variant: 'error' });
    }
  }
  
  const handleReject = async (request) => {
    try {
      const tcc = allTeams.find((team) => team.id === request.tccid);
      const tccName = tcc?.name || 'desconhecida';
  
      await createNotification({
        senderId: currentUser.id,
        nomeRemetente: currentUser.name,
        receiverId: request.requesterId,
        nomeDestinatario: request.requesterName,
        message: `Sua solicitação de entrada na equipe "${tccName}" foi recusada.`,
      }).unwrap();
  
      await deleteRequestEntry(request.id).unwrap();
  
      enqueueSnackbar('Solicitação recusada com sucesso.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao recusar solicitação.', { variant: 'error' });
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography variant="body1" color="error">
        Erro ao carregar solicitações de entrada.
      </Typography>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Solicitações de entrada em Equipe
        </Typography>

        {requests.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Não há solicitações de entrada pendentes.
          </Typography>
        ) : (
          <Stack spacing={2} mt={2} divider={<Divider />}>
            {requests.map((req) => (
              <Box key={req.id} sx={{ p: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontSize: 16 }}>
                    <Box component="span" fontWeight="bold">
                      {req.requesterName}
                    </Box>{' '}
                    deseja entrar na sua equipe!
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Button variant="contained" color="success" onClick={() => handleAccept(req)}>
                      Aceitar
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleReject(req)}>
                      Recusar
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

