import { Route, Routes } from "react-router-dom";
import "./assets/css/index.css";
import AiringSeriesPage from "./pages/AiringSeriesPage";
import HomePage from "./pages/HomePage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import MoviePage from "./pages/MoviePage";
import PersonPage from "./pages/PersonPage";
import PopularMoviesPage from "./pages/PopularMoviesPage";
import PopularSeriesPage from "./pages/PopularSeriesPage";
import ProfilePage from "./pages/ProfilePage";
import SearchMoviesPage from "./pages/SearchMoviesPage";
import SearchPeoplePage from "./pages/SearchPeoplePage";
import SearchSeriesPage from "./pages/SearchSeriesPage";
import SeriesPage from "./pages/SeriesPage";
import SignupPage from "./pages/SignupPage";
import TopMoviesPage from "./pages/TopMoviesPage";
import TopSeriesPage from "./pages/TopSeriesPage";
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import Navigation from "./pages/partials/Navigation";
import { Container } from "@chakra-ui/react";

const App = () => {
  return (
    <div id="App">
      <Navigation />

      <Container maxW={"container.lg"}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />

          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/leaderboards" element={<LeaderboardsPage />} />

          <Route path="/movies">
            <Route index element={<SearchMoviesPage />} />
            <Route path="popular" element={<PopularMoviesPage />} />
            <Route path="upcoming" element={<UpcomingMoviesPage />} />
            <Route path="top" element={<TopMoviesPage />} />
            <Route path=":id" element={<MoviePage />} />
          </Route>

          <Route path="/tv-series">
            <Route index element={<SearchSeriesPage />} />
            <Route path="popular" element={<PopularSeriesPage />} />
            <Route path="airing" element={<AiringSeriesPage />} />
            <Route path="top" element={<TopSeriesPage />} />
            <Route path=":id" element={<SeriesPage />} />
          </Route>

          <Route path="/people">
            <Route index element={<SearchPeoplePage />} />
            <Route path=":id" element={<PersonPage />} />
          </Route>

          <Route path="*" element={""} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
