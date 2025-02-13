import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { primary } from 'src/theme/palette';
import { useGetUserQuery } from 'src/api/user';

export default function StudentCard({ student }) {
  // Se o objeto student não estiver disponível, exibe mensagem de erro
  if (!student) {
    return (
      <Card sx={{ p: 2 }}>
        <Typography variant="body1" color="error">
          Dados do aluno não disponíveis.
        </Typography>
      </Card>
    );
  }
  
  // Executa a query para buscar o usuário pelo id, se student.name não estiver definido.
  const { data: userDetails, isLoading: isUserLoading } = useGetUserQuery(student.user_id, {
    skip: !!student.name,
  });

  // Define o nome a ser exibido: se não houver student.name, usa o nome retornado ou fallback
  const displayedName =
    student.name || (isUserLoading ? 'Carregando...' : userDetails?.name || `Aluno: ${student.user_id}`);

  // Define o status com base no nível de experiência (exemplo)
  const status = student.nivelDeExperiencia 
    ? `Nível: ${student.nivelDeExperiencia}` 
    : 'Sem nível definido';
  const statusColor = 'info';

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
      {status}
    </Label>
  );

  // Cabeçalho: exibe o nome do aluno.
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
      <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', mt:3 }}>
        {displayedName}
      </Typography>
    </Box>
  );

  // Exibe o turno e a disponibilidade do aluno
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

  // Exibe as linguagens de programação, se houver
  const renderLinguagens =
    student.linguagemProgramacao && student.linguagemProgramacao.length > 0 && (
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Linguagens: {student.linguagemProgramacao.join(', ')}
      </Typography>
    );

  // Exibe as habilidades pessoais, se houver
  const renderHabilidades =
    student.habilidadesPessoais && student.habilidadesPessoais.length > 0 && (
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Habilidades: {student.habilidadesPessoais.join(', ')}
      </Typography>
    );

  // Exibe os temas de interesse, se houver
  const renderTemas =
    student.temasDeInteresse && student.temasDeInteresse.length > 0 && (
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Temas: {student.temasDeInteresse.join(', ')}
      </Typography>
    );

  // Exibe a modalidade de trabalho, se houver
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
      <Stack spacing={2} sx={{ p: 2 }}>
        {renderTurnoDisponibilidade}
        <Divider sx={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', my: 1 }} />
        {renderLinguagens}
        {renderHabilidades}
        <Divider sx={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', my: 1 }} />
        {renderTemas}
        {renderModalidade}
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
  student: PropTypes.shape({
    name: PropTypes.string,
    turno: PropTypes.string,
    disponibilidade: PropTypes.string,
    linguagemProgramacao: PropTypes.arrayOf(PropTypes.string),
    habilidadesPessoais: PropTypes.arrayOf(PropTypes.string),
    temasDeInteresse: PropTypes.arrayOf(PropTypes.string),
    modalidadeTrabalho: PropTypes.string,
    nivelDeExperiencia: PropTypes.string,
    user_id: PropTypes.number,
  }),
};






