export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export type UpdateProfileFormData = {
  name: string;
  photoFile: FileList;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type User = {
  email: string;
  admin: boolean;
  level: number;
  exp: number;
  watchlists: {
    to_watch: {
      movieId: number;
      movieTitle: string;
      moviePoster: string;
    }[];
    have_watched: {
      movieId: number;
      movieTitle: string;
      moviePoster: string;
    }[];
  };
  reviews: number;
  ratings: {
    movieId: number;
    rating: number;
    movieTitle: string;
    moviePoster: string;
  }[];
  badges: string[];
};
