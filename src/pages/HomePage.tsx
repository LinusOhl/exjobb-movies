import MovieCarousel from "../components/MovieCarousel";
import PopularMovieCarousel from "../components/PopularMovieCarousel";
import TopRatedMovieCarousel from "../components/TopRatedMovieCarousel";
import UpcomingMoviesCarousel from "../components/UpcomingMoviesCarousel";

const HomePage = () => {
  return (
    <div>
      <MovieCarousel />

      <PopularMovieCarousel />
      <UpcomingMoviesCarousel />
      <TopRatedMovieCarousel />
    </div>
  );
};

export default HomePage;
