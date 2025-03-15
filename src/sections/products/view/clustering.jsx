import React, { useState } from 'react';
import api from "src/api/api";
import { useSelector } from 'react-redux';
import { 
  Button, 
  Modal, 
  Box, 
  Typography, 
  Card, 
  Stack, 
  Divider, 
  CircularProgress 
} from '@mui/material';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

// Componente separado, fora do Clustering
const CompatibleCard = ({ student }) => (
  <Card sx={{ width: 280, m: 1, boxShadow: 6, position: 'relative' }}>
    <BubbleChartIcon 
      sx={{ position: 'absolute', top: 8, right: 8, fontSize: 24, color: 'gray' }} 
    />
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle2" sx={{ fontSize: '1.1rem' }}>
        {student.userName || `Aluno: ${student.id}`}
      </Typography>
      
      {/* Turno */}
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
        <strong>Turno:</strong> {student.turno || 'Não informado'}
      </Typography>
      <br />

      {/* Disponibilidade */}
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
        <strong>Disponibilidade:</strong> {student.disponibilidade || 'N/D'}
      </Typography>

      <Divider sx={{ my: 1 }} />

      {/* Temas de Interesse */}
      <Typography variant="caption" display="block" sx={{ fontSize: '0.9rem' }}>
        <strong>Temas:</strong> {student.temasDeInteresse ? student.temasDeInteresse.join(', ') : 'N/D'}
      </Typography>
    </Box>
    <Stack direction="row" justifyContent="center" sx={{ p: 1 }}>
      <Button variant="contained" color="primary" size="small">
        Conectar
      </Button>
    </Stack>
  </Card>
);

const Clustering = () => {
  const currentUser = useSelector((state) => state.auth?.auth?.user);
  const token = useSelector((state) => state.auth?.auth?.token);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    setOpen(true);
    setLoading(true);
    const startTime = Date.now();
    try {
      // Atualiza os clusters, enviando o token no header
      await api.get(`/cluster/clustering/atualizar`, {
        headers: { Authorization: token }
      });
      // Em seguida, busca os perfis compatíveis do usuário logado
      const response = await api.get(`/cluster/clustering/sugeridos/${currentUser.id}`, {
        headers: { Authorization: token }
      });
      // Back envia apenas perfis de alunos
      setSuggestions(response.data.sugestoes);
    } catch (error) {
      console.error("Erro ao buscar perfis compatíveis:", error);
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(3000 - elapsed, 0);
      setTimeout(() => {
        setLoading(false);
      }, delay);
    }
  };

  let modalContent;
  if (loading) {
    modalContent = (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: 200 
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem' }}>
          Buscando perfis compatíveis...
        </Typography>
      </Box>
    );
  } else if (suggestions.length > 0) {
    modalContent = (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {suggestions.map((profile) => (
          <CompatibleCard key={profile.id} student={profile} />
        ))}
      </Box>
    );
  } else {
    modalContent = (
      <Typography variant="body1" sx={{ fontSize: '1.1rem', textAlign: 'center' }}>
        No momento não encontramos perfis compatíveis com o seu 😓<br/>
        Você ainda pode conferir/filtrar os perfis cadastrados na aba <strong><em>Alunos</em></strong>!
      </Typography>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={fetchSuggestions}
        disabled={currentUser && currentUser.role === 'PROFESSOR'} // Desabilita para professores
      >
        Buscar perfis compatíveis
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box 
          sx={{ 
            p: 4, 
            maxWidth: 800, 
            margin: 'auto', 
            mt: 15, 
            bgcolor: 'background.paper',
            borderRadius: 2  
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Perfis Compatíveis 
          </Typography>
          {modalContent}
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Clustering;