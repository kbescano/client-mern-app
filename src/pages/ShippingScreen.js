import React, { useState, useEffect , useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutStep from '../components/CheckoutStep'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

const ShippingScreen = ({ history }) => {

    let con = useRef(null)
    let a = useRef(null)

    gsap.registerPlugin(CSSPlugin)

    const cart = useSelector(state => state.cart)

    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')

    useEffect(() => {
        TweenLite.to(con, 0, {css: {visibility: "visible"}})
        TweenLite.from(a, .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
    }, [])

    useEffect(() => {
        if (shippingAddress) {
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setAddress(shippingAddress.province)
        }
    }, [shippingAddress])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, province }))
        history.push('/payment')
    }

    return (
        <>
            <Meta title='Shipping details' />
            <Navbar />
            <CheckoutStep step1 step2 />
            <div className='shipping' ref={el => con = el}>
                <div className='shipping__main' ref={el => a = el}>
                    <div className='shipping__main--content'>
                        <h1>Shipping</h1>
                        <form onSubmit={submitHandler}>
                            <div className='shipping__main--content--input'>
                                <label>Address</label>
                                <input type="text" placeholder='Enter your address' required
                                    value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className='shipping__main--content--input' >
                                <label>City</label>
                                <input type="text" placeholder='Enter your City' required
                                    value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className='shipping__main--content--input'>
                                <label>Province</label>
                                <input type="text" placeholder='Enter your Province' required
                                    value={province} onChange={(e) => setProvince(e.target.value)} />
                            </div>
                            <div className='shipping__main--content--button'>
                                <button>Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShippingScreen
