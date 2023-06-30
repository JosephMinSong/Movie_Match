"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, Reorder } from "framer-motion"
import { useSession } from "next-auth/react"

export default function Movie_Results({ params, getMovies }) {

    const [allMovies, setAllMovies] = useState([])
    const [errors, setErrors] = useState()
    const [success, setSuccess] = useState()
    const [logInError, setLogInError] = useState()
    const [descVisible, setDescVisible] = useState()

    const searchParams = useSearchParams()

    useEffect( () => {
        const genreIdList = searchParams.getAll('genre')
        
        getMovies(genreIdList)
            .then(res => setAllMovies(res.results))
            .catch(err => console.log(err))
    }, [] )

    const { data : session } = useSession()

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

    return(
        <div>
            <motion.h1
                initial={{
                    scale: 0,
                    y: -20
                }}
                animate={{
                    scale: 1,
                    y: 0
                }}
                transition={{
                    duration: 2,
                    type: 'spring',
                    stiffness: 100,
                    damping: 10
                }}
                className="text-4xl font-extrabold text-white text-center mb-9 lg:text-8xl md:text-6xl"
                id='title'
            >
                Your Search Results: 
            </motion.h1>

            {logInError &&
                <AnimatePresence>
                <motion.h1
                    initial={{
                        x: -100
                    }}
                    animate={{
                        x:0
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 5,
                        duration: 2
                    }}
                    className="flex text-5xl text-red-500 font-extrabold mb-5 error_message text-center justify-center"
                    id='login_error_message'
                >
                    { logInError.message }
                </motion.h1>
                </AnimatePresence>
            }

            <div className='movie_container'>
                {allMovies && allMovies.map((movie, i) => {

                    const backgroundImg = {
                        backgroundImage : `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }

                    return (
                        <motion.div 
                            className="movie_card flex flex-col " 
                            style={backgroundImg} 
                            key={ movie.id }
                            initial={{
                                opacity: 0,
                                y: 100
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                duration: 1,
                                delay: 0 + i * 0.1
                            }}
                            onMouseOver={() => setDescVisible({movieId : movie.id})}
                            onMouseOut={() => setDescVisible()}
                        >
                            <div className="card_content">
                                {errors?.movie_id == movie.id && 
                                <AnimatePresence>
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: 50
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            type: 'spring',
                                            stiffness: 200,
                                            damping: 10
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 50
                                        }}
                                        className="text-red-600 font-extrabold text-xl text-center"
                                    >
                                        {errors.error}
                                    </motion.p>
                                </AnimatePresence>
                                }
                                {success?.movie_id == movie.id && 
                                <AnimatePresence>
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: 50
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            type: 'spring',
                                            stiffness: 200,
                                            damping: 10
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 50
                                        }}
                                        className="text-green-600 font-extrabold text-2xl text-center"
                                    >
                                        {success.success}
                                    </motion.p>
                                </AnimatePresence>
                                }
                                <h3 className="text-center text-3xl font-extrabold">{ movie.title }</h3>
                                <AnimatePresence>
                                {descVisible?.movieId == movie.id &&
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: 100
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        transition={{
                                            duration: 0.25
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 100
                                        }}
                                    > 
                                        { movie.overview } 
                                    </motion.p>
                                }
                                </AnimatePresence>

                                <motion.button
                                    initial={{
                                        scale: 0
                                    }}
                                    animate={{
                                        scale: 1
                                    }}
                                    transition={{
                                        duration: 0.2
                                    }}
                                    whileHover={{
                                        scale: 1.4
                                    }}
                                    whileTap={{
                                        scale: 0.5
                                    }}
                                    className="fav_btn"
                                    onClick={() => handleFavorite(movie.id, movie.genre_ids, movie.backdrop_path, movie.title, movie.overview)}
                                >
                                    Favorite
                                </motion.button>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}