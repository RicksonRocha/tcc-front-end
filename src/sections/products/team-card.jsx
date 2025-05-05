import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';

import { useCreateNotificationMutation } from 'src/api/notifications';
import { useCreateRequestEntryMutation } from 'src/api/requestEntryTcc';

export default function TeamCard({ team, userStatus, loadingStatus }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const currentUser = useSelector((state) => state.auth?.auth?.user);
  const isProfessor = currentUser?.role === 'PROFESSOR';

  const [createNotification] = useCreateNotificationMutation();
  const [createRequestEntry] = useCreateRequestEntryMutation();

  const teamStatus = team.isActive ? 'Completa' : 'Aberta';
  const statusColor = teamStatus === 'Completa' ? 'error' : 'success';
  const statusColorCode = teamStatus === 'Completa' ? '#FF4842' : '#00AB55';

  const handleClick = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    // Validações de status
    if (userStatus === 'owner') {
      setErrorMessage('Você já é dono de uma equipe.');
      return;
    }

    if (userStatus === 'member') {
      setErrorMessage('Você já está em uma equipe.');
      return;
    }

    if (!userStatus) {
      setErrorMessage('Status do usuário não carregado.');
      return;
    }

    // Dados da notificação e da solicitação
    const notificationData = {
      senderId: currentUser.id,
      nomeRemetente: currentUser.name,
      receiverId: team.createdById,
      nomeDestinatario: team.createdByEmail || 'Responsável pela equipe',
      message: `${currentUser.name} gostaria de fazer parte da sua equipe! Confira na página de Visão Geral.`,
    };

    const requestEntryData = {
      tccid: team.id,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      ownerId: team.createdById,
      ownerEmail: team.createdByEmail || '',
    };

    try {
      await createNotification(notificationData).unwrap();
      await createRequestEntry(requestEntryData).unwrap();
      setSuccessMessage('Solicitação de entrada enviada!');
    } catch (error) {
      setErrorMessage('Erro ao enviar solicitação.');
      console.error(error);
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color={statusColor}
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          {teamStatus}
        </Label>

        <Box
          sx={{
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#EDEFF1',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            px: 2,
          }}
        >
          <Typography variant="h7" sx={{ textAlign: 'center', mt: 2 }}>
            Nome: {team.name || 'Nome não disponível'}
          </Typography>

          {team.themes?.length > 0 && (
            <>
              <Divider sx={{ width: '80%', backgroundColor: 'rgba(255,255,255,0.7)' }} />
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Temas: {team.themes.join(', ')}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          {`Qtde Integrantes: `}
          <Box component="span" sx={{ color: statusColorCode, fontSize: '14px' }}>
            {team.members?.length || 0}
          </Box>
        </Typography>

        {/* Render condicional com base no status */}
        {userStatus === 'owner' ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            Você já faz parte de uma equipe.
          </Alert>
        ) : userStatus === 'member' ? (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Você já está em uma equipe.
          </Alert>
        ) : (
          <Button
            variant="contained"
            disabled={teamStatus === 'Completa' || isProfessor || loadingStatus}
            onClick={handleClick}
            sx={{
              backgroundColor: '#EDEFF1',
              color: '#212B36',
              '&:hover': {
                backgroundColor: '#DDE0E2',
              },
            }}
          >
            Solicitar entrada
          </Button>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Stack>
    </Card>
  );
}

TeamCard.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    isActive: PropTypes.bool,
    members: PropTypes.arrayOf(PropTypes.object),
    themes: PropTypes.arrayOf(PropTypes.string),
    createdById: PropTypes.number,
    createdByEmail: PropTypes.string,
  }).isRequired,
  userStatus: PropTypes.string,
  loadingStatus: PropTypes.bool,
};
