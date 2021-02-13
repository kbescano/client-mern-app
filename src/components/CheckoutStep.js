import React , {useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

const CheckoutStep = ({step1, step2, step3, step4}) => {


    let a = useRef(null)
    gsap.registerPlugin(CSSPlugin)
  

    useEffect(() => {
        TweenLite.to(a, 0, {css: {visibility: "visible"}})
        TweenLite.from(a, .8, {opacity: 0, y: 5, ease: Power3.easeInOut}, .2)
    }, [])

    return (
        <div className='checkout' ref={el => a = el}>
            {
            step1 ? (
                <div className='checkout__step'>
                    <Link to='/login' className='checkout__step--active'>Sign In</Link>
                </div>
            ) : (
                <div className='checkout__step' >
                    <p className='checkout__step--disabled'>Sign In</p>
                </div>
            )
        }
            {
            step2 ? (
                <div className='checkout__step'>
                    <Link to='/shipping' className='checkout__step--active'>Shipping</Link>
                </div>
            ) : (
                <div className='checkout__step'>
                    <p className='checkout__step--disabled'>Shipping</p>
                </div>
            )
        }
            {
            step3 ? (
                <div className='checkout__step' >
                    <Link to='/payment' className='checkout__step--active'>Payment</Link>
                </div>
            ) : (
                <div className='checkout__step'>
                    <p className='checkout__step--disabled'>Payment</p>
                </div>
            )
        }
            {
            step4 ? (
                <div className='checkout__step' >
                    <Link to='/placeorder' className='checkout__step--active'>Place Order</Link>
                </div>
            ) : (
                <div className='checkout__step'>
                    <p className='checkout__step--disabled'>Place Order</p>
                </div>
            )
        } </div>
    )
}

export default CheckoutStep


