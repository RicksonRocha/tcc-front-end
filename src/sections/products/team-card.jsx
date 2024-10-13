import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import Button from '@mui/material/Button'; 

// ----------------------------------------------------------------------

export default function ShopTeamCard({ team }) {
  // Cor do status com base no valor de team.status
  const statusColor = team.status === 'Equipe Completa' ? 'error' : 'success';
  const statusColorCode = team.status === 'Equipe Completa' ? '#FF4842' : '#00AB55';

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
      {team.status}
    </Label>
  );

  // Área de fundo com centralização do nome
  const renderName = (
    <Box
      sx={{
        top: 0,
        width: 1,
        height: 1,
        backgroundColor: '#EDEFF1',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h7" sx={{ textAlign: 'center', px: 2 }}>
        {team.name}
      </Typography>
    </Box>
  );

  // Quantidade de integrantes com cor baseada no status
  const renderQtdeIntegrantes = (
    <Typography
      variant="subtitle2"
      sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold' }}
    >
      {`Qtde Integrantes: `}
      <Box component="span" sx={{ color: statusColorCode }}>
        {team.members}
      </Box>
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {team.status && renderStatus}
        {renderName}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>

        {renderQtdeIntegrantes}
  
        <Button
          variant="contained"
          disabled={team.status === 'Equipe Completa'} // Desabilitado para equipes completas
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
      </Stack>
    </Card>
  );
}

ShopTeamCard.propTypes = {
  team: PropTypes.object,
};
