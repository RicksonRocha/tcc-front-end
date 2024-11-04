import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const API_BASE_URL = "http://localhost:3000/api/university/support-material";
const USER_TEAM_ID_API = "http://localhost:3000/api/university/support-material/user-team-id";

export default function SupportMaterialTable() {
  const [materials, setMaterials] = useState([]);
  const [userTeamId, setUserTeamId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchMaterials = useCallback(async () => {
    if (!userTeamId) return;
    try {
      const response = await axios.get(`${API_BASE_URL}?teamId=${userTeamId}`);
      setMaterials(response.data);
    } catch (error) {
      console.error("Erro ao buscar materiais:", error);
    }
  }, [userTeamId]);

  const fetchUserTeamId = useCallback(async () => {
    try {
      const response = await axios.get(USER_TEAM_ID_API);
      setUserTeamId(response.data);
    } catch (error) {
      console.error("Erro ao obter o ID da equipe do usuário:", error);
      setUserTeamId(null);
    }
  }, []);

  useEffect(() => {
    fetchUserTeamId();
  }, [fetchUserTeamId]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const handleAddRow = () => {
    const newMaterial = { id: null, teamId: userTeamId, name: "", autor: "", link: "", date: new Date().toISOString().slice(0, 10) };
    setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
    setEditingId(newMaterial.id);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = async (id) => {
    const selectedMaterial = materials.find((material) => material.id === id);
    try {
      if (id) {
        await axios.put(`${API_BASE_URL}/${id}`, selectedMaterial);
      } else {
        const response = await axios.post(API_BASE_URL, selectedMaterial);
        selectedMaterial.id = response.data.id;
      }
      setEditingId(null);
      fetchMaterials();
    } catch (error) {
      console.error("Erro ao salvar material:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setMaterials((prevMaterials) => prevMaterials.filter((material) => material.id !== id));
    } catch (error) {
      console.error("Erro ao excluir material:", error);
    }
  };

  const handleChange = (id, field, value) => {
    setMaterials((prevMaterials) =>
      prevMaterials.map((material) => (material.id === id ? { ...material, [field]: value } : material))
    );
  };

  return (
    <Container>
      {userTeamId ? (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h4">Materiais de apoio</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1877F2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#0C44AE", 
                },
              }}
              onClick={handleAddRow}
            >
              Adicionar novo
            </Button>
          </Stack>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Autor</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>
                      {editingId === material.id ? (
                        <TextField
                          value={material.name}
                          onChange={(e) => handleChange(material.id, "name", e.target.value)}
                        />
                      ) : (
                        material.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === material.id ? (
                        <TextField
                          value={material.autor}
                          onChange={(e) => handleChange(material.id, "autor", e.target.value)}
                        />
                      ) : (
                        material.autor
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === material.id ? (
                        <TextField
                          value={material.link}
                          onChange={(e) => handleChange(material.id, "link", e.target.value)}
                        />
                      ) : (
                        <a href={material.link} target="_blank" rel="noopener noreferrer">
                          {material.link}
                        </a>
                      )}
                    </TableCell>
                    <TableCell>{material.date}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {editingId === material.id ? (
                          <Button variant="contained" color="primary" onClick={() => handleSave(material.id)}>
                            Salvar
                          </Button>
                        ) : (
                          <Button variant="contained" color="primary" onClick={() => handleEdit(material.id)}>
                            Editar
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#FF4842",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#FF7A75",
                            },
                          }}
                          onClick={() => handleDelete(material.id)}
                        >
                          Excluir
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography>Ingresse em uma equipe para ter acesso a área de Materiais de Apoio!</Typography>
      )}
    </Container>
  );
}