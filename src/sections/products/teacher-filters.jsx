import PropTypes from 'prop-types';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

export const DISPONIBILIDADE_OPTIONS = ['Disponível para Orientação', 'Indisponível para Orientação'];
export const TURNO_OPTIONS = ['Vespertino', 'Noturno', 'Vespertino e Noturno'];
export const TEMAS_TCC_OPTIONS = ['Tecnologia e inovação', 'Educação', 'Meio ambiente e sustentabilidade', 'Inteligência artificial', 'Análise de dados', 'Metodologias ágeis', 'Economia e Finanças', 'Saúde e bem estar', 'Cidadania', 'Política'];

// ----------------------------------------------------------------------

export default function TeacherFilters({ openFilter, onOpenFilter, onCloseFilter, filterState, setFilterState }) {
  
  const handleCheckboxChange = (category, value) => {
    const updatedState = filterState[category].includes(value)
      ? filterState[category].filter((item) => item !== value)
      : [...filterState[category], value];

    setFilterState((prev) => ({
      ...prev,
      [category]: updatedState,
    }));
  };

  const handleRadioChange = (category, value) => {
    setFilterState((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleClearAll = () => {
    setFilterState({
      turno: '',
      teacherDisp: '',
      temasTCC: [],
    });
  };

  const renderDisponibilidade = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Situação do(a) professor(a)</b>
      </Typography>
      <RadioGroup
        value={filterState.teacherDisp}
        onChange={(e) => handleRadioChange('teacherDisp', e.target.value)}
      >
        {DISPONIBILIDADE_OPTIONS.map((item) => (
          <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
        ))}
      </RadioGroup>
    </Stack>
  );

  const renderTurno = (
    <Stack spacing={1}>
      <Divider />
      <Typography variant="subtitle3">
        <b>Turno</b>
      </Typography>
      <RadioGroup
        value={filterState.turno}
        onChange={(e) => handleRadioChange('turno', e.target.value)}
      >
        {TURNO_OPTIONS.map((item) => (
          <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
        ))}
      </RadioGroup>
    </Stack>
  );

  const renderTemasTCC = (
    <Stack spacing={1}>
      <Divider />
      <Typography variant="subtitle3">
        <b>Temas de Interesse</b>
      </Typography>
      <FormGroup>
        {TEMAS_TCC_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.temasTCC.includes(item)}
                onChange={() => handleCheckboxChange('temasTCC', item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  return (
    <>
      <Box display="flex" justifyContent="flex-start" sx={{ mb: 2, pl: 2 }}>
        <Button
          disableRipple
          color="inherit"
          endIcon={<Iconify icon="ic:round-filter-list" />}
          onClick={onOpenFilter}
          sx={{ fontSize: '16px' }}
        >
          Filtros&nbsp;
        </Button>
      </Box>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 450, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6" sx={{ ml: 1 }}>
              Filtros
            </Typography>

            <Typography variant="body1" sx={{ ml: 1, mt: 0.5 }}>
              Aqui você pode encontrar perfis compatíveis!
            </Typography>
          </Box>

          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderDisponibilidade}
            {renderTurno}
            {renderTemasTCC}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={handleClearAll} // Limpa todos os filtros
          >
            Limpar todos
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

TeacherFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  filterState: PropTypes.object, // Recebe o estado dos filtros
  setFilterState: PropTypes.func, // Função pra atualizar o estado dos filtros
};
