import { useState, useEffect } from 'react';
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
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const API_BASE_URL = "http://localhost:3000/api/university/support-material";

export default function SupportMaterialTable() {
  const [materials, setMaterials] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setMaterials(response.data);
    } catch (error) {
      // Erro ao buscar materiais
    }
  };

  const handleAddRow = async () => {
    const newMaterial = { id: null, name: "", autor: "", document: "", type: "" };
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
      // Erro ao salvar material
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setMaterials((prevMaterials) => prevMaterials.filter((material) => material.id !== id));
    } catch (error) {
      // Erro ao excluir material
    }
  };

  const handleChange = (id, field, value) => {
    setMaterials((prevMaterials) =>
      prevMaterials.map((material) => (material.id === id ? { ...material, [field]: value } : material))
    );
  };

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      handleChange(id, "document", file.name);
      handleChange(id, "type", file.type); // Define o tipo de acordo com o tipo MIME do arquivo
    }
  };

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Materiais de apoio</Typography>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          Adicionar novo
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Tipo</TableCell>
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
                    <label htmlFor={`file-input-${material.id}`}>
                      <input
                        id={`file-input-${material.id}`}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, material.id)}
                      />
                      <Button variant="outlined" component="span">
                        {material.document || "Selecionar arquivo"}
                      </Button>
                    </label>
                  ) : (
                    <a href={`/${material.document}`} target="_blank" rel="noopener noreferrer">
                      {material.document}
                    </a>
                  )}
                </TableCell>
                <TableCell>
                  {material.type || "-"}
                </TableCell>
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
                      sx={{ backgroundColor: "red", color: "white" }}
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
    </Container>
  );
}

