import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutStep from '../components/CheckoutStep'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'
import { PayPalButton } from 'react-paypal-button-v2'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constant/orderConstants'
import Loader from '../components/Loader'
import { CART_ITEM_RESET } from '../constant/cartConstants'
import { toast } from 'react-toastify'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

const OrderScreen = ({ history, match }) => {

    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)
    gsap.registerPlugin(CSSPlugin)

    toast.configure()

    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))

        order.shippingPrice = addDecimals(order.itemPrice > 100 ? 0 : 100)

    }
    const dispatch = useDispatch()


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('https://mern-ecom-app.herokuapp.com/api/config/paypal')
            console.log(clientId)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = async() => {
               await setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver) {
            dispatch({ type: CART_ITEM_RESET })
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

        if(loading) {
            addPayPalScript()
        }


    }, [dispatch, orderId, successPay, userInfo, order, successDeliver, history, setSdkReady])

    useEffect(() => {
        if(!loading) {
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a, b ], .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
        }
    }, [loading])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


    return (

        loading  ? <Loader /> : error ? console.log(error) :
            <>
                <Meta title='Order Summary' />
                <Navbar />
                {loadingDeliver && <Loader />}
                {loadingPay && <Loader />}
                {successPay ? (<CheckoutStep />) : (<CheckoutStep step1 step2 step3 step4 />)}
                <div className='order' ref={el => con = el}>
                    <div className='order__container' ref={el => a = el}>
                        <h1>Order:<span>{order._id}</span></h1>
                        <h2>Shipping Details</h2>
                        <div className='order__shipping' >
                            <p>Name: {order.user.name}</p>
                            <p>Email: {order.user.email}</p>
                            <p>Address: {order.shippingAddress.address} {order.shippingAddress.city} {order.shippingAddress.province} </p>
                            <div className='order__shipping--status'>
                                <p>Status: {order.isDelivered ? `Delivered on ${order.deliveredAt.substring(0, 10)}` : (<p>Not Delivered</p>)}</p> {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <button onClick={deliverHandler}>Mark as Delivered </button>)}</div>
                        </div>
                        <div className='order__payment' ref={el => con = el}>
                            <p>Payment Method: {order.paymentMethod}</p>
                            <p>Status: {order.isPaid ? 'Paid on ' + order.paidAt.substring(0, 10) : 'Not Paid'}</p>
                        </div>
                        {order.orderItems.map((item, index) => {
                            return (
                                <div className='order__item' key={index}>
                                    <div className='order__item--img'>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className='order__item--details'>
                                        <h1>{item.name}</h1>
                                        <p>{item.category}</p>
                                    </div>
                                    <div className='order__item--quantity'>
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
                                    <div className='order__item--price'>$ {item.price}</div>
                                </div>

                            )
                        })}
                    </div>
                    <div className='order__subtotal' ref={el => b = el}>
                        <h1>Order Summary</h1>
                        <p>Items Price: <span>$ {order.itemPrice}</span></p>
                        <p>Shipping: <span> $ {order.shippingPrice}</span></p>
                        <p>Tax: <span> $ {order.taxPrice}</span></p>
                        <p>Total: <span>$ {order.totalPrice}</span></p>
                        {
                            !order.isPaid && (
                                sdkReady && <PayPalButton amount={
                                    order.totalPrice
                                }
                                    onSuccess={successPaymentHandler} />
                            )
                        }

                    </div>

                </div>
            </>
    )

}

export default OrderScreen