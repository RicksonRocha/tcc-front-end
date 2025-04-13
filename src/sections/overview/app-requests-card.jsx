import React from 'react';
import { useSelector } from 'react-redux';
import {
  useGetRequestsByOwnerQuery,
  useAcceptRequestEntryMutation,
  useDeleteRequestEntryMutation,
} from 'src/api/requestEntryTcc';
import { useCreateNotificationMutation } from 'src/api/notifications';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Stack,
  Box,
  CircularProgress,
  Divider, // Import para usar como linha
} from '@mui/material';

import { useGetTeamsQuery } from 'src/api/team';

export default function AppRequestsCard() {
  const currentUser = useSelector((state) => state.auth?.auth?.user);

  // Obter todas as equipes, para descobrir o nome pelo tccid
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
      await acceptRequestEntry(request.id).unwrap();
      await deleteRequestEntry(request.id).unwrap();
    } catch (error) {
      console.error('Erro ao aceitar solicitação', error);
    }
  };

  const handleReject = async (request) => {
    try {
      const tcc = allTeams.find((team) => team.id === request.tccid);
      const tccName = tcc?.name || 'desconhecida';

      await createNotification({
        senderId: currentUser.id,
        nomeRemetente: currentUser.name,
        receiverId: request.requesterId,
        nomeDestinatario: request.requesterName,
        message: `Seu pedido de entrada na equipe ${tccName} foi recusado.`,
      }).unwrap();

      await deleteRequestEntry(request.id).unwrap();
    } catch (error) {
      console.error('Erro ao recusar solicitação', error);
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

  if (requests.length === 0) {
    return <Typography>Não há solicitações de entrada pendentes.</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Solicitações de Entrada na Sua Equipe
        </Typography>

        {/* 
          - Usa uma Stack com 'divider={<Divider />}' 
            para criar uma linha entre cada filho.
          - 'spacing={2}' controla o espaço vertical entre eles.
        */}
        <Stack spacing={2} mt={2} divider={<Divider />}>
          {requests.map((req) => (
            // Remove o border; só deixamos um Box para possível padding
            <Box key={req.id} sx={{ p: 1 }}>
              {/* 
                - Stack horizontal que exibe o texto e 
                  os botões no mesmo nível, ocupando as extremidades
              */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                {/* Mensagem com nome do solicitante */}
                <Typography variant="subtitle1">
                  {`${req.requesterName} deseja entrar na sua equipe`}
                </Typography>

                {/* Botões Aceitar/Recusar */}
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
      </CardContent>
    </Card>
  );
}
