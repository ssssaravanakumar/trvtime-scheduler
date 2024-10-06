'use client';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';

const Calendar = () => {
  // Define your events
  const events = [
    {
      title: 'Lake District National Park',
      start: '2024-10-03T10:00:00',
      end: '2024-10-03T11:30:00',
    },
    {
      title: "Giant's Causeway",
      start: '2024-10-04T09:00:00',
      end: '2024-10-04T10:30:00',
    },
    // Add more events as needed
  ];
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek" // Set to week view to show multiple days
      events={events}
      slotDuration="00:30:00" // Define time slots duration
      allDaySlot={false} // Disable all-day slot
      slotLabelFormat={{
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: true,
        meridiem: 'short',
      }}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay',
      }}
      views={{
        timeGridWeek: {
          slotLabelInterval: '01:00:00', // Adjust slot label interval if needed
        },
      }}
    />
  );
};

export default Calendar;
