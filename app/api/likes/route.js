import User from "@models/user";
import Movie from "@models/movie";
import { connectToDB } from "@utils/user_database";
import { NextResponse } from 'next/server'

const handler = async (req) => {

    await connectToDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') //user id
    const deleteId = searchParams.get('movie_id') //movie_id

    switch (req.method){
        case 'POST' : 
            const postBody = await req.json()

            const user = await User.findOne({ _id : postBody.id }).populate('likedMovies').exec()
            if (user){
                console.log('log 1', user.likedMovies, postBody.movieId)
                const movieExists = user.likedMovies.find((movie) => movie.id == postBody.movieId)
                console.log(movieExists)
                if (movieExists) return NextResponse.json({error:'Already in favorites', movie_id : postBody.movieId}, {status : 400})
            }

            const movie = await Movie.create({ id : postBody.movieId, categories : postBody.categories, posterPath : postBody.posterPath, title: postBody.title, description: postBody.description }) // ID FROM API
            user.likedMovies.push(movie._id)
            await user.save()
            return NextResponse.json({success:'Added to favorites', movie_id : postBody.movieId})

        case 'GET' :
            const getUser = await User.findOne({ _id : id }).populate('likedMovies').exec()
            const result = JSON.stringify(getUser.likedMovies)
            return NextResponse.json(result)

        case 'DELETE' :
            const deleteMovieUser = await User.updateOne({ _id : id }, { $pull : { likedMovies : deleteId } }) // ID FROM DB
            return NextResponse.json({success:true})

    }
}

export { handler as GET, handler as POST, handler as DELETE }