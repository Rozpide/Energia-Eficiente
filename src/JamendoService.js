import axios from "axios";

const API_KEY = "6947b4f5"; // Reemplaza con tu clave API de Jamendo
const BASE_URL = "https://api.jamendo.com/v3.0";

// Función para obtener una lista de canciones populares
export const getTracks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tracks`, {
      params: {
        client_id: API_KEY, // Tu clave API
        format: "json", // Formato de respuesta JSON
        limit: 50, // Número de canciones a obtener
         // Ordenar por popularidad
    },
    });
    return response.data.results; // Devuelve los resultados de las canciones
  } catch (error) {
    console.error("Error al obtener las canciones:", error);
    return null; // Devuelve null en caso de error
  }
};
export const getTracksByArtist = async (artistName) => {
    try {
      const response = await axios.get(`${BASE_URL}/tracks`, {
        params: {
          client_id: API_KEY,
          format: "json",
          limit: 10,
          artist_name: artistName, // Filtrar por nombre del artista
        },
      });
      return response.data.results;
    } catch (error) {
      console.error(`Error al buscar canciones del artista "${artistName}":`, error);
      return null;
    }
  };
  
  // Función para filtrar canciones por género
  export const getTracksByGenre = async (genre) => {
    try {
      const response = await axios.get(`${BASE_URL}/tracks`, {
        params: {
          client_id: API_KEY,
          format: "json",
          limit: 50,
          tags: genre, // Filtrar por género
        },
      });
      return response.data.results;
    } catch (error) {
      console.error(`Error al buscar canciones del género "${genre}":`, error);
      return null;
    }
  };
  // Buscar artistas por texto ingresado
export const searchArtists = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/artists`, {
        params: {
          client_id: API_KEY,
          format: "json",
          limit: 10, // Limitar el número de resultados
          name: query, // Filtrar artistas por nombre
        },
      });
      return response.data.results; // Devuelve los artistas encontrados
    } catch (error) {
      console.error("Error al buscar artistas:", error);
      return [];
    }
  };
  
  // Obtener géneros populares (esta lista puede ser personalizada)
  export const getGenres = () => {
    // Lista de géneros predefinidos
    return [
      "rock",
      "pop",
      "jazz",
      "hip hop",
      "classical",
      "electronic",
      "reggae",
      "blues",
    ];
  };
  