import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import Button from '@mui/material/Button'; 
import { primary } from 'src/theme/palette';

// ----------------------------------------------------------------------

export default function StudentCard({ student }) {
  
  // Cor do status com base no valor de student.status
  const statusColor = student.status === 'Com equipe' ? 'error' : 'success';

  const renderStatus = (
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
      {student.status}
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
      <Typography variant="h7" sx={{ textAlign: 'center', px: 2, mt: 2.5 }}>
        {student.name}
      </Typography>
    </Box>
  );

  // Exibe o turno do aluno
  const renderTurno = (
    <Typography
      variant="subtitle2"
      sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold' }}
    >
      {`Turno: `}
      <Box component="span" sx={{ color: primary, fontSize: '14px' }}>
        {student.turno}
      </Box>
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '40%', position: 'relative' }}>
        {student.status && renderStatus}
        {renderName}
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>

        {renderTurno}
  
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#EDEFF1', 
            color: '#212B36', 
            '&:hover': {
              backgroundColor: '#DDE0E2', 
            },
          }}
        >
          Conectar
        </Button>
      </Stack>
    </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.object,
};
