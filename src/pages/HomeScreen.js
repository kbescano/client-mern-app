import React from 'react'
import Categories from '../components/Categories'
import Hero from '../components/Hero'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'


const HomeScreen = () => {
    return (
        <>
            <Meta title='Welcome to Shop || Home' />
            <Navbar />
            <Hero />
            <Categories />
        </>
    )
}

export default HomeScreen
