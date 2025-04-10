import React, { useState, useEffect } from "react";
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

  const [genreSuggestions] = useState(getGenres()); // Lista estática de géneros
  const [error, setError] = useState(null); // Manejar errores

  useEffect(() => {
    // Cargar canciones populares al inicio
    const fetchTracks = async () => {
      const tracksData = await getTracks();
      if (tracksData) {
        setTracks(tracksData);
        setCurrentTrack(tracksData[0]); // Reproducir la primera canción por defecto
      } else {
        setError("No se pudieron cargar las canciones.");
      }
    };
    fetchTracks();
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
  const handleFavorite = (track) => {
    // Incrementar el número de "likes"
    const updatedTrack = { ...track, likes: (track.likes || 0) + 1 };

    // Actualizar el listado de canciones más valoradas
    setTopRated((prevTopRated) => {
      // Añadir la canción o actualizarla si ya existe
      const existingTrack = prevTopRated.find((t) => t.id === track.id);
      if (existingTrack) {
        return prevTopRated
          .map((t) => (t.id === track.id ? updatedTrack : t))
          .sort((a, b) => b.likes - a.likes);
      } else {
        return [...prevTopRated, updatedTrack]
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 10); // Limitar a las 10 canciones más valoradas
      }
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>Reproductor de Música</h3>
      <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
        <strong>¡Dale voz a los artistas independientes!</strong> Toda la música
        disponible en esta plataforma es ofrecida a través de{" "}
        <a
          href="https://www.jamendo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jamendo
        </a>
        , apoyando a artistas independientes de todo el mundo. Cada clic ayuda a
        que sus obras sean escuchadas y valoradas.
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
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Buscar por género (e.g., rock, pop)"
          style={{
            padding: "0.5rem",
            width: "250px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        {genreSuggestions
          .filter((g) => g.toLowerCase().includes(genre.toLowerCase()))
          .map((suggestedGenre) => (
            <div
              key={suggestedGenre}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              onClick={() => handleSearchByGenre(suggestedGenre)}
            >
              {suggestedGenre}
            </div>
          ))}
      </div>

      {/* Reproductor de la canción actual */}
      {currentTrack ? (
        <div>
          <h4>{currentTrack.name}</h4>
          <audio controls autoPlay src={currentTrack.audio}>
            Tu navegador no soporta el elemento de audio.
          </audio>
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
          <h4>Las 10 canciones más valoradas</h4>
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
  );
};

export default MusicPlayer;
