import { Helmet } from 'react-helmet-async';

import { PreferenciasProfessorView } from 'src/sections/preferencias-professor';

// ----------------------------------------------------------------------

export default function PreferenciasAlunoPage() {
  return (
    <>
      <Helmet>
        <title>Preferências do Professor</title>
      </Helmet>

      <PreferenciasProfessorView />
    </>
  );
}