import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserTable = ({ users, onEdit, onDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
        <TableRow>
          <TableCell>
            <strong>Nome</strong>
          </TableCell>
          <TableCell>
            <strong>Email</strong>
          </TableCell>
          <TableCell>
            <strong>Tipo</strong>
          </TableCell>
          <TableCell align="center">
            <strong>Ações</strong>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell align="center">
              {/* <IconButton color="primary" onClick={() => onEdit(user)}>
                <EditIcon />
              </IconButton> */}
              <IconButton color="error" onClick={() => onDelete(user.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} align="center">
              Nenhum usuário encontrado
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UserTable;
