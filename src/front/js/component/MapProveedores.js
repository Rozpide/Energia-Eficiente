import React, { useEffect } from "react";

const MapProveedores = ({ proveedores }) => {
  useEffect(() => {
    // Inicializar el mapa centrado en un punto predeterminado (ej. Madrid, España)
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.416775, lng: -3.70379 }, // Coordenadas iniciales
      zoom: 12,
    });

    // Crear límites dinámicos para ajustar la vista del mapa
    const bounds = new window.google.maps.LatLngBounds();

    // Validación de proveedores con coordenadas válidas
    const validProveedores = proveedores.filter(
      (proveedor) => proveedor.latitude && proveedor.longitude
    );

    // Agregar marcadores y extender límites
    validProveedores.forEach((proveedor) => {
      const marker = new window.google.maps.Marker({
        position: { lat: proveedor.latitude, lng: proveedor.longitude },
        map,
        title: proveedor.nombre_proveedor,
      });

      // Agregar las coordenadas del proveedor a los límites del mapa
      bounds.extend(new window.google.maps.LatLng(proveedor.latitude, proveedor.longitude));

      // Mostrar información al hacer clic en un marcador
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><h3>${proveedor.nombre_proveedor}</h3><p>${proveedor.region}</p><p>Contacto: ${proveedor.contacto}</p></div>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });

    // Ajustar el mapa para mostrar todos los marcadores
    if (validProveedores.length > 0) {
      map.fitBounds(bounds);
    }
  }, [proveedores]);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default MapProveedores;
