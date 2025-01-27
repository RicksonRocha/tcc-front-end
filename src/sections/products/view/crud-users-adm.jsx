import { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "src/api/user";
import api from "src/api/api";

export default function CrudUsersAdmTable() {
  const { data: users = [], isLoading, isError, error, refetch } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

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
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    setFilteredUsers(users);
    document.title = "Manutenção de Usuários"; // Atualiza o título da guia
  }, [users]);

  const handleAddRow = () => {
    setNewUser({ name: "", email: "", password: "", role: "ALUNO" });
    setSelectedUserId(null);
    setShowForm(true);
    setErrors({});
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

  const handleSave = async () => {
    try {
      if (selectedUserId) {
        await updateUser({ id: selectedUserId, ...newUser }).unwrap();
      } else {
        if (!newUser.password) {
          setErrors((prev) => ({ ...prev, password: "Senha é obrigatória." }));
          return;
        }
        await api.post("/auth/register", newUser); // Criação de novo usuário
      }
      refetch(); // Atualiza a lista de usuários
      setNewUser({ name: "", email: "", password: "", role: "ALUNO" });
      setSelectedUserId(null);
      setShowForm(false);
    } catch (saveError) {
      console.error("Erro ao salvar usuário:", saveError.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUserId).unwrap();
      refetch(); // Atualiza a lista de usuários
      setSelectedUserId(null);
      setConfirmDialogOpen(false);
    } catch (deleteError) {
      console.error("Erro ao excluir usuário:", deleteError.message);
    }
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

  if (isLoading) return <Typography>Carregando usuários...</Typography>;
  if (isError)
    return <Typography>Erro ao carregar usuários: {error.message}</Typography>;

  return (
    <Container>
      {!showForm ? (
        <>
          <Typography variant="h4" align="left" sx={{ mb: 3 }}>
            Usuários
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <Button size="small" variant="contained" onClick={handleAddRow}>
              Adicionar
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleEdit}
              disabled={!selectedUserId}
            >
              Editar
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => setConfirmDialogOpen(true)}
              disabled={!selectedUserId}
            >
              Excluir
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setIsFilterOpen(true)}
            >
              Filtros
            </Button>
          </Stack>

          <Drawer
            anchor="right"
            open={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          >
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Filtros
              </Typography>
              <TextField
                label="Email"
                value={filters.email}
                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
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
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={applyFilters}
                >
                  Aplicar
                </Button>
                <Button size="small" variant="outlined" onClick={clearFilters}>
                  Limpar
                </Button>
              </Stack>
            </Box>
          </Drawer>

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
                    onClick={() =>
                      setSelectedUserId((prev) => (prev === user.id ? null : user.id))
                    }
                    selected={selectedUserId === user.id}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedUserId === user.id ? "rgba(0, 0, 255, 0.1)" : "inherit",
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

          <Dialog
            open={confirmDialogOpen}
            onClose={() => setConfirmDialogOpen(false)}
          >
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Tem certeza de que deseja excluir este usuário? Essa ação não pode ser
                desfeita.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleDelete} color="error" autoFocus>
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </>
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
          {!selectedUserId && (
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
            <Button size="small" variant="contained" onClick={handleSave}>
              Salvar
            </Button>
            <Button size="small" variant="outlined" onClick={handleCancel}>
              Cancelar
            </Button>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}