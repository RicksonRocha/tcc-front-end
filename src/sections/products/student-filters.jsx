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

export const STUDENT_TEAM_OPTIONS = ['Com equipe', 'Sem equipe'];
export const TURNO_OPTIONS = ['Vespertino', 'Noturno'];
export const LINGUAGEM_OPTIONS = ['Python', 'SQL', 'Java', 'C++', 'R', 'C#', 'C', 'PHP', 'TypeScript', 'JavaScript'];
export const TECH_BD_OPTIONS = ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'Cassandra', 'MariaDB', 'SQL Server'];
export const HABILIDADES_PESSOAIS_OPTIONS = ['Comunicação', 'Organização', 'Proatividade', 'Pensamento estratégico', 'Liderança', 'Planejamento', 'Trabalho em equipe', 'Adaptabilidade', 'Atenção', 'Criatividade', 'Resiliência', 'Gerenciamento de tempo', 'Negociação', 'Resolução de problemas'];
export const TEMAS_TCC_OPTIONS = ['Tecnologia e inovação', 'Educação', 'Meio ambiente e sustentabilidade', 'Inteligência artificial', 'Análise de dados', 'Metodologias ágeis', 'Economia e Finanças', 'Saúde e bem estar', 'Cidadania', 'Política'];
export const MODALIDADE_AGENDAS_OPTIONS = ['Presencial', 'Remoto', 'Flexível'];

export default function StudentFilters({ openFilter, onOpenFilter, onCloseFilter, filterState, setFilterState }) {
  const router = useRouter();

  const handleCheckboxChange = (category, value) => {
    const updatedState = filterState[category]?.includes(value)
      ? filterState[category].filter((item) => item !== value)
      : [...(filterState[category] || []), value];

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
      teamStatus: '',
      turno: '',
      linguagemProgramacao: [],
      bancoDeDados: [],
      habilidadesPessoais: [],
      temasDeInteresse: [],
      modalidadeTrabalho: '',
    });
  };

  const renderEquipeEstudante = (
    <Stack spacing={1}>
      <Typography variant="subtitle3">
        <b>Situação do(a) aluno(a)</b>
      </Typography>
      <RadioGroup
        value={filterState.teamStatus}
        onChange={(e) => handleRadioChange('teamStatus', e.target.value)}
      >
        {STUDENT_TEAM_OPTIONS.map((item) => (
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

  const renderLinguagem = (
    <Stack spacing={1}>
      <Divider />
      <Typography variant="subtitle3">
        <b>Linguagens de Programação</b>
      </Typography>
      <FormGroup>
        {LINGUAGEM_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.linguagemProgramacao?.includes(item)}
                onChange={() => handleCheckboxChange('linguagemProgramacao', item)}
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
      <Divider />
      <Typography variant="subtitle3">
        <b>Banco de Dados</b>
      </Typography>
      <FormGroup>
        {TECH_BD_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.bancoDeDados?.includes(item)}
                onChange={() => handleCheckboxChange('bancoDeDados', item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderHabilidadesPessoais = (
    <Stack spacing={1}>
      <Divider />
      <Typography variant="subtitle3">
        <b>Habilidades Pessoais</b>
      </Typography>
      <FormGroup>
        {HABILIDADES_PESSOAIS_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.habilidadesPessoais?.includes(item)}
                onChange={() => handleCheckboxChange('habilidadesPessoais', item)}
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
                checked={filterState.temasDeInteresse?.includes(item)}
                onChange={() => handleCheckboxChange('temasDeInteresse', item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderModalidadeAgendas = (
    <Stack spacing={1}>
      <Divider />
      <Typography variant="subtitle3">
        <b>Modalidade de Trabalho</b>
      </Typography>
      <FormGroup>
        {MODALIDADE_AGENDAS_OPTIONS.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filterState.modalidadeTrabalho?.includes(item)}
                onChange={() => handleCheckboxChange('modalidadeTrabalho', item)}
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
          sx={{ fontSize: '16px', justifyContent: 'flex-start', ml: -2.2, mr: 2 }}
        >
          Filtros&nbsp;
        </Button>
      </Box>

      {/* <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:baseline-bubble-chart" />}
        onClick={() => {
          window.alert("Aqui serão apresentados apenas os 3 perfis mais compatíveis com o aluno atual.");
        }}
        sx={{ fontSize: '16px' }}
      >
        Perfis Sugeridos
      </Button> */}

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
            {renderEquipeEstudante}
            {renderTurno}
            {renderTemasTCC}
            {renderLinguagem}
            {renderTechBD}
            {renderHabilidadesPessoais}
            {renderModalidadeAgendas}
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

StudentFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  filterState: PropTypes.object,
  setFilterState: PropTypes.func,
};

