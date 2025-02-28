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

export default function TeamCard({ team }) {
  const [successMessage, setSuccessMessage] = useState('');

  // Obter o usuário logado via Redux 
  const currentUser = useSelector((state) => state.auth?.auth?.user);
  const isProfessor = currentUser && currentUser.role === 'PROFESSOR';

  // Define o status como "Completa" se isActive for true
  const teamStatus = team.isActive ? 'Completa' : 'Aberta';
  const statusColor = teamStatus === 'Completa' ? 'error' : 'success';
  const statusColorCode = teamStatus === 'Completa' ? '#FF4842' : '#00AB55';

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
      {teamStatus}
    </Label>
  );

  const renderName = (
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
      {team.themes && team.themes.length > 0 && (
        <>
          <Divider sx={{ width: '80%', backgroundColor: 'rgba(255,255,255,0.7)' }} />
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Temas: {team.themes.join(', ')}
          </Typography>
        </>
      )}
    </Box>
  );

  const renderQtdeIntegrantes = (
    <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
      {`Qtde Integrantes: `}
      <Box component="span" sx={{ color: statusColorCode, fontSize: '14px' }}>
        {team.members?.length || 0}
      </Box>
    </Typography>
  );

  const handleClick = () => {
    setSuccessMessage('Solicitação de entrada enviada!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 1000);
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderStatus}
        {renderName}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        {renderQtdeIntegrantes}
        <Button
          variant="contained"
          disabled={teamStatus === 'Completa' || isProfessor} 
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

        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
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
    members: PropTypes.arrayOf(PropTypes.string),
    themes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};



