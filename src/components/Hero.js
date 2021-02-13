import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/data'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'


const Hero = () => {
    
    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)
    let c = useRef(null)
    let d = useRef(null)
    gsap.registerPlugin(CSSPlugin)
   
    const [current, setCurrent] = useState(0)
    const length = products.length
    const timeout = useRef(null)

    useEffect(() => {
        
        const nextSlide = () => {
            setCurrent(current === length - 1 ? 0 : current + 1)
        }
        timeout.current = setTimeout(nextSlide, 5000)

        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
        
    }, [current, length])

    useEffect(() => {
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a, b, c, d ], .8, {opacity: 0, x: 5, ease: Power3.easeInOut}, .2)
    }, [])

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    if (!Array.isArray(products) || products.length <= 0) {
        return null
    }

    return (
        <div className='hero-carousel' ref={el => con = el}>
            <h1 ref={el => a = el}>Break A Sweat, Not The Planet</h1>
            <Link to='/products'><button ref={el => b = el} className='hero-carousel--btn' >Shop Now</button></Link>
            <div className='hero-carousel__left-arrow' onClick={prevSlide}>
                <i className="fas fa-arrow-circle-left" ref={el => c = el}></i>
            </div>
            <div className='hero-carousel__right-arrow' onClick={nextSlide}>
                <i className="fas fa-arrow-circle-right" ref={el => d = el}></i>
            </div>
            {products.map((item, index) => {
                return (
                    <div className={index === current ? 'hero-carousel__slider--active' : 'hero-carousel__slider'} key={index}>
                        {index === current && (
                            <>
                                <img src={item.image} alt="item" className='hero-carousel___slider--img' />

                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Hero
