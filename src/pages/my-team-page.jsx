import { Helmet } from 'react-helmet-async';

import { MyTeamPageView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function MyTeamPage() {
  return (
    <>
      <Helmet>
        <title> Minha Equipe </title>
      </Helmet>

      <MyTeamPageView />
    </>
  );
}
