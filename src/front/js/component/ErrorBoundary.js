import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar la interfaz alternativa
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de reporte de errores aquí
    console.error("Error atrapado por ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Interfaz de reserva en caso de error
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1>Algo salió mal</h1>
          <p>Por favor, recarga la página o contacta al soporte.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
