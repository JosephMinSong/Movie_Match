"use server"

// Get Genres 
export async function getGenres() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
        }
    }

    const res = await fetch(url, options)
    return res.json()
}


// Get movies
export async function getMovies(genreList) {
    let result = genreList.join('%2C')

    const url = 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=' + result

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
        }
    }

    const res = await fetch(url, options)
    return res.json()
}