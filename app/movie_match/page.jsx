
import GenreButtons from "@components/GenreButtons"
import { getGenres } from "@services/movieServices"

export default async function Movie_Match() {
    const genreData = await getGenres()
    const genreArray = genreData.genres

    return(
        <>
            <div>
                <GenreButtons genres={ genreArray }/>
            </div>
        </>
    )
}