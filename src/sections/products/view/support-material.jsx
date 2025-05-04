import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Card,
} from '@mui/material';
import api from 'src/api/api';
import { useGetTeamsQuery } from 'src/api/team';

const API_URL = '/university/support-material';

export default function SupportMaterialTable() {
  // Estados locais
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [formData, setFormData] = useState({
    name: '',
    autor: '',
    link: '',
    teamId: null,
  });

  // Obtém o usuário logado via Redux (mesmo padrão do app-view.jsx)
  const user = useSelector((state) => state.auth.auth.user);

  // Consulta as equipes (TCCs) cadastradas
  const { data: teams = [], isLoading: teamsLoading, isError: teamsError } = useGetTeamsQuery();

  // Filtra para encontrar a equipe na qual o usuário está
  const myTeam = teams.find((team) => team.members?.some((member) => member.userId === user?.id));

  // Token para as chamadas à API
  const token = useMemo(() => localStorage.getItem('token') || sessionStorage.getItem('token'), []);

  // Função para buscar os materiais de apoio filtrados pela equipe do usuário
  const fetchMaterials = useCallback(() => {
    if (!token || !user || !myTeam) {
      console.error('Token, usuário ou equipe não encontrados.');
      return;
    }

    const authHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    api
      .get(API_URL, authHeaders)
      .then((response) => {
        // Converte os valores para número para garantir a comparação correta
        const teamMaterials = response.data.filter(
          (mat) => Number(mat.teamId) === Number(myTeam.id)
        );
        setMaterials(teamMaterials);
      })
      .catch(() =>
        setSnackbar({
          open: true,
          message: 'Erro ao carregar materiais',
          severity: 'error',
        })
      );
  }, [token, user, myTeam]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  // Handler para adicionar novo material
  const handleAdd = () => {
    // Preenche automaticamente com o usuário logado e a equipe identificada
    setFormData({ name: '', autor: user?.name, link: '', teamId: myTeam?.id });
    setSelectedMaterialId(null);
    setShowForm(true);
  };

  const handleEdit = () => {
    const selectedMaterial = materials.find((mat) => mat.id === selectedMaterialId);
    if (selectedMaterial) {
      setFormData(selectedMaterial);
      setShowForm(true);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`${API_URL}/${selectedMaterialId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(materials.filter((mat) => mat.id !== selectedMaterialId));
      setConfirmDialogOpen(false);
      setSnackbar({
        open: true,
        message: 'Material excluído',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao excluir material',
        severity: 'error',
      });
    }
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (selectedMaterialId) {
        response = await api.put(`${API_URL}/${selectedMaterialId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaterials(materials.map((mat) => (mat.id === selectedMaterialId ? response.data : mat)));
      } else {
        response = await api.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaterials([...materials, response.data]);
      }
      setShowForm(false);
      setSnackbar({
        open: true,
        message: 'Material salvo com sucesso',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao salvar material',
        severity: 'error',
      });
    }
  };

  // Função para renderizar o Card quando o usuário não está em uma equipe
  const renderNoTeamCard = () => (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3, mt: 3 }}>
      <Stack
        sx={{
          height: '50vh',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="18" sx={{ mb: 2 }}>
          Você precisa estar em uma equipe para ter acesso à esse recurso🔎
          <br />
          Na aba{' '}
          <strong>
            <em>Equipes</em>
          </strong>{' '}
          é possível visualizar todos os grupos disponíveis!
        </Typography>
      </Stack>
    </Card>
  );

  return (
    <Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '', severity: 'success' })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      {/* Renderização condicional baseada no estado das equipes */}
      {teamsLoading && <Typography variant="body1">Carregando equipe...</Typography>}
      {teamsError && (
        <Typography variant="body1" color="error">
          Erro ao carregar equipe.
        </Typography>
      )}
      {!teamsLoading && !teamsError && !myTeam && (
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Materiais de Apoio
          </Typography>
          {renderNoTeamCard()}
        </>
      )}
      {!teamsLoading && !teamsError && myTeam && (
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Materiais de Apoio
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button variant="contained" onClick={handleAdd}>
              Adicionar Novo
            </Button>
            <Button variant="contained" disabled={!selectedMaterialId} onClick={handleEdit}>
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={!selectedMaterialId}
              onClick={() => setConfirmDialogOpen(true)}
            >
              Excluir
            </Button>
          </Stack>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Material</TableCell>
                  <TableCell>Autor</TableCell>
                  <TableCell>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((material) => (
                  <TableRow
                    key={material.id}
                    onClick={() => setSelectedMaterialId(material.id)}
                    selected={selectedMaterialId === material.id}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor:
                        selectedMaterialId === material.id ? 'rgba(0, 0, 255, 0.1)' : 'inherit',
                    }}
                  >
                    <TableCell sx={{ minWidth: 200 }}>{material.name}</TableCell>
                    <TableCell>{material.autor}</TableCell>
                    <TableCell>
                      <a href={material.link} target="_blank" rel="noopener noreferrer">
                        {material.link}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Diálogo de confirmação para exclusão */}
          <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
              <DialogContentText>Deseja realmente excluir este material?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleDelete} color="error">
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>

          {/* Formulário para adicionar/editar material */}
          <Dialog open={showForm} onClose={() => setShowForm(false)} fullWidth maxWidth="sm">
            <DialogTitle>
              {selectedMaterialId ? 'Editar Material' : 'Adicionar Novo Material'}
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Material"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ mb: 2, mt: 3 }}
              />
              <TextField
                label="Autor"
                fullWidth
                value={formData.autor}
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Link"
                fullWidth
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                sx={{ mb: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button onClick={handleSubmit} variant="contained">
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
}
