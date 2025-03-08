import React, { useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Para interacción (clics, arrastrar, etc.)
import { Context } from "../store/appContext"; // Ajusta la ruta según tu estructura

const Calendar = () => {
  const { store, actions } = useContext(Context);

  // Al montar el componente, carga las citas del usuario autenticado
  useEffect(() => {
    actions.fetchAppointments();
  }, []);

  // Función para agregar cita al hacer click en una fecha del calendario
  const handleDateClick = (arg) => {
    const title = prompt("Ingresa el título de la cita:");
    if (title) {
      const newEvent = {
        id: new Date().getTime().toString(), // Id temporal; en producción lo asigna el backend
        title: title,
        date: arg.dateStr,
      };
      actions.addAppointment(newEvent);
    }
  };

  // Función para manejar el clic en un evento (cita existente)
  const handleEventClick = (clickInfo) => {
    const action = prompt(
      "¿Qué deseas hacer?\nEscribe 'eliminar' para borrar o 'editar' para modificar la cita:"
    );
    if (action && action.toLowerCase() === "eliminar") {
      if (window.confirm("¿Estás seguro de eliminar esta cita?")) {
        actions.deleteAppointment(clickInfo.event.id);
      }
    } else if (action && action.toLowerCase() === "editar") {
      const newTitle = prompt("Ingresa el nuevo título para la cita:", clickInfo.event.title);
      if (newTitle) {
        const updatedData = {
          title: newTitle,
          date: clickInfo.event.startStr, // Se mantiene la misma fecha
        };
        actions.updateAppointment(clickInfo.event.id, updatedData);
      }
    }
  };

  // Botón visible para agregar cita manualmente (sin necesidad de hacer click en una fecha)
  const handleAddButton = () => {
    const date = prompt("Ingresa la fecha para la cita (YYYY-MM-DD):");
    const title = prompt("Ingresa el título de la cita:");
    if (date && title) {
      const newEvent = {
        id: new Date().getTime().toString(),
        title,
        date,
      };
      actions.addAppointment(newEvent);
    }
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">📅 Mi Agenda :D</h2>
      <button onClick={handleAddButton}>Agregar Cita</button>
      <div className="calendar-box">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={store.events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          selectable={true}
          height="auto"
        />
      </div>
    </div>
  );
};

export default Calendar;
