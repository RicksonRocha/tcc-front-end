import { Link, Card, Stack, Button, Container, Typography, Breadcrumbs } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function MyProfilePage() {
  const [step, setStep] = useState(1);

  const handleClick = () => {
    setStep(2);
  };
  return (
    <>
      <Helmet>
        <title>Meu Perfil</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Stack direction="column">
            <Typography variant="h4" mb={1}>
              Meu perfil
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="text.primary" href="/">
                Início
              </Link>

              <Typography color="inherit">Meu perfil</Typography>
            </Breadcrumbs>
          </Stack>
        </Stack>

        <Card
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack
            sx={{
              height: '50vh',
              width: '45vw',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5">Olá! Precisamos preencher suas informações</Typography>
            <Typography textAlign="center">
              Responda com atenção a todas as perguntas, elas são essenciais para encontrarmos
              membros e equipes para se conectarem com você
            </Typography>
            <Button
              sx={{ alignSelf: 'center', mt: 2 }}
              variant="contained"
              onClick={() => setStep(1)}
            >
              Iniciar questionário
            </Button>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
