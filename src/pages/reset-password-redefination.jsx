import { Helmet } from 'react-helmet-async';

import { ResetPasswordRedevinationView } from 'src/sections/reset-password-redefination';

// ----------------------------------------------------------------------

export default function ResetPasswordRedefinationPage() {
  return (
    <>
      <Helmet>
        <title>Redefinição de Senha</title>
      </Helmet>

      <ResetPasswordRedevinationView />
    </>
  );
}
