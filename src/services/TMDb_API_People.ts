import { People, PersonWithDetails } from "../types/TMDb_API.types";

const BEARER_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/person";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

export const fetchPopularPeople = async (): Promise<People | null> => {
  try {
    const response = await fetch(`${BASE_URL}/popular`, options);

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: People = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error("Error fetching popular people:", error);
      }
    }

    return null;
  }
};

export const fetchPersonById = async (
  personId: number,
): Promise<PersonWithDetails | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${personId}?append_to_response=credits`,
      options,
    );

    if (!response.ok) {
      throw new Error(
        `API request not ok: ${response.status} ${response.statusText}`,
      );
    }

    const data: PersonWithDetails = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Fetch aborted due to timeout.");
      } else {
        console.error(`Error fetching person with id ${personId}:`, error);
      }
    }

    return null;
  }
};
