import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { useGetTeachersQuery } from 'src/api/user';

export default function AppTeam({ team, message, buttonText, onButtonClick, ...other }) {
  const { push } = useRouter();

  // Busca todos os professores
  const { data: teachers = [] } = useGetTeachersQuery();

  // Procura o professor cujo id bate com team.teacherTcc
  const teacher = teachers.find((t) => Number(t.id) === Number(team?.teacherTcc));

  let displayedTeacherName = '';

  if (teacher) {
    displayedTeacherName = teacher.userName || teacher.name || `Professor: ${teacher.id}`;
  } else if (team && team.teacherTcc) {
    displayedTeacherName = `Professor: ${team.teacherTcc}`;
  } else {
    displayedTeacherName = 'Professor não definido';
  }

  // Função para redirecionar para o formulário de edição, passando o ID da equipe
  const handleEditTeam = () => {
    // Supondo que a rota para edição seja '/equipes/editar/{id}'
    push(`/equipes/editar/${team.id}`);
  };

  return (
    <Card {...other}>
      <CardContent>
        <Box sx={{ position: 'relative' }}>
          <Typography variant="h6" gutterBottom>
            Sobre sua Equipe
          </Typography>

          {/* Exibe o botão "Editar equipe" se existir uma equipe cadastrada */}
          {team?.id && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditTeam}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              Editar equipe
            </Button>
          )}

          {team?.id ? (
            <Box textAlign="left" sx={{ mt: 3 }}>
              {/* Título da Equipe */}
              <Typography variant="subtitle1" gutterBottom color="primary">
                Título:
              </Typography>
              <Typography variant="body1" paragraph>
                {team.name}
              </Typography>
              <Divider sx={{ borderColor: 'grey.300', my: 1 }} />

              {/* Descrição */}
              <Typography variant="subtitle1" gutterBottom color="primary">
                Descrição:
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
              >
                {team.description}
              </Typography>
              <Divider sx={{ borderColor: 'grey.300', my: 1 }} />

              {/* Membros */}
              <Typography variant="subtitle1" gutterBottom sx={{ mb: 0.5 }} color="primary">
                Membros:
              </Typography>
              <Typography variant="body1" paragraph>
                {team.members?.map((member) => member.userName).join(', ')}
              </Typography>
              <Divider sx={{ borderColor: 'grey.300', my: 1 }} />

              {/* Orientador */}
              <Typography variant="subtitle1" gutterBottom color="primary">
                Orientador(a):
              </Typography>
              <Typography variant="body1">{displayedTeacherName}</Typography>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              textAlign="left"
              sx={{ mt: 2 }}
            >
              <Typography variant="body1" gutterBottom>
                {message}
              </Typography>
              <Box mt={2} width="fit-content">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => push('/equipes')}
                  fullWidth
                >
                  {buttonText}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

AppTeam.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.string),
    teacherTcc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  teacher: PropTypes.shape({
    user_id: PropTypes.number,
    userName: PropTypes.string,
  }),
  message: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

AppTeam.defaultProps = {
  message:
    'Por enquanto você não está cadastrado(a) em nenhuma equipe, acesse a página abaixo para conhecer os grupos existentes!',
  buttonText: 'Equipes',
  team: null,
};
