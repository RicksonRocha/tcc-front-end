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
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export const TEAM_OPTIONS = ['Aberta', 'Completa'];
export const TURNO_OPTIONS = ['Vespertino', 'Noturno'];

export const TEMAS_TCC_OPTIONS = ['Tecnologia e inovação', 'Educação', 'Meio ambiente e sustentabilidade', 'Inteligência artificial', 'Análise de dados', 'Metodologias ágeis', 'Economia e Finanças', 'Saúde e bem estar', 'Cidadania', 'Política'];

export const ORIENTADOR_OPTIONS = ['Com orientador(a)', 'Sem orientador(a)'];

// ----------------------------------------------------------------------

export default function TeamFilters({ openFilter, onOpenFilter, onCloseFilter, setFilteredTeam }) {

  const router = useRouter();

  const [filterState, setFilterState] = useState({
    teamStatus: '', 
    turno: '',
    temasTCC: [],
    orientador: [],
  });

  // Para lidar com a limpeza de todos os filtros
  const handleClearAll = () => {
    setFilterState({
      teamStatus: '',
      turno: '',
      temasTCC: [],
      orientador: [],
    });
    setFilteredTeam(''); 
  };

  const handleCheckboxChange = (category, value) => {
    setFilterState((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleRadioChange = (category, value) => {
    setFilterState((prev) => ({
      ...prev,
      [category]: value,
    }));

    if (category === 'teamStatus') {
      setFilteredTeam(value); // Atualiza o filtro de equipe no componente pai
    }
  };

  const renderTeam = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Situação da Equipe</b>
      </Typography>
      <RadioGroup
        value={filterState.teamStatus}
        onChange={(e) => handleRadioChange('teamStatus', e.target.value)}
      >
        {TEAM_OPTIONS.map((item) => (
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
      <RadioGroup value={filterState.turno} onChange={(e) => handleRadioChange('turno', e.target.value)}>
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

  const renderOrientador = (
    <Stack spacing={1}>
      <Divider />
      <Typography variant="subtitle3">
        <b>Orientação</b>
      </Typography>
      <FormGroup>
        {ORIENTADOR_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.orientador.includes(item)}
                onChange={() => handleCheckboxChange('orientador', item)}
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

        <Button
          disableRipple
          color="inherit"
          endIcon={<Iconify icon="ic:round-group" />}
          onClick={() => router.push('/minha-equipe')}
          sx={{ fontSize: '16px' }}
        >
          Minha Equipe
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
              Conheça as equipes já cadastradas!
            </Typography>
          </Box>

          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderTeam}
            {renderTurno}
            {renderTemasTCC}
            {renderOrientador}
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

TeamFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  setFilteredTeam: PropTypes.func, // Função para atualizar o filtro de equipes
};
