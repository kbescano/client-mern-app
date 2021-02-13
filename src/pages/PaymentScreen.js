import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import CheckoutStep from '../components/CheckoutStep'
import Meta from '../components/Meta'
import { savePaymentMethod } from '../actions/cartActions'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

const PaymentScreen = ({ history }) => {

    let con = useRef(null)
    let a = useRef(null)
    gsap.registerPlugin(CSSPlugin)

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    useEffect(() => {
        TweenLite.to(con, 0, {css: {visibility: "visible"}})
        TweenLite.from(a, .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <>
            <Meta title='Payment method' />
            <Navbar />
            <CheckoutStep step1 step2 step3 />
            <div className='payment' ref={el => con = el}>
                <div className='payment__main'>
                    <div className='payment__main--content' ref={el => a = el}>
                        <h1>Payment Method</h1>
                        <form onSubmit={submitHandler}>
                            <div className='payment__main--content--input'>
                                <label>Choose</label>
                                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <option value="Paypal" key="Paypal">Paypal</option>
                                    <option value="Creditcard" key="CreditCard">Credit Card</option>
                                </select>
                            </div>
                            <div className='payment__main--content--button'>
                                <button>Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentScreen
