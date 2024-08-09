import {
  MovieListResponse,
  MovieListWithDatesResponse,
  MovieWithDetails,
} from "../types/TMDb_API.types";

const BEARER_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/movie";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

export const fetchMoviesNowPlaying =
  async (): Promise<MovieListWithDatesResponse | null> => {
    try {
      const response = await fetch(`${BASE_URL}/now_playing`, options);

      if (!response.ok) {
        throw new Error(
          `API request not ok: ${response.status} ${response.statusText}`,
        );
      }

      const data: MovieListWithDatesResponse = await response.json();

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.error("Fetch aborted due to timeout.");
        } else {
          console.error("Error fetching movies now playing:", error);
        }
      }

      return null;
    }
  };

export const fetchPopularMovies = async (
  page = "1",
): Promise<MovieListResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/popular?page=${page}`, options);

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: MovieListResponse = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching popular movies:", error);
      }
    }

    return null;
  }
};

export const fetchTopRatedMovies = async (
  page = "1",
): Promise<MovieListResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/top_rated?page=${page}`, options);

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: MovieListResponse = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching top rated movies:", error);
      }
    }

    return null;
  }
};

export const fetchUpcomingMovies = async (
  page = "1",
): Promise<MovieListWithDatesResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/upcoming?page=${page}`, options);

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: MovieListWithDatesResponse = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching upcoming movies:", error);
      }
    }

    return null;
  }
};

export const fetchMovieById = async (
  movieId: number,
): Promise<MovieWithDetails | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${movieId}?append_to_response=videos,credits`,
      options,
    );

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: MovieWithDetails = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching movie:", error);
      }
    }

    return null;
  }
};
