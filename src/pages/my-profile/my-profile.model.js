import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useCreatePreferenceMutation } from 'src/api/preference';
import schemaPreferenciasAluno from 'src/hooks/form/preferencias-aluno';

export default function useMyProfileModel() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [createPreference, { isLoading }] = useCreatePreferenceMutation();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const defaultValues = {
    turno: '',
    linguagemProgramacao: [],
    bancoDeDados: [],
    nivelDeExperiencia: '',
    habilidadesPessoais: [],
    temasDeInteresse: [],
    disponibilidade: '',
    modalidadeTrabalho: '',
    frameworkFront: [],
  };

  const formMethods = useForm({
    resolver: yupResolver(schemaPreferenciasAluno),
    defaultValues,
  });

  const { reset } = formMethods;

  const onSubmit = async (data) => {
    try {
      await createPreference(data);
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return { open, handleOpen, formMethods, onSubmit, isLoading };
}
