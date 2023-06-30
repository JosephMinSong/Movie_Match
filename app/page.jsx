"use client"

import Info from '@components/Info'
import Title from '@components/Title'


export default function Home() {
    return (
        <section className="w-full flex-center flex-col">

            <Title />

            <Info />

        </section>
    )
}

// prio matched, if all matches = see if movies have all three
// permutation of 1,2,3 => 1,2 => 1,3 => 2,3 
// keep track were suggested and what their opinions were
// tie outcomes to group, not individual user in db 