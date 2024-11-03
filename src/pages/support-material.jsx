import { Helmet } from 'react-helmet-async';

import SupportMaterial from 'src/sections/products/view/support-material';

// ----------------------------------------------------------------------

export default function SupportMaterialPage() {
  return (
    <>
      <Helmet>
        <title> Materiais de Apoio </title>
      </Helmet>

      <SupportMaterial />
    </>
  );
}
