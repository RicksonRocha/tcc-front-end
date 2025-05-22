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
import { primary } from 'src/theme/palette';
import { useSelector } from 'react-redux';
import { useCreateRequestEntryMutation } from 'src/api/requestEntryTcc';
import { useGetTeamByMemberQuery } from 'src/api/team';
import { useCreateNotificationMutation } from 'src/api/notifications';

export default function TeacherCard({ teacher, teamMember }) {
  const [successMessage, setSuccessMessage] = useState('');
  const currentUser = useSelector((state) => state.auth?.auth?.user);
  const isProfessor = currentUser && currentUser.role === 'PROFESSOR';

  const [createRequestEntry] = useCreateRequestEntryMutation();
  const [createNotification] = useCreateNotificationMutation();

  const handleClick = async () => {
    const notificationData = {
      senderId: currentUser.id,
      nomeRemetente: currentUser.name,
      receiverId: teacher.user_id,
      nomeDestinatario: teacher.userName || 'Responsável pela equipe',
      message: `${currentUser.name} gostaria que sua equipe fosse orientada por você! Confira página de Visão Geral.`,
    };

    const requestEntryData = {
      tccid: teamMember.id,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      ownerId: teacher.user_id,
      ownerEmail: teacher.userEmail || '',
    };

    try {
      await createNotification(notificationData).unwrap();
      await createRequestEntry(requestEntryData).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  if (!teacher) {
    return (
      <Card sx={{ p: 2 }}>
        <Typography variant="body1" color="error">
          Dados do professor não disponíveis.
        </Typography>
      </Card>
    );
  }

  const displayedName = teacher.userName || `Professor: ${teacher.user_id || teacher.id}`;
  const orientationRaw = teacher.availableForAdvising ?? teacher.disponivelOrientacao ?? '';
  const isAvailable =
    (typeof orientationRaw === 'string' && orientationRaw.trim().toLowerCase() === 'sim') ||
    orientationRaw === true;
  const statusText = isAvailable ? 'Disponível para Orientação' : 'Indisponível para Orientação';
  const statusColor = isAvailable ? 'success' : 'error';

  const turno = teacher.shift || teacher.turno || 'Não informado';
  const disponibilidade = teacher.availability || teacher.disponibilidade || 'Não informado';
  const modalidade = teacher.workModality || teacher.modalidadeTrabalho || 'Não informado';

  const temas = Array.isArray(teacher.interestTopics || teacher.temasInteresse)
    ? (teacher.interestTopics || teacher.temasInteresse).join(', ')
    : 'Não informado';

  return (
    <Card>
      <Box sx={{ pt: '40%', position: 'relative' }}>
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
          {statusText}
        </Label>
        <Box
          sx={{
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#EDEFF1',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', mt: 3 }}>
            {displayedName}
          </Typography>
        </Box>
      </Box>

      <Stack spacing={1} sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Turno:{' '}
          <Box component="span" sx={{ color: primary, fontSize: '14px' }}>
            {turno}
          </Box>
        </Typography>
        <Typography variant="body2">
          Disponibilidade:{' '}
          <Box component="span" sx={{ color: primary, fontSize: '14px' }}>
            {disponibilidade}
          </Box>
        </Typography>
        <Typography variant="body2">
          Temas:{' '}
          <Box component="span" sx={{ color: primary, fontSize: '14px' }}>
            {temas}
          </Box>
        </Typography>
        <Typography variant="body2">
          Modalidade:{' '}
          <Box component="span" sx={{ color: primary, fontSize: '14px' }}>
            {modalidade}
          </Box>
        </Typography>
      </Stack>

      <Divider sx={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', my: 1 }} />
      <Stack spacing={1} sx={{ p: 2, textAlign: 'center' }}>
        <Button
          variant="contained"
          disabled={!isAvailable || !teamMember}
          onClick={handleClick}
          sx={{
            backgroundColor: '#EDEFF1',
            color: '#212B36',
            '&:hover': {
              backgroundColor: '#DDE0E2',
            },
          }}
        >
          Solicitar orientação
        </Button>
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}
      </Stack>
    </Card>
  );
}

TeacherCard.propTypes = {
  teacher: PropTypes.object.isRequired,
};
