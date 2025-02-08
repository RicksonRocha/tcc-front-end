// my-profile-model.js
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreatePreferenceMutation, useUpdatePreferenceMutation, useGetPreferencesQuery } from 'src/api/preference';
import { useGetUsersQuery } from 'src/api/user';
import schemaPreferenciasAluno from 'src/hooks/form/preferencias-aluno';

/**
 * Extrai o e-mail do usuário a partir do token armazenado.
 */
function getUserEmailFromToken() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub; 
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}

export default function useMyProfileModel() {
  const [open, setOpen] = useState(false);
  const [preferenceData, setPreferenceData] = useState(null); // Guarda as preferências salvas
  const [userId, setUserId] = useState(null); // Armazena o id do usuário

  // Extrai o e-mail do token
  const email = getUserEmailFromToken();

  // Busca a lista de usuários
  const { data: users = [] } = useGetUsersQuery();

  // Assim que os usuários e o email estiverem disponíveis, filtra para encontrar o usuário logado
  useEffect(() => {
    if (users && email) {
      const user = users.find((u) => u.email === email);
      if (user) {
        setUserId(user.id);
      } else {
        console.error("Usuário não encontrado pelo email:", email);
      }
    }
  }, [users, email]);

  // Busca todas as preferências e filtra pelo userId
  const { data: allPreferences } = useGetPreferencesQuery();
  useEffect(() => {
    if (allPreferences && userId) {
      const pref = allPreferences.find((p) => p.user_id === userId);
      if (pref) {
        setPreferenceData(pref);
      } else {
        setPreferenceData(null); // Se não encontrar, mantém como null para exibir o card inicial
      }
    }
  }, [allPreferences, userId]);

  const [createPreference, { isLoading: isCreating }] = useCreatePreferenceMutation();
  const [updatePreference, { isLoading: isUpdating }] = useUpdatePreferenceMutation();
  const isLoading = isCreating || isUpdating;

  // Abre/fecha o diálogo
  const handleOpen = () => setOpen((prev) => !prev);

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
      if (!userId) {
        console.error("Usuário não autenticado");
        return;
      }
      let result;
      if (preferenceData && preferenceData.id) {
        // Atualiza as preferências existentes
        result = await updatePreference({ id: preferenceData.id, ...data }).unwrap();
      } else {
        // Cria um novo registro de preferências
        result = await createPreference({ ...data, user_id: userId }).unwrap();
      }
      setPreferenceData(result);
      reset(result); // Atualiza o formulário com os dados salvos
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return { open, handleOpen, formMethods, onSubmit, isLoading, preferenceData, setPreferenceData };
}
