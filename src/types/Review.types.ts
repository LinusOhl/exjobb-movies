import { Timestamp } from "firebase/firestore";

export type Review = {
  user: string;
  reviewText: string;
  movieId: number;
  timestamp: Timestamp;
};
