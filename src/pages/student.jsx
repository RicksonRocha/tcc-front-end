import { Helmet } from 'react-helmet-async';

import { StudentView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function StudentPage() {
  return (
    <>
      <Helmet>
        <title> Alunos </title>
      </Helmet>

      <StudentView />
    </>
  );
}
