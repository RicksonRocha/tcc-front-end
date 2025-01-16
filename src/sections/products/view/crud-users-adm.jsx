import { useState, useEffect } from 'react';
import axios from 'axios';
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
  Drawer,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material';

const API_BASE_URL = "http://localhost:3000/api/crud-users";

export default function CrudUsersAdmTable() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "ALUNO",
  });
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ email: "", role: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const validatePassword = (password) => /^\d{8,}$/.test(password);

  const handleAddRow = () => {
    setNewUser({ name: "", email: "", password: "", role: "ALUNO" });
    setSelectedUserId(null);
    setShowForm(true);
    setErrors({});
  };

  const handleSave = async () => {
    if (!newUser.password && selectedUserId === null) {
      setErrors((prev) => ({ ...prev, password: "Senha é obrigatória." }));
      return;
    }

    if (newUser.password && !validatePassword(newUser.password)) {
      setErrors((prev) => ({
        ...prev,
        password: "A senha deve conter no mínimo 8 números.",
      }));
      return;
    }

    try {
      if (selectedUserId) {
        await axios.put(`${API_BASE_URL}/${selectedUserId}`, newUser);
      } else {
        await axios.post(API_BASE_URL, newUser);
      }
      setNewUser({ name: "", email: "", password: "", role: "ALUNO" });
      setSelectedUserId(null);
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const handleEdit = () => {
    const user = users.find((u) => u.id === selectedUserId);
    if (user) {
      setNewUser({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      });
      setShowForm(true);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedUserId) {
        await axios.delete(`${API_BASE_URL}/${selectedUserId}`);
        setSelectedUserId(null);
        fetchUsers();
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleRowClick = (id) => {
    setSelectedUserId((prev) => (prev === id ? null : id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedUserId(null);
    setNewUser({ name: "", email: "", password: "", role: "ALUNO" });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const applyFilters = () => {
    const filtered = users.filter(
      (user) =>
        (!filters.email || user.email.includes(filters.email)) &&
        (!filters.role || user.role === filters.role)
    );
    setFilteredUsers(filtered);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters({ email: "", role: "" });
    setFilteredUsers(users);
    setIsFilterOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Usuários
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3, justifyContent: "flex-start" }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleAddRow}
          sx={{ height: "32px", minWidth: "100px" }}
        >
          Adicionar
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleEdit}
          disabled={!selectedUserId}
          sx={{ height: "32px", minWidth: "100px" }}
        >
          Editar
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            height: "32px",
            minWidth: "100px",
            backgroundColor: "#FF4842",
            color: "white",
            "&:hover": {
              backgroundColor: "#FF7A75",
            },
          }}
          onClick={handleDelete}
          disabled={!selectedUserId}
        >
          Excluir
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => setIsFilterOpen(true)}
          sx={{ height: "32px", minWidth: "100px" }}
        >
          Filtros
        </Button>
      </Stack>

      <Drawer
        anchor="right"
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        PaperProps={{
          sx: { width: 300, padding: 2 },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filtros
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Email"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Tipo de Usuário
          </Typography>
          <RadioGroup
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <FormControlLabel value="" control={<Radio />} label="Todos" />
            <FormControlLabel value="ALUNO" control={<Radio />} label="Aluno" />
            <FormControlLabel value="PROFESSOR" control={<Radio />} label="Professor" />
            <FormControlLabel value="ADMIN" control={<Radio />} label="Administrador" />
          </RadioGroup>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={applyFilters}
            sx={{ minWidth: "100px" }}
          >
            Aplicar
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={clearFilters}
            sx={{ minWidth: "100px" }}
          >
            Limpar
          </Button>
        </Stack>
      </Drawer>

      {!showForm ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => handleRowClick(user.id)}
                  selected={selectedUserId === user.id}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: selectedUserId === user.id ? "rgba(0, 0, 255, 0.1)" : "inherit",
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextField
            label="Nome"
            value={newUser.name}
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="E-mail"
            value={newUser.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
          />
          {selectedUserId === null && (
            <TextField
              label="Senha"
              type="password"
              value={newUser.password}
              onChange={(e) => handleChange("password", e.target.value)}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
            />
          )}
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Tipo
          </Typography>
          <RadioGroup
            value={newUser.role}
            onChange={(e) => handleChange("role", e.target.value)}
            row
          >
            <FormControlLabel value="ALUNO" control={<Radio />} label="Aluno" />
            <FormControlLabel value="PROFESSOR" control={<Radio />} label="Professor" />
            <FormControlLabel value="ADMIN" control={<Radio />} label="Administrador" />
          </RadioGroup>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ height: "32px", minWidth: "100px" }}
            >
              Salvar
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={handleCancel}
              sx={{ height: "32px", minWidth: "100px" }}
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}