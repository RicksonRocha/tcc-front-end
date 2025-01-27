import PropTypes from 'prop-types';
import { Stack, TextField, Select, MenuItem } from '@mui/material';

export default function CrudUsersAdmFilter({ filterState, setFilterState }) {
  const handleTextFieldChange = (value) => {
    setFilterState((prev) => ({
      ...prev,
      email: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFilterState((prev) => ({
      ...prev,
      role: value,
    }));
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Pesquisar por Email"
        value={filterState.email}
        onChange={(e) => handleTextFieldChange(e.target.value)}
        fullWidth
      />
      <Select
        value={filterState.role}
        onChange={(e) => handleSelectChange(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">Todos</MenuItem>
        <MenuItem value="ALUNO">Aluno</MenuItem>
        <MenuItem value="PROFESSOR">Professor</MenuItem>
        <MenuItem value="ADMIN">Administrador</MenuItem>
      </Select>
    </Stack>
  );
}

CrudUsersAdmFilter.propTypes = {
  filterState: PropTypes.object.isRequired,
  setFilterState: PropTypes.func.isRequired,
};