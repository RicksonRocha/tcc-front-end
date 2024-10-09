import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppTeam({
  message,
  buttonText,
  onButtonClick,
  teamName,
  description,
  members,
  orientador,
  ...other
}) {
  return (
    <Card {...other}>
      <CardContent>
    
        <Typography variant="h6" gutterBottom>
          Sobre sua Equipe
        </Typography>

        {/* Verifica se existe um nome de equipe para definir se exibe os detalhes */}
        {teamName ? (
          <Box textAlign="left">
            {/* Tema da Equipe */}
            <Typography variant="subtitle1" gutterBottom color="primary"> 
              Tema:
            </Typography>
            <Typography variant="body1" paragraph>
              {teamName}
            </Typography>

            {/* Linha separadora */}
            <Divider sx={{ borderColor: 'grey.300', my: 1 }} />

            {/* Descrição */}
            <Typography variant="subtitle1" gutterBottom color="primary">
              Descrição:
            </Typography>
            <Typography variant="body1" paragraph>
              {description}
            </Typography>

            <Divider sx={{ borderColor: 'grey.300', my: 1 }} />

            {/* Membros */}
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 0.5 }} color="primary">
              Membros:
            </Typography>
            <Typography variant="body1" paragraph>
              {members.join(', ')}
            </Typography>

            <Divider sx={{ borderColor: 'grey.300', my: 1 }} />

            {/* Orientador */}
            <Typography variant="subtitle1" gutterBottom color="primary">
              Orientador(a):
            </Typography>
            <Typography variant="body1">
              {orientador}
            </Typography>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="flex-start" textAlign="left">
            <Typography variant="body1" gutterBottom>
              {message}
            </Typography>

            <Box mt={2} width="fit-content">
              <Button variant="contained" color="primary" onClick={onButtonClick} fullWidth>
                {buttonText}
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

AppTeam.propTypes = {
  message: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  teamName: PropTypes.string,
  description: PropTypes.string,
  members: PropTypes.arrayOf(PropTypes.string),
  orientador: PropTypes.string,
};

// Definindo valores padrão para as props
AppTeam.defaultProps = {
  message: 'Por enquanto você não está cadastrado(a) em nenhuma equipe, acesse a página abaixo para conhecer os grupos existentes!',
  buttonText: 'Equipes',
  onButtonClick: () => alert('Redirecionando para a página de Equipes...'),
  teamName: null,
  description: '',
  members: [],
  orientador: '',
};
