import { Helmet } from 'react-helmet-async';

import { PreferenciasAlunoView } from 'src/sections/preferencias-aluno';

// ----------------------------------------------------------------------

export default function PreferenciasAlunoPage() {
  return (
    <>
      <Helmet>
        <title>Preferências do Aluno</title>
      </Helmet>

      <PreferenciasAlunoView />
    </>
  );
}