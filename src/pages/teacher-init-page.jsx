import { Helmet } from 'react-helmet-async';

import TeacherInitView from 'src/sections/teacher-area/teacher-init-view';

// ----------------------------------------------------------------------

export default function TeacherInitPage() {
  return (
    <>
      <Helmet>
        <title> Tela Inicial Professor </title>
      </Helmet>

      <TeacherInitView />
    </>
  );
}
