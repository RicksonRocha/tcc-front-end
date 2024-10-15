import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MyTeamForm from '../my-team-form';

// ----------------------------------------------------------------------

export default function MyTeamPageView() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Minha Equipe
      </Typography>

      <MyTeamForm />
    </Container>
  );
}



