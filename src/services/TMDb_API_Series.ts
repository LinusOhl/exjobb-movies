import { Series, ShowWithDetails } from "../types/TMDb_API.types";

const BEARER_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/tv";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

export const fetchTVAiringToday = async (): Promise<Series | null> => {
  try {
    const response = await fetch(`${BASE_URL}/airing_today`, options);

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: Series = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching series airing today:", error);
      }
    }

    return null;
  }
};

export const fetchTVOnTheAir = async (page = "1"): Promise<Series | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/on_the_air?page=${page}`,
      options,
    );

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: Series = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching series on the air:", error);
      }
    }

    return null;
  }
};

export const fetchPopularTV = async (page = "1"): Promise<Series | null> => {
  try {
    const response = await fetch(`${BASE_URL}/popular?page=${page}`, options);

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: Series = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching popular series:", error);
      }
    }

    return null;
  }
};

export const fetchTopTV = async (page = "1"): Promise<Series | null> => {
  try {
    const response = await fetch(`${BASE_URL}/top_rated?page=${page}`, options);

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: Series = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching top rated series:", error);
      }
    }

    return null;
  }
};

export const fetchTVSeriesById = async (
  seriesId: number,
): Promise<ShowWithDetails | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${seriesId}?append_to_response=credits`,
      options,
    );

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: ShowWithDetails = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error(`Error fetching tv show with id ${seriesId}:`, error);
      }
    }

    return null;
  }
};
