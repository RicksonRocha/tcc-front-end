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
import { useGetTeamsQuery } from 'src/api/team';
import { useSelector } from 'react-redux';

export default function StudentCard({ student }) {
  const { data: teams, isLoading: isTeamsLoading } = useGetTeamsQuery();

  // Obtém os dados do usuário logado via Redux
  const currentUser = useSelector((state) => state.auth?.auth?.user);
  const isProfessor = currentUser && currentUser.role === 'PROFESSOR';

  if (!student) {
    return (
      <Card sx={{ p: 2 }}>
        <Typography variant="body1" color="error">
          Dados do aluno não disponíveis.
        </Typography>
      </Card>
    );
  }

  const displayedName = student.userName || `Aluno: ${student.user_id}`;

  const isInTeam = student.user_id 
    ? teams?.some(team => team.createdById === student.user_id)
    : false;

  let teamStatus = 'Sem equipe';
  if (isTeamsLoading) {
    teamStatus = 'Carregando...';
  } else if (isInTeam) {
    teamStatus = 'Com equipe';
  }

  const renderStatus = (
    <Label
      variant="filled"
      color={isInTeam ? 'success' : 'error'}
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

  const renderHeader = (
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
  );

  const renderTurnoDisponibilidade = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="body2">
        Turno:{' '}
        <Box component="span" sx={{ color: primary, fontSize: '14px' }}>
          {student.turno || 'Não informado'}
        </Box>
      </Typography>
      {student.disponibilidade && (
        <Typography variant="body2">
          Disponibilidade:{' '}
          <Box component="span" sx={{ color: primary, fontSize: '14px' }}>
            {student.disponibilidade}
          </Box>
        </Typography>
      )}
    </Box>
  );

  const renderLinguagens =
    student.linguagemProgramacao && student.linguagemProgramacao.length > 0 && (
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Linguagens: {student.linguagemProgramacao.join(', ')}
      </Typography>
    );

  const renderHabilidades =
    student.habilidadesPessoais && student.habilidadesPessoais.length > 0 && (
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Habilidades: {student.habilidadesPessoais.join(', ')}
      </Typography>
    );

  const renderTemas =
    student.temasDeInteresse && student.temasDeInteresse.length > 0 && (
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Temas: {student.temasDeInteresse.join(', ')}
      </Typography>
    );

  const renderModalidade =
    student.modalidadeTrabalho && (
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Modalidade: {student.modalidadeTrabalho}
      </Typography>
    );

  return (
    <Card>
      <Box sx={{ pt: '40%', position: 'relative' }}>
        {renderStatus}
        {renderHeader}
      </Box>
      <Stack spacing={1} sx={{ p: 2 }}>
        {renderTurnoDisponibilidade}
        <Divider sx={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', my: 1 }} />
        {renderLinguagens}
        {renderHabilidades}
        <Divider sx={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', my: 1 }} />
        {renderTemas}
        {renderModalidade}
        <Button
          variant="contained"
          disabled={isProfessor}  // Desabilita se o usuário for professor
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
  student: PropTypes.shape({
    userName: PropTypes.string,
    turno: PropTypes.string,
    disponibilidade: PropTypes.string,
    linguagemProgramacao: PropTypes.arrayOf(PropTypes.string),
    habilidadesPessoais: PropTypes.arrayOf(PropTypes.string),
    temasDeInteresse: PropTypes.arrayOf(PropTypes.string),
    modalidadeTrabalho: PropTypes.string,
    user_id: PropTypes.number,
  }),
};










