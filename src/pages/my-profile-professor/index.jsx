import { useSelector } from 'react-redux';
import useMyProfileProfessorModel from 'src/pages/my-profile-professor/my-profile-professor.model';
import MyProfileProfessorView from 'src/pages/my-profile-professor/my-profile-professor.view';
import { Typography, Container } from '@mui/material';

export default function MyProfileProfessorPage() {
  const user = useSelector((state) => state.auth?.auth?.user);
  const methods = useMyProfileProfessorModel();

  // Verifica se o usuário logado é um professor
  const isProfessor = user?.role === 'PROFESSOR';

  if (!isProfessor) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Acesso restrito: esta seção é destinada para professores.
        </Typography>
      </Container>
    );
  }

  return <MyProfileProfessorView {...methods} />;
}
