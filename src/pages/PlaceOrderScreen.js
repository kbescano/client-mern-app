import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, getOrderDetails } from '../actions/orderActions'
import CheckoutStep from '../components/CheckoutStep'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import {toast} from 'react-toastify'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

const PlaceOrderScreen = ({ history }) => {

    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)
    gsap.registerPlugin(CSSPlugin)

    toast.configure()

    const cart = useSelector(state => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    cart.itemPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemPrice > 100 ? 0 : 100)

    cart.taxPrice = addDecimals(Number((cart.itemPrice * .15).toFixed(2)))


    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const dispatch = useDispatch()

    const orderCreate = useSelector(state => state.orderCreate)

    const { order, success, loading } = orderCreate


    useEffect(() => {
        if (success) {
            history.push(`/orders/${order._id}`)
            dispatch(getOrderDetails(order._id))
        }
        
        // eslint-disable-next-line
    }, [dispatch,history, success])

    useEffect(() => {
        if(!loading) {
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a, b ], .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
        }
    }, [loading])

    const placeOrderHandler = () => {
            dispatch(createOrder({
                orderItems: cart.cartItems,
                paymentMethod: cart.paymentMethod,
                shippingAddress: cart.shippingAddress,
                itemsPrice: cart.itemPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice
            }))
            
    }


    return (
        <>
            <Meta title='Order Summary' />
            <Navbar />
            {loading && <Loader />}
            <CheckoutStep step1 step2 step3 step4 />
            <div className='placeorder' ref={el => con = el}>
                <div className='placeorder__container' ref={el => a = el}>
                    <h1>Shipping Details</h1>
                    <div className='placeorder__shipping' >
                        <p>Address: {cart.shippingAddress.address} {cart.shippingAddress.city} {cart.shippingAddress.province} </p>
                    </div>
                    <div className='placeorder__payment'>
                        <p>Payment Method: {cart.paymentMethod}</p>
                    </div>
                    {cart.cartItems.map((item, index) => {
                        return (
                            <div className='placeorder__item' key={index}>


                                <div className='placeorder__item--img'>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className='placeorder__item--details'>
                                    <h1>{item.name}</h1>
                                    <p>{item.category}</p>
                                </div>
                                <div className='placeorder__item--quantity'>
                                    <select>
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='placeorder__item--price'>$ {item.price}</div>
                            </div>

                        )
                    })}
                </div>
                <div className='placeorder__subtotal' ref={el => b = el}>
                    <h1>Order Summary</h1>
                    <p>Items: <span>{cart.itemPrice}</span></p>
                    <p>Shipping: <span>{cart.shippingPrice}</span></p>
                    <p>Tax: <span>{cart.taxPrice}</span></p>
                    <p>Total: <span>{cart.totalPrice}</span></p>
                    <button onClick={placeOrderHandler}>Place Order</button>
                </div>
            </div>
        </>
    )

}

export default PlaceOrderScreen
