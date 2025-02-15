import { useEventModel } from './event.model';
import EventsView from './event.view';

export const EventPage = () => {
  const methods = useEventModel();
  return <EventsView {...methods} />;
};
