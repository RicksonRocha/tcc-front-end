import { Helmet } from 'react-helmet-async';

import CrudUsersAdmView  from 'src/sections/products/view/crud-users-adm';

// ----------------------------------------------------------------------

export default function CrudUsersAdmPage() {
  return (
    <>
      <Helmet>
        <title> Materiais de Apoio </title>
      </Helmet>

      <CrudUsersAdmView  />
    </>
  );
}