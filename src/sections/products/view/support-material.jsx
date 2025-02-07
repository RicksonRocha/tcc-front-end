import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Paper, Stack, TextField, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Snackbar, Alert
} from "@mui/material";
import api from "src/api/api"; 

const API_URL = "/university/support-material"; 

export default function SupportMaterialTable() {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [formData, setFormData] = useState({ name: "", autor: "", link: "" });
  const [userEmail, setUserEmail] = useState("");

  // Obtendo o token do usuário logado
  const token = useMemo(() => localStorage.getItem("token") || sessionStorage.getItem("token"), []);

  // Obter o e-mail do usuário logado a partir do token
  useEffect(() => {
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do JWT
      setUserEmail(tokenPayload.sub); // O email geralmente está no campo "sub" do token
    }
  }, [token]);

  // Função para buscar materiais do usuário logado
  const fetchMaterials = useCallback(() => {
    if (!token || !userEmail) {
      console.error("Nenhum token ou email encontrado. Usuário não autenticado.");
      return;
    }

    const authHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    api.get(API_URL, authHeaders)
      .then(response => {
        // Filtra apenas os materiais cadastrados pelo usuário logado
        const userMaterials = response.data.filter(mat => mat.autor === userEmail);
        setMaterials(userMaterials);
      })
      .catch(() => setSnackbar({ open: true, message: "Erro ao carregar materiais", severity: "error" }));
  }, [token, userEmail]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const handleAdd = () => {
    setFormData({ name: "", autor: userEmail, link: "" }); // Preenche automaticamente com o usuário logado
    setSelectedMaterialId(null);
    setShowForm(true);
  };

  const handleEdit = () => {
    const selectedMaterial = materials.find(mat => mat.id === selectedMaterialId);
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
      setMaterials(materials.filter(mat => mat.id !== selectedMaterialId));
      setConfirmDialogOpen(false);
      setSnackbar({ open: true, message: "Material excluído", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Erro ao excluir material", severity: "error" });
    }
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (selectedMaterialId) {
        response = await api.put(`${API_URL}/${selectedMaterialId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaterials(materials.map(mat => mat.id === selectedMaterialId ? response.data : mat));
      } else {
        response = await api.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaterials([...materials, response.data]);
      }
      setShowForm(false);
      setSnackbar({ open: true, message: "Material salvo com sucesso", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Erro ao salvar material", severity: "error" });
    }
  };

  return (
    <Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <Typography variant="h4" sx={{ mb: 3 }}>Materiais de Apoio</Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" onClick={handleAdd}>Adicionar Novo</Button>
        <Button
          variant="contained"
          disabled={!selectedMaterialId}
          onClick={handleEdit}
        >
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
              <TableCell sx={{ minWidth: 200 }}>Material</TableCell> {/* Aumenta a largura para evitar cortes */}
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
                  cursor: "pointer",
                  backgroundColor: selectedMaterialId === material.id ? "rgba(0, 0, 255, 0.1)" : "inherit",
                }}
              >
                <TableCell sx={{ minWidth: 200 }}>{material.name}</TableCell> {/* Evita corte do nome */}
                <TableCell>{material.autor}</TableCell>
                <TableCell>
                  <a href={material.link} target="_blank" rel="noopener noreferrer">{material.link}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de Confirmação para Exclusão */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja realmente excluir este material?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">Confirmar</Button>
        </DialogActions>
      </Dialog>

      {/* Formulário para Adicionar/Editar Material */}
      <Dialog open={showForm} onClose={() => setShowForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>{selectedMaterialId ? "Editar Material" : "Adicionar Novo Material"}</DialogTitle>
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
          <Button onClick={handleSubmit} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}