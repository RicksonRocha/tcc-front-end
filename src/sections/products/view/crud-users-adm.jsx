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
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const API_BASE_URL = "http://localhost:3000/api/crud-users";

export default function CrudUsersAdmTable() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "ALUNO", // Valor padrão
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleAddRow = () => {
    setNewUser({ name: "", email: "", password: "", role: "ALUNO" });
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/${editingId}`, newUser);
      } else {
        await axios.post(API_BASE_URL, newUser);
      }
      setNewUser({ name: "", email: "", password: "", role: "ALUNO" });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const handleEdit = (user) => {
    setNewUser(user);
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleChange = (field, value) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Gerenciamento de Usuários</Typography>
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
              <TableCell>E-mail</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {editingId === user.id ? (
                    <TextField
                      value={newUser.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === user.id ? (
                    <TextField
                      value={newUser.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editingId === user.id ? (
                    <TextField
                      value={newUser.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                    />
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {editingId === user.id ? (
                      <Button variant="contained" color="primary" onClick={handleSave}>
                        Salvar
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(user)}
                      >
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
                      onClick={() => handleDelete(user.id)}
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