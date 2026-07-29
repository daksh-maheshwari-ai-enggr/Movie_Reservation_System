import apiClient from "./apiClient";

export const getAllMovies = async () => {
  const response = await apiClient.get("/movies");
  return response.data;
};

export const getMovieById = async (id) => {
  const response = await apiClient.get(`/movies/${id}`);
  return response.data;
};