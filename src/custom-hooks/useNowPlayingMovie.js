import { useDispatch, useSelector } from "react-redux"
import { options } from "../utils/constants";
import { useEffect } from "react";
import { trailerMovie } from "../redux/moviesSlice";

function useNowPlayingMovie( movie_id ) {
  const movies = useSelector((store) => store.movies.trailerMovie);
  const dispatch = useDispatch();
  const getMovieTrailer = async (movie_id) => {
    fetch(
      "https://api.themoviedb.org/3/movie/"+movie_id+"/videos?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const movieTypes = response.results
        const movieTrailer = movieTypes.findIndex((movie)=>movie.type==='Trailer');
        dispatch(trailerMovie(movieTypes[movieTrailer]));
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (!movies) {
      getMovieTrailer(movie_id);
    }
  }, [movies]);
}
export default useNowPlayingMovie