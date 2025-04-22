import { Helmet } from 'react-helmet-async';
import TccDetailView from 'src/sections/teacher-area/tcc-detail-view';

export default function TccDetailPage() {
  return (
    <>
      <Helmet>
        <title> Detalhes do TCC </title>
      </Helmet>

      <TccDetailView />
    </>
  );
}
