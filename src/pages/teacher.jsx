import { Helmet } from 'react-helmet-async';

import { TeacherView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function TeacherPage() {
  return (
    <>
      <Helmet>
        <title> Orientadores </title>
      </Helmet>

      <TeacherView />
    </>
  );
}
