import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Dialog, DialogContent } from '@mui/material';
import { useState, useEffect } from 'react';
import MyTeamForm from 'src/sections/products/my-team-form';

export default function NewTeamPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formKey, setFormKey] = useState(Date.now());

  const handleClose = () => {
    navigate(-1);
  };

  // Gere uma nova key sempre que a página de criação for montada
  useEffect(() => {
    setFormKey(Date.now());
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Criar Equipe</title>
      </Helmet>
      <Dialog
        open
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
          },
        }}
      >
        <DialogContent sx={{ p: 0, overflow: 'visible' }}>
          <MyTeamForm key={formKey} />
        </DialogContent>
      </Dialog>
    </>
  );
}






