import React, { useEffect, useRef } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef();

  useEffect(() => {
    // Reproduce automáticamente el audio al cargar la página
    audioRef.current.play().catch((error) => {
      console.error("La reproducción automática está bloqueada:", error);
    });
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="ruta-a-tu-archivo.mp3" type="audio/mpeg" />
      Tu navegador no soporta el elemento de audio.
    </audio>
  );
};

export default BackgroundMusic;
