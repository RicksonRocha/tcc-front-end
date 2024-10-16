import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppCalendar() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Simulando eventos futuros
    const simulatedEvents = [
      // { date: '2024-11-15', description: 'Reunião com orientador(a)' },
      // { date: '2024-12-01', description: 'Entrega do TCC 1' },
      // { date: '2025-01-10', description: 'Defesa final do TCC' },
    ];
    
    setUpcomingEvents(simulatedEvents);
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Próximos Eventos
        </Typography>

        {upcomingEvents.length > 0 ? (
          <Box>
            {upcomingEvents.map((event, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {event.date}
                </Typography>
                <Typography variant="body1">
                  {event.description}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Não há eventos futuros no momento.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
