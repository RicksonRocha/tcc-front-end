import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'; // Para exibir mensagem estilizada
import { primary } from 'src/theme/palette';

// ----------------------------------------------------------------------

export default function TeacherCard({ teacher }) {
  const [successMessage, setSuccessMessage] = useState('');

  // Cor do status com base no valor de teacher.status
  const statusColor = teacher.status === 'Indisponível para Orientação' ? 'error' : 'success';

  const renderStatus = (
    <Label
      variant="filled"
      color={statusColor}
      sx={{
        zIndex: 9,
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Centraliza horizontal e verticalmente
        textTransform: 'uppercase',
      }}
    >
      {teacher.status}
    </Label>
  );

  // Área de fundo com centralização do nome
  const renderName = (
    <Box
      sx={{
        top: 0,
        width: 1,
        height: '100%',
        backgroundColor: '#EDEFF1',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h7" sx={{ textAlign: 'center', px: 2, mt: 4 }}>
        {teacher.name}
      </Typography>
    </Box>
  );

  // Exibe o turno do(a) prof
  const renderTurno = (
    <Typography
      variant="body2"
      sx={{ textAlign: 'center', mt: 2 }}
    >
      {`Turno: `}
      <Box component="span" sx={{ color: primary, fontSize: '14px' }}>
        {teacher.turno}
      </Box>
    </Typography>
  );

  const handleClick = () => {
    // Exibir a mensagem de sucesso ao solicitar orientação
    setSuccessMessage('Solicitação de orientação enviada!');

    // Oculta a mensagem após alguns segundos
    setTimeout(() => {
      setSuccessMessage('');
    }, 1000);
  };

  return (
    <Card>
      <Box sx={{ pt: '40%', position: 'relative' }}>
        {teacher.status && renderStatus}
        {renderName}
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        {renderTurno}

        <Button
          variant="contained"
          disabled={teacher.status === 'Indisponível para Orientação'}
          onClick={handleClick}
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

        {/* Mensagem de sucesso */}
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
  teacher: PropTypes.object,
};
