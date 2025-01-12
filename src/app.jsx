import 'src/global.css';
import { SnackbarProvider } from 'notistack'; // Importando SnackbarProvider
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={1} // Limite de notificações simultâneas
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
