import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  notificationApi,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
  useGetUnreadNotificationCountQuery,
  useGetUserNotificationsQuery,
  useLazyGetUserNotificationsQuery,
} from 'src/api/notifications';
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
  useLazyGetRequestsByOwnerQuery,
} from 'src/api/requestEntryTcc';

import { useGetTeamsQuery } from 'src/api/team';

export default function NotificationRequestsCard() {
  const currentUser = useSelector((state) => state.auth?.auth?.user);
  const { enqueueSnackbar } = useSnackbar();

  const [useLazy, { data: fetchedNotifications = [], isLoading, isError, refetch }] =
    useLazyGetUserNotificationsQuery();

  const [deleteNotification] = useDeleteNotificationMutation();

  const handleVisualize = async (requestId) => {
    try {
      await deleteNotification(requestId).unwrap();
      enqueueSnackbar('Visualização confirmada', { variant: 'success' });
      refetch();
    } catch (error) {
      enqueueSnackbar('Erro ao confirmar visualização', { variant: 'error' });
    }
  };

  const getLazy = useLazy;

  useEffect(() => {
    if (currentUser) {
      getLazy(currentUser.id);
    }
  }, [currentUser, getLazy]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography variant="body1" color="error">
        Erro ao carregar notificações.
      </Typography>
    );
  }

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Notificações
        </Typography>

        {fetchedNotifications.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Não há notificações.
          </Typography>
        ) : (
          <Stack spacing={2} mt={2} divider={<Divider />}>
            {fetchedNotifications.map((req) => (
              <Box key={req.id} sx={{ p: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontSize: 16 }}>
                    {req.message}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleVisualize(req.id)}
                    >
                      Confirmar visualização
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
