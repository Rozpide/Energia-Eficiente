import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import calendar from "../../styles/calendar.css";
const Calendar = () => {
  return (
    <div className="calendar-container">
      <h2 className="calendar-title">📅 Mi Agenda</h2>
      <div className="calendar-box">
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          googleCalendarApiKey="AIzaSyA9SZ718AzPI3BVA7cURBpZwjhl4JC-V-A"
          eventSources={[
            {
              googleCalendarId: "diegonmartin12@gmail.com",
            },
          ]}
          height="auto"
        />
      </div>
    </div>
  );
};

export default Calendar;
