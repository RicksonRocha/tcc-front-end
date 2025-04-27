import { useMemo, useState, useEffect } from 'react';
import {
  useGetEventsQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} from 'src/api/event';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetTeamsQuery } from 'src/api/team';
import { useSelector } from 'react-redux';
import { schema } from './event.schema';

export const useEventModel = () => {
   const user = useSelector((state) => state.auth.auth.user);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [createEvent, { isLoading: creating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: updating }] = useUpdateEventMutation();
  const [deleteEvent, { isLoading: deleting }] = useDeleteEventMutation();
  const { data: teams = [], isLoading, isError } = useGetTeamsQuery();
  
    // Filtra para encontrar a equipe que contenha o nome do usuário
  const myTeam = teams.find((team) => team.members?.some((member) => member?.userId === user?.id));
  
  const { data, isFetching, refetch } = useGetEventsQuery(myTeam?.id, { skip: myTeam === undefined});

  const handleToggle = () => {
    setOpen(!open);
  };

  const defaultValues = useMemo(
    () => ({
      name: selectedEvent?.title ?? null,
      description: selectedEvent?.extendedProps.description ?? null,
      startDate: selectedEvent?.start ?? null,
      endDate: selectedEvent?.end ?? null,
      isActive: selectedEvent?.extendedProps.isActive ?? false,
      team: selectedEvent?.extendedProps.team ?? myTeam?.id
    }),
    [selectedEvent, myTeam]
  );

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { reset } = methods;

  const onSubmit = async (payload) => {
    payload = {
      ...payload,
      startDate: new Date(payload.startDate).toISOString(),
      endDate: new Date(payload.endDate).toISOString(),
    };

    try {
      if (selectedEvent?.id) {
        await updateEvent({ id: selectedEvent.id, payload });
      } else {
        await createEvent(payload);
      }

      refetch();
    } catch (error) {
      console.log(error);
    }

    handleClose();
  };

  const handleDelete = async () => {
    if (selectedEvent?.id) {
      await deleteEvent(selectedEvent.id);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedEvent(null);
    handleToggle();
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    setEvents(
      data?.map((e) => ({
        ...e,
        title: e.name,
        start: e.startDate,
        end: e.endDate,
        extendedProps: {
          isActive: e.isActive,
          team: e.team
        },
      }))
    );
  }, [data, setEvents]);

  return {
    methods,
    refetch,
    handleClose,
    handleToggle,
    handleDelete,
    onSubmit,
    events,
    isFetching,
    selectedEvent,
    setSelectedEvent,
    open,
    creating,
    updating,
    deleting,
  };
};
