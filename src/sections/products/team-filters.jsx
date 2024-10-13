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

// ----------------------------------------------------------------------

export const TEAM_OPTIONS = ['Aberta', 'Completa'];
export const TURNO_OPTIONS = ['Vespertino', 'Noturno'];
export const SOFT_SKILLS_OPTIONS = ['Skill a', 'Skill b', 'Skill c'];
export const LINGUAGEM_DOMINADA_OPTIONS = ['Javascript', 'Java', 'C', 'Python'];
export const TECH_FRONT_OPTIONS = ['Angular', 'React', 'Vue'];
export const TECH_BACK_OPTIONS = ['Java', 'Python', 'Node JS'];
export const TECH_BD_OPTIONS = ['PostgreSQL', 'MySQL', 'MongoDB', 'Neo4j'];
export const TEMAS_TCC_OPTIONS = ['Educação', 'Saúde', 'Jogos digitais', 'Esportes', 'Automações'];
export const STUDENT_TEAM_OPTIONS = ['Com equipe', 'Sem equipe'];

// ----------------------------------------------------------------------

export default function TeamFilters({ openFilter, onOpenFilter, onCloseFilter }) {

  // Estado para armazenar a seleção dos filtros
  const [filterState, setFilterState] = useState({
    team: [],
    turno: '',
    studentTeam: [],
    softSkills: [],
    linguagemDominada: [],
    techFront: [],
    techBack: [],
    techBD: [],
    temasTCC: [],
  });

  // Para lidar com a limpeza de todos os filtros
  const handleClearAll = () => {
    setFilterState({
      team: [],
      turno: '',
      studentTeam: [],
      softSkills: [],
      linguagemDominada: [],
      techFront: [],
      techBack: [],
      techBD: [],
      temasTCC: [],
    });
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
  };

  const renderTeam = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Equipe</b>
      </Typography>
      <FormGroup>
        {TEAM_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.team.includes(item)}
                onChange={() => handleCheckboxChange('team', item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderTurno = (
    <Stack spacing={1}>
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

  const renderStudentTeam = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Aluno | Situação</b>
      </Typography>
      <FormGroup>
        {STUDENT_TEAM_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.studentTeam.includes(item)}
                onChange={() => handleCheckboxChange('studentTeam', item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderTemasTCC = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Aluno | Temas TCC</b>
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

  const renderLinguagemDominada = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Aluno | Linguagem Dominada</b>
      </Typography>
      <FormGroup>
        {LINGUAGEM_DOMINADA_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.linguagemDominada.includes(item)}
                onChange={() => handleCheckboxChange('linguagemDominada', item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderSoftSkills = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Aluno | Soft Skills</b>
      </Typography>
      <FormGroup>
        {SOFT_SKILLS_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.softSkills.includes(item)}
                onChange={() => handleCheckboxChange('softSkills', item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderTechFront = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Aluno | Techs Front</b>
      </Typography>
      <FormGroup>
        {TECH_FRONT_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.techFront.includes(item)}
                onChange={() => handleCheckboxChange('techFront', item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderTechBack = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Aluno | Techs Back</b>
      </Typography>
      <FormGroup>
        {TECH_BACK_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.techBack.includes(item)}
                onChange={() => handleCheckboxChange('techBack', item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderTechBD = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Aluno | Banco de Dados</b>
      </Typography>
      <FormGroup>
        {TECH_BD_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.techBD.includes(item)}
                onChange={() => handleCheckboxChange('techBD', item)}
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
      <Button disableRipple
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
        onClick={() => alert('Deve levar para a tela de edição/detalhes da equipe.')} 
        sx={{ fontSize: '16px' }}
      >
        Minha Equipe
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 400, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Filtros
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderTeam}
            {renderTurno}
            {renderStudentTeam}
            {renderTemasTCC}
            {renderLinguagemDominada}
            {renderSoftSkills}
            {renderTechFront}
            {renderTechBack}
            {renderTechBD}
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
};
