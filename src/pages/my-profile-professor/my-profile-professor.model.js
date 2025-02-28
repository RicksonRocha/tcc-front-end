import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProfessorPreferenceMutation, useUpdateProfessorPreferenceMutation, useGetProfessorPreferencesQuery } from 'src/api/preference-prof';
import { useGetUsersQuery } from 'src/api/user';
import schemaPreferenciasProfessor from 'src/hooks/form/preferencias-professor';

// Função auxiliar para extrair o e-mail do token (para identificar o usuário logado)
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

export default function useMyProfileProfessorModel() {
  const [open, setOpen] = useState(false);
  const [preferenceData, setPreferenceData] = useState(null);
  const [userId, setUserId] = useState(null);

  const email = getUserEmailFromToken();
  const { data: users = [] } = useGetUsersQuery();
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

  const { data: allPreferences } = useGetProfessorPreferencesQuery();
  // Ao carregar dados do backend, converte os campos de string para array 
  useEffect(() => {
    if (allPreferences && userId) {
      const pref = allPreferences.find((p) => p.user_id === userId);
      if (pref) {
        const transformed = {
          ...pref,
          linguagensProgramacao: pref.linguagensProgramacao ? pref.linguagensProgramacao.split(',').map(s => s.trim()) : [],
          disciplinasLecionadas: pref.disciplinasLecionadas ? pref.disciplinasLecionadas.split(',').map(s => s.trim()) : [],
          habilidadesPessoais: pref.habilidadesPessoais ? pref.habilidadesPessoais.split(',').map(s => s.trim()) : [],
          temasInteresse: pref.temasInteresse ? pref.temasInteresse.split(',').map(s => s.trim()) : [],
        };
        setPreferenceData(transformed);
      } else {
        setPreferenceData(null);
      }
    }
  }, [allPreferences, userId]);

  const [createPreference, { isLoading: isCreating }] = useCreateProfessorPreferenceMutation();
  const [updatePreference, { isLoading: isUpdating }] = useUpdateProfessorPreferenceMutation();
  const isLoading = isCreating || isUpdating;

  const handleOpen = () => setOpen((prev) => !prev);

  const defaultValues = {
    turno: '',
    disponivelOrientacao: '',
    linguagensProgramacao: [],
    disciplinasLecionadas: [],
    habilidadesPessoais: [],
    temasInteresse: [],
    disponibilidade: '',
    modalidadeTrabalho: '',
  };

  const formMethods = useForm({
    resolver: yupResolver(schemaPreferenciasProfessor),
    defaultValues,
  });

  const { reset } = formMethods;

  const onSubmit = async (data) => {
    try {
      // Converte os campos array para string separada por vírgula
      const payload = {
        ...data,
        linguagensProgramacao: Array.isArray(data.linguagensProgramacao) ? data.linguagensProgramacao.join(', ') : data.linguagensProgramacao,
        disciplinasLecionadas: Array.isArray(data.disciplinasLecionadas) ? data.disciplinasLecionadas.join(', ') : data.disciplinasLecionadas,
        habilidadesPessoais: Array.isArray(data.habilidadesPessoais) ? data.habilidadesPessoais.join(', ') : data.habilidadesPessoais,
        temasInteresse: Array.isArray(data.temasInteresse) ? data.temasInteresse.join(', ') : data.temasInteresse,
      };

      if (!userId) {
        console.error("Usuário não autenticado");
        return;
      }
      let result;
      if (preferenceData && preferenceData.id) {
        result = await updatePreference({ id: preferenceData.id, ...payload }).unwrap();
      } else {
        result = await createPreference({ ...payload, user_id: userId }).unwrap();
      }
      // Converte novamente os campos recebidos para array
      const transformed = {
        ...result,
        linguagensProgramacao: result.linguagensProgramacao ? result.linguagensProgramacao.split(',').map(s => s.trim()) : [],
        disciplinasLecionadas: result.disciplinasLecionadas ? result.disciplinasLecionadas.split(',').map(s => s.trim()) : [],
        habilidadesPessoais: result.habilidadesPessoais ? result.habilidadesPessoais.split(',').map(s => s.trim()) : [],
        temasInteresse: result.temasInteresse ? result.temasInteresse.split(',').map(s => s.trim()) : [],
      };
      setPreferenceData(transformed);
      reset(transformed);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return { open, handleOpen, formMethods, onSubmit, isLoading, preferenceData, setPreferenceData };
}
