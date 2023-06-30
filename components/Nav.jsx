"use client"

import Link from "next/link"
import Image from 'next/image'
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { motion } from "framer-motion"

export default function Nav() {

    const { data : session } = useSession()

    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)

    useEffect( () => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response)
        }

        setUpProviders()
    }, [] )

    return(
        <nav className="flex w-full mb-6 p-4 justify-around items-center text-center">
            <Link href='/' className="flex gap-2 flex-center flex-1 flex-start items-center">
                <Image 
                    src="/assets/images/movie_logo.png"
                    alt="Movie Match Logo"
                    width={60}
                    height={60}
                    className='logo_img'
                />
                <p className="logo_text"> Movie Match </p>
            </Link>

            <div className="flex gap-2 text-base flex-col flex-1 justify-center text-center items-center">
                <motion.p
                    className="text-white tracking-wide font-semibold"
                >
                    POWERED BY
                </motion.p>
                <Image 
                    src='/assets/images/tmdb_logo.svg'
                    alt="TMDB Logo"
                    width={200}
                    height={75}
                    className=""
                />
            </div>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden md:flex-1 md:justify-end'>
                { session?.user ? (
                    <div className='flex gap-3 md:gap-5 items-center'>
                        <Link href={{ pathname : '/my_movies', query : {id : session.user.id} }} className='black_btn'>
                            My Movies
                        </Link>

                        <button type='button' onClick={signOut} className='outline_btn text-white'>Sign Out</button>

                        <Image 
                            src={ session?.user.image }
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                        />
                    </div>
                ): (
                    <>
                        { providers && 
                            Object.values(providers).map(provider => {
                                return <button 
                                type='button' 
                                key={provider.name} 
                                onClick={() => signIn(provider.id)} 
                                className='black_btn'> 
                                Sign In 
                                </button>
                            })
                        }
                    </>
                ) }
            </div>
            
            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative flex-1 flex-end'>
                {session?.user ? (
                    <div className='flex'>
                        <Image 
                            src={ session?.user.image }
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropDown( prev => !prev )}
                        />

                        {toggleDropDown && (
                            <div className='dropdown'>
                                <Link
                                    href="/profile"
                                    className='dropdown_link'
                                    onClick={ () => setToggleDropDown(false) }
                                >
                                My Profile
                                </Link>

                                <Link
                                    href="/my_movies"
                                    className='dropdown_link'
                                    onClick={ () => setToggleDropDown(false) }
                                >
                                My Movies
                                </Link>

                                <button type='button' onClick={ () => {setToggleDropDown(false); signOut()} } className='mt-2 w-full black_btn'>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ): (
                    <>
                    { providers && 
                        Object.values(providers).map(provider => {
                            return <button 
                            type='button' 
                            key={provider.name} 
                            onClick={() => signIn(provider.id)} 
                            className='black_btn'> 
                            Sign In 
                            </button>
                        })}
                    </>
                )}
            </div>
        </nav>
    )
}