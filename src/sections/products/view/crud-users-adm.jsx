import { useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
  TablePagination,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from 'src/api/user';
import api from 'src/api/api';

export default function CrudUsersAdmTable() {
  const { data: users = [], isLoading, isError, error, refetch } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ email: '', role: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'ALUNO',
    },
  });

  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) =>
      a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
    );
    setFilteredUsers(sortedUsers);
    document.title = 'Manutenção de Usuários';
  }, [users]);

  const handleAddRow = () => {
    reset({ name: '', email: '', password: '', role: 'ALUNO' });
    setSelectedUserId(null);
    setShowForm(true);
    clearErrors();
  };

  const handleEdit = () => {
    const user = users.find((u) => u.id === selectedUserId);
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
      });
      setShowForm(true);
      clearErrors();
    }
  };

  const onSubmit = async (data) => {
    try {
      const isDuplicate = users.some(
        (user) =>
          (user.email === data.email || user.name === data.name) && user.id !== selectedUserId
      );

      if (isDuplicate) {
        setError('email', { type: 'manual', message: 'E-mail já cadastrado.' });
        setError('name', { type: 'manual', message: 'Nome já cadastrado.' });
        return;
      }

      if (selectedUserId) {
        await updateUser({ id: selectedUserId, ...data }).unwrap();
        setSnackbarMessage('Usuário atualizado com sucesso!');
      } else {
        await api.post('/auth/register', data);
        setSnackbarMessage('Usuário criado com sucesso!');
      }

      refetch();
      setShowForm(false);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Erro ao salvar usuário.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const openConfirmDialog = (userId) => {
    setSelectedUserId(userId);
    setConfirmDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUserId);
      setConfirmDialogOpen(false);
      setSnackbarMessage('Usuário excluído com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      refetch();
      setSelectedUserId(null);
    } catch (err) {
      console.error('Erro durante a exclusão:', err);
      setConfirmDialogOpen(false);
      setSnackbarMessage('Erro ao excluir usuário.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const applyFilters = () => {
    const filtered = users
      .filter(
        (user) =>
          (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
          (!filters.role || user.role === filters.role)
      )
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));
    setFilteredUsers(filtered);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters({ email: '', role: '' });
    const sorted = [...users].sort((a, b) =>
      a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
    );
    setFilteredUsers(sorted);
    setIsFilterOpen(false);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (isLoading) return <Typography>Carregando usuários...</Typography>;
  if (isError) return <Typography>Erro ao carregar usuários: {error.message}</Typography>;

  return (
    <Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

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
              onClick={() => openConfirmDialog(selectedUserId)}
              disabled={!selectedUserId}
            >
              Excluir
            </Button>
            <Button size="small" variant="outlined" onClick={() => setIsFilterOpen(true)}>
              Filtros
            </Button>
          </Stack>

          <Drawer anchor="right" open={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
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
                <Button size="small" variant="contained" color="primary" onClick={applyFilters}>
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
                {paginatedUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    onClick={() => setSelectedUserId((prev) => (prev === user.id ? null : user.id))}
                    selected={selectedUserId === user.id}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor:
                        selectedUserId === user.id ? 'rgba(0, 0, 255, 0.1)' : 'inherit',
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

          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Linhas por página"
          />

          <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Tem certeza de que deseja excluir este usuário? Essa ação não pode ser desfeita.
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Nome é obrigatório.' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: 'E-mail é obrigatório.' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-mail"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            {!selectedUserId && (
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Senha é obrigatória.' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Senha"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            )}
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Tipo
            </Typography>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel value="ALUNO" control={<Radio />} label="Aluno" />
                  <FormControlLabel value="PROFESSOR" control={<Radio />} label="Professor" />
                  <FormControlLabel value="ADMIN" control={<Radio />} label="Administrador" />
                </RadioGroup>
              )}
            />
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="contained" type="submit">
                Salvar
              </Button>
              <Button size="small" variant="outlined" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Container>
  );
}
