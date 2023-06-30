"use client"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function GenreButtons({ genres }) {

    const [genreList, setGenreList] = useState([])
    const [buttonVisible, setButtonVisible] = useState(false)

    const handleGenreButton = (genre) => {
        if (!genreList.includes(genre)){
            setGenreList(current => ([...current, genre]))
        } else {
            setGenreList(current => current.filter(prev => prev != genre))
        }
    }

    useEffect(() => {
        genreList.length ? setButtonVisible(true) : setButtonVisible(false)
    }, [genreList])

    return(
        <>
            {/* ******************* TITLE ********************** */}
            <motion.h1
                className="text-4xl font-extrabold text-white text-center mb-9 lg:text-8xl md:text-6xl"
                initial={{

                }}
            >
                Your preferred genres:  
            </motion.h1>

            {/* ******************* GENRE BUTTONS ************************** */}
            <div className="inline-block text-center mx-1 lg:mx-48 md:mx-16">
                {genres.map((genre, i) => {
                    return <motion.button
                    className="genre_btn "
                    initial={{
                        scale: 0
                    }}
                    animate={{
                        scale: 1
                    }}
                    transition={{
                        duration: 2,
                        type: "spring",
                        stiffness: 70,
                        damping: 10,
                        delay: 0.1 + 0.05 * i
                    }}
                    whileTap={{
                        scale: 0.8
                    }}
                    type='button'
                    key={i}
                    onClick={() => handleGenreButton(genre)}
                    >{ genre.name }
                    </motion.button>
                })}
            </div>

            {/* ****************** USER CHOICES ****************************** */}
            {genreList && 
                <Reorder.Group 
                    values={genreList} 
                    onReorder={setGenreList} 
                    className="user_genre_list"
                >
                    <AnimatePresence>
                        {genreList.map(genre => {
                            return (
                                <Reorder.Item
                                    initial={{
                                        opacity: 0,
                                        y: 20
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    transition={{
                                        type: "spring",
                                        duration: 0.5,
                                        stiffness: 100,
                                        damping: 25
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -20
                                    }}
                                    drag={false}
                                    className="text-3xl text-white text-bold lg:text-5xl md:text-4xl"
                                    key={ genre.name }
                                > {genre.name} 
                                </Reorder.Item>
                                )
                        })}
                    </AnimatePresence>
                </Reorder.Group>
            }

            {/* ***************************SUBMIT AND CLEAR BUTTONS****************************** */}
            {buttonVisible && 
            <AnimatePresence>
                <motion.div className="flex gap-8 justify-center mt-5 md:mt-9">
                    <motion.div 
                        initial={{
                            scale: 0
                        }}
                        animate={{
                            scale: 1
                        }}
                        exit={{
                            scale: 0
                        }}
                        transition={{
                            duration: 2,
                            type: 'spring',
                            stiffness: 100,
                            damping: 10
                        }}
                        whileHover={{
                            scale: 1.2
                        }}
                        className="get_movies_btn"
                        key={'submit_button'}
                    >
                        <Link href={{pathname: '/movie_results', query: {genre : genreList.map(genre => genre.id)}}}>Get Movies!</Link>
                    </motion.div>

                    <motion.button
                        onClick={() => setGenreList([])}
                        initial={{
                            scale: 0
                        }}
                        animate={{
                            scale: 1
                        }}
                        exit={{
                            scale: 0
                        }}
                        transition={{
                            duration: 2,
                            type: 'spring',
                            stiffness: 100,
                            damping: 10
                        }}
                        whileHover={{
                            scale: 1.2
                        }}
                        className="get_movies_btn"
                        key={'clear_button'}
                    >
                        Clear
                    </motion.button>
                </motion.div>
            </AnimatePresence>}

        </>
    )
}