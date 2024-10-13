import { Helmet } from 'react-helmet-async';

import { TeamsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function TeamsPage() {
  return (
    <>
      <Helmet>
        <title> Equipes </title>
      </Helmet>

      <TeamsView />
    </>
  );
}
