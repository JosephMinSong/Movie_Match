"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence, Reorder, motion } from "framer-motion"
import Link from "next/link"

export default function My_Movies() {
    const searchParams = useSearchParams('id')
    const [favMovies, setFavMovies] = useState([])

    useEffect( () => {

        const userId = searchParams.get('id')

        fetch(`api/likes?id=${userId}`, {method : 'GET'})
            .then(res => res.json())
            .then(data => setFavMovies(JSON.parse(data)))
            .catch(err => console.log(err))

    }, [] )

    const handleDelete = (id) => {

        const userId = searchParams.get('id')

        fetch(`api/likes?id=${userId}&movie_id=${id}`, {method: 'DELETE'})
            .then(res => console.log(res))
            .catch(err => console.log(err))

        setFavMovies(current => current.filter(movie => movie._id != id))

    }

    return (
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
            >
                Your Favorite Movies: 
            </motion.h1>
            
            <Reorder.Group values={favMovies} onReorder={setFavMovies} className="movie_container">
            <AnimatePresence>
                {favMovies.length ? favMovies.map((movie, i) => {

                    const backgroundImg = {
                        backgroundImage : `url('https://image.tmdb.org/t/p/original${movie.posterPath}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }

                    return (
                        <Reorder.Item
                            className="movie_card_result flex flex-col " 
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
                            exit={{
                                opacity: 0,
                                y: -50
                            }}
                        >
                            <div className="card_content">
                                <h3 className="text-center text-3xl font-extrabold">{ movie.title }</h3>
                                <p> { movie.description } </p>
                                <motion.button
                                    initial={{
                                        scale: 0
                                    }}
                                    animate={{
                                        scale: 1
                                    }}
                                    transition={{
                                        duration: 1
                                    }}
                                    whileHover={{
                                        scale: 1.4
                                    }}
                                    className="fav_btn"
                                    onClick={() => handleDelete(movie._id)}
                                >
                                    Delete
                                </motion.button>
                            </div>
                        </Reorder.Item>
                    )
                })
            :
            <motion.div 
                className="flex flex-col text-center justify-center"
                initial={{
                    scale: 0
                }}
                animate={{
                    scale: 1
                }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                    duration: 1,
                    delay: 1
                }}
                exit={{
                    scale: 0
                }}
            >
                <h1
                    className="text-4xl font-extrabold text-red-400 mb-5"
                >
                    No movies here yet!
                </h1>
                <h2 className="text-3xl  ">Click 
                    <motion.button
                        whileHover={{
                            scale: 1.3
                        }}
                        transition={{
                            duration: 1,
                            type: 'spring',
                            stiffness: 200,
                            damping: 20
                        }}
                        className="text-3xl bg-white px-3 py-1 rounded-lg font-semibold mx-2 hover:bg-red-400"
                    >
                        <Link href='/movie_match'>HERE</Link>
                    </motion.button> 
                    to get started
                </h2>
            </motion.div>
            }
            </AnimatePresence>
            </Reorder.Group>
        </div>
    )
}