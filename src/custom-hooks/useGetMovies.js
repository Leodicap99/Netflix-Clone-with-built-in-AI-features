import { useDispatch } from "react-redux";
import { addMovies } from "../redux/moviesSlice";
import { useEffect } from "react";
import { options } from "../utils/constants";

function useGetMovies(){
    const dispatch = useDispatch();
    useEffect(()=>{
        

        fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          options
        )
          .then((response) => response.json())
          .then((response) => {
            dispatch(addMovies(response.results));
          })
          .catch((err) => console.error(err));
    },[]);
}
export default useGetMovies;