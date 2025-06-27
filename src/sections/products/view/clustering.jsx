import React, { useState } from 'react';
import api from 'src/api/api';
import { useSelector } from 'react-redux';
import {
  Button,
  Modal,
  Box,
  Typography,
  Card,
  Stack,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCreateNotificationMutation } from 'src/api/notifications';
import { useCreateRequestEntryMutation } from 'src/api/requestEntryTcc';

// Card de exibição do perfil compatível
const CompatibleCard = ({ profile, handleConect }) => (
  <Card sx={{ width: 280, m: 1, boxShadow: 6, position: 'relative' }}>
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle2" sx={{ fontSize: '1.1rem' }}>
        {profile.userName || `Perfil: ${profile.id}`}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
        <strong>Turno:</strong> {profile.turno || 'N/D'}
      </Typography>
      <br />
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
        <strong>Disponibilidade:</strong> {profile.disponibilidade || 'N/D'}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="caption" display="block" sx={{ fontSize: '0.9rem' }}>
        <strong>Temas:</strong>{' '}
        {Array.isArray(profile.temasDeInteresse) && profile.temasDeInteresse.length > 0
          ? profile.temasDeInteresse.join(', ')
          : 'N/D'}
      </Typography>
    </Box>
    <Stack direction="row" justifyContent="center" sx={{ p: 1 }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => handleConect(profile)}
      >
        Conectar
      </Button>
    </Stack>
  </Card>
);

const Clustering = ({ targetRole = 'aluno', teamMember }) => {
  const currentUser = useSelector((state) => state.auth?.auth?.user);
  const token = useSelector((state) => state.auth?.auth?.token);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [createNotification] = useCreateNotificationMutation();
  const [createRequestEntry] = useCreateRequestEntryMutation();

  const handleConect = async (profile) => {
    const notificationData = {
      senderId: currentUser.id,
      nomeRemetente: currentUser.name,
      receiverId: profile.id,
      nomeDestinatario: profile.userName || 'Responsável pela equipe',
      message: teamMember
        ? `${currentUser.name} gostaria da sua orientação na equipe! Contate-o(a) via email: ${currentUser?.email}`
        : `${currentUser?.name} gostaria de se conectar a você! Contate-o(a) via email: ${currentUser?.email}`,
    };

    const requestEntryData = {
      tccid: teamMember?.id,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      ownerId: profile.id,
      ownerEmail: profile.userEmail || '',
    };

    try {
      await createNotification(notificationData).unwrap();
      if (teamMember) await createRequestEntry(requestEntryData).unwrap();
      enqueueSnackbar('Mensagem de conexão foi enviada!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao enviar mensagem de conexão.', { variant: 'error' });
      console.error(error);
    }
  };

  const fetchSuggestions = async () => {
    setOpen(true);
    setLoading(true);
    const startTime = Date.now();

    try {
      await api.get(`/cluster/clustering/update?targetRole=${targetRole}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await api.get(
        `/cluster/clustering/suggestions/${currentUser.id}?targetRole=${targetRole}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuggestions(response.data.sugestoes);
    } catch (error) {
      console.error('Erro ao buscar perfis compatíveis:', error);
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(3000 - elapsed, 0);
      setTimeout(() => {
        setLoading(false);
      }, delay);
    }
  };

  let modalContent;
  if (loading) {
    modalContent = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem' }}>
          Buscando perfis compatíveis...
        </Typography>
      </Box>
    );
  } else if (suggestions.length > 0) {
    modalContent = (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {suggestions.map((profile) => (
          <CompatibleCard key={profile.id} profile={profile} handleConect={handleConect} />
        ))}
      </Box>
    );
  } else {
    modalContent = (
      <Typography variant="body1" sx={{ fontSize: '1.1rem', textAlign: 'center' }}>
        No momento não encontramos perfis compatíveis com o seu 😓
        <br />
        Você ainda pode conferir/filtrar os perfis cadastrados!
      </Typography>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={fetchSuggestions}
        disabled={currentUser && currentUser.role === 'PROFESSOR'}
        sx={{
          backgroundColor: '#EDEFF1',
          color: '#212B36',
          '&:hover': {
            backgroundColor: '#DDE0E2',
          },
        }}
      >
        Buscar perfis compatíveis
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            p: 4,
            maxWidth: 800,
            margin: 'auto',
            mt: 10,
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
            Perfis Compatíveis
          </Typography>
          {modalContent}
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Clustering;
