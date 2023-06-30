import { motion } from "framer-motion"
import Link from "next/link"

export default function Title() {

    return(
    <div className="title">
        
        <motion.h1 
            className="title_text orange_background text-center z-10"
            initial={{
                opacity: 0,
                y: 30
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            transition={{
                type:"spring",
                stiffness: 500,
                duration: 1.2,
                delay: 0.3
            }}>
            Movie Match
        </motion.h1>

        <motion.div 
        className="title_desc text-center"
        initial={{
            opacity: 0,
            y: 30
        }}
        whileInView={{
            opacity: 1,
            y: 0
        }}
        transition={{
            duration: 1.5,
            delay: 1
        }}
        >
            <p>Spend less time deciding</p>
            <p>and more time watching</p>
        </motion.div>

        <motion.button 
            className="start_button"
            initial={{
                scale:0
            }}
            animate={{
                scale:1
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                duration: 1.5,
                delay: 1
            }}
        > 
        <Link href='/movie_match'>Start</Link>
        </motion.button>
    </div>
)}