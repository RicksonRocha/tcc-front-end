import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Iconify from 'src/components/iconify';
import AppConversionRates from 'src/sections/overview/app-conversion-rates';
import AppCurrentVisits from 'src/sections/overview/app-current-visits';
import AnalyticsTasks from 'src/sections/overview/app-tasks';
import AppWebsiteVisits from 'src/sections/overview/app-website-visits';
import AppWidgetSummary from 'src/sections/overview/app-widget-summary';
import { AppView } from 'src/sections/overview/view';
import { useDashboardModel } from './dashboard.model';
import UserTable from './userTable';

export const DashboardView = (props) => {
  const { teamsCount, usersCount, dataUsers, handleEdit, handleDelete, isLoading } = props;

  return (
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
              total={teamsCount?.count}
              color="success"
              icon={<Iconify icon="hugeicons:student" width="75%" color="red" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="ALUNOS"
              total={usersCount?.student}
              color="success"
              icon={<Iconify icon="hugeicons:student" width="75%" color="red" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="PROFESSORES"
              total={usersCount?.teacher}
              color="success"
              icon={<Iconify icon="hugeicons:student" width="75%" color="red" />}
            />
          </Grid>

          <Grid item md={12}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <UserTable users={dataUsers ?? []} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
