import { Breadcrumbs, Button, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Iconify from 'src/components/iconify';
import AppConversionRates from 'src/sections/overview/app-conversion-rates';
import AppCurrentVisits from 'src/sections/overview/app-current-visits';
import AnalyticsTasks from 'src/sections/overview/app-tasks';
import AppWebsiteVisits from 'src/sections/overview/app-website-visits';
import AppWidgetSummary from 'src/sections/overview/app-widget-summary';
import { AppView } from 'src/sections/overview/view';

export const DashboardView = () => (
  <Container>
    <Helmet>
      <title> Dashboard </title>
    </Helmet>

    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Stack direction="column">
        <Typography variant="h4" mb={1}>
          Dashboard
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="text.primary" href="/">
            Dashboard
          </Link>

          <Typography color="inherit">Visão geral</Typography>
        </Breadcrumbs>
      </Stack>
    </Stack>

    <Grid container spacing={2}>
      <Grid item md={12} container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="EQUIPES"
            color="success"
            icon={<Iconify icon="hugeicons:student" width="75%" color="red" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="TCCs FINALIZADOS"
            color="success"
            icon={<Iconify icon="hugeicons:student" width="75%" color="red" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="APROVADOS"
            color="success"
            icon={<Iconify icon="hugeicons:student" width="75%" color="red" />}
          />
        </Grid>
      </Grid>

      <Grid item md={12}>
        <AppConversionRates
          title="Temas mais recorrentes"
          chart={{
            series: [
              { label: 'Tecnologia da informação', value: 400 },
              { label: 'Administração', value: 430 },
              { label: 'Direito', value: 448 },
              { label: 'Educação', value: 470 },
              { label: 'Psicologia', value: 540 },
              { label: 'Medicina', value: 580 },
              { label: 'Engenaria', value: 690 },
              { label: 'Línguas', value: 1100 },
              { label: 'Ciências Sociais', value: 1200 },
              { label: 'Ciências Exatas', value: 1380 },
            ],
          }}
        />
      </Grid>

      <Grid item md={4}>
        <AppCurrentVisits
          title="Andamento dos TCCs"
          chart={{
            series: [
              { label: 'Finalizado', value: 4344 },
              { label: 'Em avaliação de banca', value: 5435 },
              { label: 'Em execução', value: 1443 },
              { label: 'Análise pré banca', value: 4443 },
            ],
          }}
        />
      </Grid>

      <Grid item md={8}>
        <AppWebsiteVisits
          title="Taxa de aprovação dos TCCs com e sem equipe gerada pela plataforma"
          chart={{
            labels: [
              '01/01/2003',
              '02/01/2003',
              '03/01/2003',
              '04/01/2003',
              '05/01/2003',
              '06/01/2003',
              '07/01/2003',
              '08/01/2003',
              '09/01/2003',
              '10/01/2003',
              '11/01/2003',
            ],
            series: [
              {
                name: 'Sem equipe',
                type: 'column',
                fill: 'solid',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
              {
                name: 'Com equipe gerada',
                type: 'area',
                fill: 'gradient',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              },
            ],
          }}
        />
      </Grid>
    </Grid>
  </Container>
);
