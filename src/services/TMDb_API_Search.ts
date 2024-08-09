import {
  SearchMoviesResult,
  SearchPeopleResult,
  SearchSeriesResult,
} from "../types/TMDb_API.types";

const BEARER_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/search";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

export const fetchSearchMovies = async (
  query: string,
  page = "1",
): Promise<SearchMoviesResult | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie?query=${query}&page=${page}`,
      options,
    );

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: SearchMoviesResult = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching search results for movies:", error);
      }
    }

    return null;
  }
};

export const fetchSearchSeries = async (
  query: string,
  page = "1",
): Promise<SearchSeriesResult | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv?query=${query}&page=${page}`,
      options,
    );

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: SearchSeriesResult = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching search results for series:", error);
      }
    }

    return null;
  }
};

export const fetchSearchPeople = async (
  query: string,
  page = "1",
): Promise<SearchPeopleResult | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/person?query=${query}&page=${page}`,
      options,
    );

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: SearchPeopleResult = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching search results for people:", error);
      }
    }

    return null;
  }
};
