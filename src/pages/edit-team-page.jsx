import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Dialog, DialogContent } from '@mui/material';
import MyTeamForm from 'src/sections/products/my-team-form';
import { useState, useEffect } from 'react';

export default function EditTeamPage() {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const location = useLocation();
  const [formKey, setFormKey] = useState(Date.now());

  const handleClose = () => {
    navigate('/');
  };

  useEffect(() => {
    setFormKey(Date.now());
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Editar Equipe</title>
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
          <MyTeamForm key={formKey} teamId={Number(teamId)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
