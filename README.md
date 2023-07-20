This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Movie Match
## Project built by Joseph Song

Check out the deployed website at: [Movie Match](https://movie-match-gamma.vercel.app/)

![Screenshot of Movie Match website](https://github.com/JosephMinSong/Movie_Match/assets/129890601/1e180845-6350-4aa6-9967-ba095a5506f8)

### For those days where you sincerely cannot decide on what movie to watch with friends, family, or significant others - Movie Match has got you covered

Movie Match is an interactive website that allows you to choose from a diverse list of movie genres. Using your input, Movie Match will generate a list of movies that match your preferences.

![Screenshot of Genre picker](https://github.com/JosephMinSong/Movie_Match/assets/129890601/aae77a9f-93e9-4022-8892-f1b287f48986)

Using Framer-Motion and State in React, Movie Motion creates a single page result container that is interactive with user hover and clicks **without multiple page reloads**. Users who have either created an account with
us or logged in using their Google account are able to then favorite the movies that interest them. 

```js
const handleFavorite = (movieId, genreIdArray, backdrop_path, title, description) => {

    setLogInError()

    if (!session){
        setLogInError({message : "You must be logged in to favorite movies!"})
        document.getElementById('title').scrollIntoView({ behavior:'smooth', block:'end', inline:'nearest' })
        return false
    }
        

    setErrors()
    setSuccess()

    const data = {
        movieId : movieId,
        categories : genreIdArray,
        id : session.user.id,
        posterPath : backdrop_path,
        title: title,
        description : description
    }

    fetch('api/likes' , {method: "POST", body : JSON.stringify(data)})
        .then(res => res.json())
        .then(data => {
            if (data.hasOwnProperty('error')){
                setErrors(data)
            } else {
                setSuccess(data)
            }
        })
        .catch(err => console.log(err))
}
```

Leveraging Next.JS severless functionality and intuitive API calls, Movie Match utilizes MongoDB and Mongoose for fast and reliable user infomation fetching and storing. 
By exporting a handler function, Movie Match is able to handle all of the user input and functionality into one route using RESTful naming conventions. 

```js
const handler = async (req) => {

    await connectToDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') 
    const deleteId = searchParams.get('movie_id') 

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
            const deleteMovieUser = await User.updateOne({ _id : id }, { $pull : { likedMovies : deleteId } })
            return NextResponse.json({success:true})

    }
}

export { handler as GET, handler as POST, handler as DELETE }
```



