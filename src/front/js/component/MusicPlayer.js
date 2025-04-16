import React, { useState, useEffect } from "react";
import { supabase } from "/src/config/supabaseConfig"; // Importar el cliente de Supabase
 // Importar el cliente de Supabase

import {
  getTracks,
  getTracksByArtist,
  getTracksByGenre,
  searchArtists,
  getGenres,
} from "../../../JamendoService"; // Importar el servicio de Jamendo

const MusicPlayer = () => {
  const [tracks, setTracks] = useState([]); // Lista de canciones
  const [currentTrack, setCurrentTrack] = useState(null); // Canción actual
  const [artistName, setArtistName] = useState(""); // Nombre del artista
  const [artistSuggestions, setArtistSuggestions] = useState([]); // Sugerencias de artistas
  const [genre, setGenre] = useState(""); // Género musical
  const [topRated, setTopRated] = useState([]); // Lista de canciones más valoradas
  const [isVisible, setIsVisible] = useState(true); // Controla la visibilidad del reproductor
  // Lista de canciones más valoradas desde Supabase

  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false); // Controla el desplegable de géneros
  const filteredTracks = tracks.filter((track) => track.genre === genre); // Filtra las canciones según el género seleccionado

  const [genreSuggestions] = useState(getGenres()); // Lista estática de géneros
  const [error, setError] = useState(null); // Manejar errores

  useEffect(() => {
    // Función para cargar canciones populares
    const fetchTracks = async () => {
      try {
        const tracksData = await getTracks();
        if (tracksData) {
          setTracks(tracksData);
          setCurrentTrack(tracksData[0]); // Reproducir la primera canción por defecto
        } else {
          setError("No se pudieron cargar las canciones.");
        }
      } catch (error) {
        console.error("Error al cargar canciones populares:", error);
      }
    };

    // Función para cargar el ranking desde Supabase
    const fetchRanking = async () => {
      try {
        const { data, error } = await supabase
          .from("topRatedTracks")
          .select("*")
          .order("likes", { ascending: false })
          .limit(20);

        if (!error) {
          setTopRated(data);
        } else {
          console.error("Error al cargar el ranking:", error);
        }
      } catch (error) {
        console.error("Error general en la carga del ranking:", error);
      }
    };

    // Ejecutar ambas funciones en paralelo
    fetchTracks();
    fetchRanking();
  }, []);

  // Actualizar sugerencias de artistas
  const handleArtistInput = async (value) => {
    setArtistName(value);
    if (value.trim()) {
      const suggestions = await searchArtists(value);
      setArtistSuggestions(suggestions);
    } else {
      setArtistSuggestions([]);
    }
  };

  // Manejar la búsqueda de canciones por artista seleccionado
  const handleSearchByArtist = async (artist) => {
    setError(null);
    setArtistName(artist.name);
    setArtistSuggestions([]);
    const tracksData = await getTracksByArtist(artist.name);
    if (tracksData && tracksData.length > 0) {
      setTracks(tracksData);
      setCurrentTrack(tracksData[0]);
    } else {
      setError(`No se encontraron canciones del artista "${artist.name}".`);
    }
  };

  // Manejar la búsqueda por género
  const handleSearchByGenre = async (selectedGenre) => {
    setError(null);
    setGenre(selectedGenre);
    const tracksData = await getTracksByGenre(selectedGenre);
    if (tracksData && tracksData.length > 0) {
      setTracks(tracksData);
      setCurrentTrack(tracksData[0]);
    } else {
      setError(`No se encontraron canciones del género "${selectedGenre}".`);
    }
  };
  const handleFavorite = async (track) => {
    if (!track?.id) {
      console.error("🚨 Error: Track sin ID válido.");
      return;
    }

    const currentLikes = Number(track.likes) || 0;
    const updatedLikes = Math.min(currentLikes + 1, 9999999); // Máximo permitido

    console.log(
      `🔍 Canción: ${track.name} (ID: ${track.id}) → Likes actuales: ${currentLikes}`
    );
    console.log(`🛠 Nuevo número de likes que se enviará: ${updatedLikes}`);

    const updatedTrack = {
      id: track.id,
      name: track.name || "Desconocido",
      likes: updatedLikes,
    };

    try {
      // Guardar en Supabase
      const { error } = await supabase
        .from("topRatedTracks")
        .upsert([updatedTrack]);

      if (error) {
        throw new Error(
          `Error al actualizar el ranking en Supabase: ${error.message}`
        );
      }

      console.log("🛠 Respuesta de Supabase:", updatedTrack);

      // 🛠 ACTUALIZAR EL ESTADO DIRECTAMENTE CON LOS NUEVOS DATOS
      setTopRated((prevTracks) =>
        prevTracks.map((t) =>
          t.id === track.id ? { ...t, likes: updatedLikes } : t
        )
      );

      // ⚡ Refrescar la data desde Supabase para garantizar que la UI se actualice
      const { data: rankingData, fetchError } = await supabase
        .from("topRatedTracks")
        .select("id, name, likes")
        .order("likes", { ascending: false })
        .limit(20);

      if (fetchError) {
        throw new Error(
          `Error al recuperar el ranking actualizado: ${fetchError.message}`
        );
      }

      setTopRated(rankingData);
      console.log("✅ Ranking actualizado correctamente.");
    } catch (error) {
      console.error("🚨 Error al manejar el voto:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: "20px",
      }}
    >
      {/* Contenedor principal del reproductor */}
      <div style={{ flex: "1", marginRight: "20px", textAlign: "center" }}>
        <h3>Reproductor de Música</h3>
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setIsVisible(!isVisible)}
            style={{
              padding: "10px",
              backgroundColor: isVisible ? "#FF0000" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {isVisible ? "Ocultar Reproductor" : "Mostrar Reproductor"}
          </button>
        </div>
        {/* Reproductor de audio (siempre activo) */}
        {currentTrack && (
          <audio
            controls
            autoPlay
            src={currentTrack.audio}
            style={{ marginBottom: "20px" }}
          >
            Tu navegador no soporta el elemento de audio.
          </audio>
        )}
        {isVisible && (
          <div>
            <p
              style={{ fontSize: "14px", color: "white", marginBottom: "20px" }}
            >
              <strong>¡Dale voz a los artistas independientes!</strong> Toda la
              música disponible en esta plataforma es ofrecida a través de{" "}
              <a
                href="https://www.jamendo.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jamendo
              </a>
              , apoyando a artistas independientes de todo el mundo. Cada clic
              ayuda a que sus obras sean escuchadas y valoradas.
            </p>

            {/* Mostrar errores si ocurren */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Buscar por artista con autocompletado */}
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <input
                type="text"
                value={artistName}
                onChange={(e) => handleArtistInput(e.target.value)}
                placeholder="Buscar por artista"
                style={{
                  padding: "0.5rem",
                  width: "250px",
                  marginRight: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
              {artistSuggestions.length > 0 && (
                <ul
                  style={{
                    position: "absolute",
                    top: "40px",
                    left: "0",
                    width: "250px",
                    background: "white",
                    border: "1px solid #ccc",
                    listStyleType: "none",
                    padding: "10px",
                    margin: 0,
                    zIndex: 1000,
                  }}
                >
                  {artistSuggestions.map((artist) => (
                    <li
                      key={artist.id}
                      style={{ padding: "5px", cursor: "pointer" }}
                      onClick={() => handleSearchByArtist(artist)}
                    >
                      {artist.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Buscar por género con menú desplegable */}
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <button
                onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {isGenreDropdownOpen ? "Cerrar Géneros" : "Seleccionar Género"}
              </button>
              <p style={{ marginTop: "10px" }}>
                Género seleccionado: <strong>{genre || "Ninguno"}</strong>
              </p>

              {isGenreDropdownOpen && genreSuggestions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "40px",
                    left: "0",
                    width: "300px",
                    backgroundColor: "rgba(240, 240, 240, 0.9)",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                    zIndex: 1000,
                    padding: "10px",
                  }}
                >
                  <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                    {genreSuggestions.map((suggestedGenre, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleSearchByGenre(suggestedGenre); // Llama directamente a la función para buscar canciones
                          setIsGenreDropdownOpen(false); // Cierra el desplegable
                        }}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          backgroundColor:
                            genre === suggestedGenre ? "#cce5ff" : "#FFFFFF", // Resalta el género seleccionado
                          borderBottom:
                            index !== genreSuggestions.length - 1
                              ? "1px solid #ccc"
                              : "none",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#f0f0f0")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor =
                            genre === suggestedGenre ? "#cce5ff" : "#FFFFFF")
                        }
                      >
                        {suggestedGenre}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Reproductor de la canción actual */}
            {currentTrack ? (
              <div>
                <h4>{currentTrack.name}</h4>
              </div>
            ) : (
              <p>Cargando música...</p>
            )}

            {/* Lista de canciones disponibles */}
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {tracks.map((track) => (
                <li key={track.id} style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => setCurrentTrack(track)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Reproducir {track.name}
                  </button>
                  <button
                    onClick={() => handleFavorite(track)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      backgroundColor: "#FF0000",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    ❤️
                  </button>
                </li>
              ))}
            </ul>
            {/* Mostrar listado de las canciones más valoradas */}
            {topRated.length > 0 && (
              <div style={{ marginTop: "30px" }}>
                <h4>Las 15 canciones más valoradas</h4>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {topRated.map((track) => (
                    <li key={track.id} style={{ marginBottom: "10px" }}>
                      {track.name} - ❤️ {track.likes} likes
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sección lateral derecha */}
      {isVisible && (
        <div
          style={{
            flex: "0 0 300px",
            backgroundColor: "rgba(247, 244, 240, 0.7)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4 style={{ textAlign: "center" }}>🎤 Próximos Eventos Musicales</h4>
          <p style={{ fontSize: "14px", color: "#555" }}>
            ¡Participa en conciertos virtuales organizados por artistas
            independientes! Dale clic a los enlaces para más información:
          </p>
          <ul
            style={{ listStyleType: "none", padding: 0, textAlign: "center" }}
          >
            <li>
              <a
                href="https://evento-ejemplo.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007BFF" }}
              >
                🎶 Evento: Ritmos Renovables - 15 de Abril
              </a>
            </li>
            <li>
              <a
                href="https://evento-ejemplo.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007BFF" }}
              >
                🎶 Concierto Indie Global - 22 de Abril
              </a>
            </li>
          </ul>

          <h4 style={{ textAlign: "center", marginTop: "20px" }}>
            📈 Ranking de Canciones Más Valoradas
          </h4>
          {topRated.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {topRated.map((track, index) => (
                <li key={track.id} style={{ marginBottom: "10px" }}>
                  {index + 1}. {track.name} - ❤️ {track.likes} likes
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: "center", fontSize: "14px", color: "#555" }}>
              ¡Aún no hay canciones en el ranking! Haz clic en el corazón para
              valorar tus favoritas.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
