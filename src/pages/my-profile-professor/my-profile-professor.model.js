import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  useCreateProfessorPreferenceMutation,
  useUpdateProfessorPreferenceMutation,
  useGetProfessorPreferencesQuery
} from 'src/api/preference-prof';
import { useGetUsersQuery } from 'src/api/user';
import schemaPreferenciasProfessor from 'src/hooks/form/professor-preferences';

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
  const currentUser = useSelector((state) => state.auth?.auth?.user)

  const { data: allPreferences } = useGetProfessorPreferencesQuery();

  useEffect(() => {
    if (allPreferences && currentUser) {
      const pref = allPreferences.find((p) => p.user_id === currentUser.id);
      if (pref) {
        const transformed = {
          ...pref,
          shift: pref.shift || '',
          availableForAdvising: pref.availableForAdvising || '',
          programmingLanguages: pref.programmingLanguages || [],
          taughtSubjects: pref.taughtSubjects || [],
          personalSkills: pref.personalSkills || [],
          interestTopics: pref.interestTopics || [],
          availability: pref.availability || '',
          workModality: pref.workModality || '',
          id: pref.id,
        };
        setPreferenceData(transformed);
      } else {
        setPreferenceData(null);
      }
    }
  }, [allPreferences, currentUser]);

  const [createPreference, { isLoading: isCreating }] = useCreateProfessorPreferenceMutation();
  const [updatePreference, { isLoading: isUpdating }] = useUpdateProfessorPreferenceMutation();
  const isLoading = isCreating || isUpdating;

  const handleOpen = () => setOpen((prev) => !prev);

  const defaultValues = {
    shift: '',
    availableForAdvising: '',
    programmingLanguages: [],
    taughtSubjects: [],
    personalSkills: [],
    interestTopics: [],
    availability: '',
    workModality: '',
  };

  const formMethods = useForm({
    resolver: yupResolver(schemaPreferenciasProfessor),
    defaultValues,
  });

  const { reset } = formMethods;

  const onSubmit = async (data) => {
    try {
      const payload = {
        shift: data.shift,
        availableForAdvising: data.availableForAdvising,
        programmingLanguages: data.programmingLanguages,
        taughtSubjects: data.taughtSubjects,
        personalSkills: data.personalSkills,
        interestTopics: data.interestTopics,
        availability: data.availability,
        workModality: data.workModality,
        user_id: currentUser.id,
      };

      let result;
      if (preferenceData && preferenceData.id) {
        result = await updatePreference({ id: preferenceData.id, ...payload }).unwrap();
      } else {
        result = await createPreference(payload).unwrap();
      }

      const transformed = {
        ...result,
        shift: result.shift || '',
        availableForAdvising: result.availableForAdvising || '',
        programmingLanguages: result.programmingLanguages || [],
        taughtSubjects: result.taughtSubjects || [],
        personalSkills: result.personalSkills || [],
        interestTopics: result.interestTopics || [],
        availability: result.availability || '',
        workModality: result.workModality || '',
        id: result.id,
      };

      setPreferenceData(transformed);
      reset(transformed);
      setOpen(false);
    } catch (e) {
      console.error("Erro ao salvar preferências:", e);
    }
  };

  return { open, handleOpen, formMethods, onSubmit, isLoading, preferenceData };
}