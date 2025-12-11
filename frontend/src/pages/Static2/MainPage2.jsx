import React from 'react'
import { Hero } from './Hero'
import { Hero2 } from './Hero2'
import { Hero3 } from './Hero3'
import { Hero4 } from './Hero4'
import { Footer } from '../../components/Footer'
import { Navbar2 } from '../../components/Navbar2'

export const MainPage2 = () => {
    return (
        <>
            <Navbar2 />
            <Hero />
            <Hero2 />
            <Hero3 />
            <Hero4 />
            <Footer />
        </>
    )
}
