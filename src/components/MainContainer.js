import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";


function MainContainer(){
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if (!movies) return;

    const mainMovie = movies[0];
    if(!mainMovie)return;
    const { original_title, overview, id } = mainMovie;
    return (
        <div >
            <VideoTitle name={original_title} desc={overview}/>
            <VideoBackground movie_id={id}/> 
        </div>
    )
}
export default MainContainer;