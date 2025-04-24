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

export default function TeacherCard({ teacher }) {
  const [successMessage, setSuccessMessage] = useState('');
  const currentUser = useSelector((state) => state.auth?.auth?.user);
  const isProfessor = currentUser && currentUser.role === 'PROFESSOR';

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

  const temas =
    Array.isArray(teacher.interestTopics || teacher.temasInteresse)
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
          Turno: <Box component="span" sx={{ color: primary, fontSize: '14px' }}>{turno}</Box>
        </Typography>
        <Typography variant="body2">
          Disponibilidade: <Box component="span" sx={{ color: primary, fontSize: '14px' }}>{disponibilidade}</Box>
        </Typography>
        <Typography variant="body2">
          Temas: <Box component="span" sx={{ color: primary, fontSize: '14px' }}>{temas}</Box>
        </Typography>
        <Typography variant="body2">
          Modalidade: <Box component="span" sx={{ color: primary, fontSize: '14px' }}>{modalidade}</Box>
        </Typography>
      </Stack>

      <Divider sx={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', my: 1 }} />
      <Stack spacing={1} sx={{ p: 2, textAlign: 'center' }}>
        <Button
          variant="contained"
          disabled={!isAvailable}
          onClick={() => {
            setSuccessMessage('Solicitação de orientação enviada!');
            setTimeout(() => setSuccessMessage(''), 1000);
          }}
          sx={{
            backgroundColor: '#EDEFF1',
            color: '#212B36',
            '&:hover': {
              backgroundColor: '#DDE0E2',
            },
          }}
        >
          Solicitar Orientação
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