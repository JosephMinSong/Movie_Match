import MovieResults from "@components/MovieResults"
import { getMovies } from "@services/movieServices"


export default function Movie_Result({ session }) {

    

    return (
        <>
            <MovieResults getMovies={ getMovies } />
        </>
    )
}