import { motion } from "framer-motion"

export default function Info() {
    return(
        <div className="flex mx-5 gap-10 mb-20 flex-col md:flex-row">
        <section className="flex-1 glassmorphism mt-16 text-lg font-semibold sm:text-2xl">
            <motion.h1
                className="info_title_text flex-center w-full text-center"
                initial={{
                    opacity:0,
                    y: -50
                }}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 1,
                    delay: 0.5
                }}
            >Welcome to Movie Match
            </motion.h1>
            <motion.p
                initial={{
                    opacity: 0,
                    x:50
                }}
                whileInView={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    duration: 1.5,
                }}
                className="info_desc flex-center"
            >
                Designed for couples, friends, or families who just cannot decide on what to watch! 
            </motion.p>
            <motion.p
                initial={{
                    opacity: 0,
                    x:-50
                }}
                whileInView={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    duration: 1.5,
                }}
                className="info_desc flex-center">
                With Movie Match, take the stress out of navigating through finding something everyone will enjoy
            </motion.p>
        </section>
        <section className="flex-1 glassmorphism mt-16 text-lg font-semibold sm:text-2xl text-center">
            <motion.h1
                className="desc_title_text"
                initial={{
                    opacity:0,
                    y: -50
                }}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 1,
                    delay: 0.5
                }}
            >
                How it works
            </motion.h1>
            <motion.p
                initial={{
                    opacity: 0,
                    x:-50
                }}
                whileInView={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    duration: 1.5,
                }}
                className="info_desc"
                >
                Pick movie genres that you want to watch and we will generate a list of movies that have those categories that you choose. If you're logged in, you can then save those movies to watch or to save for a later time!
            </motion.p>
            <motion.h3
                className="info_desc text-4xl font-semibold"
                initial={{
                    opacity: 0,
                    x:50
                }}
                whileInView={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    duration: 1.5,
                }}
            >
                It's <span className="font-extrabold text-red-500">THAT</span> simple with Movie Match!
            </motion.h3>
        </section>
        </div>
    )
}