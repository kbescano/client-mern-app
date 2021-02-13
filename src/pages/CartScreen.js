import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Meta from '../components/Meta'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

const CartScreen = ({ match, location, history }) => {

    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)
    let c = useRef(null)
    let d = useRef(null)
    gsap.registerPlugin(CSSPlugin)

    toast.configure()

    const dispatch = useDispatch()

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    const cartQty = cartItems.reduce((acc, item) => acc + item.qty, 0)

    useEffect(() => {
        TweenLite.to(con, 0, {css: {visibility: "visible"}})
        TweenLite.staggerFrom([a, b, c, d], .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
    }, [])


    useEffect(() => {

        if (productId) {
            dispatch(addToCart(productId, qty))
        }

    }, [productId, dispatch, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
        toast.error(`Item has been removed!`)
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <>

            <Meta title='Cart Items' />
            <Navbar cartQty={cartQty} />
            <div className='cart' ref={el => con = el}>
                <div className='cart__container' >
                    <p ref = {el => a = el}>Shopping Cart<span ref = {el => d = el}><Link to='/products'><i className='fas fa-plus'></i></Link></span></p>
                    <div className='cart__container--box'>
                        <div className='cart__container--left'ref = {el => b = el}>
                            {cartItems.length === 0 && (<h1>Your cart is empty...</h1>)}
                            {cartItems.map((item, index) => {
                                return (
                                    <div className='cart__item' key={index}>
                                        <div className='cart__item--img'>
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className='cart__item--details'>
                                            <h1>{item.name}</h1>
                                            <p>{item.category}</p>
                                        </div>
                                        <div className='cart__item--quantity'>
                                            <select value={item.qty} onChange={(e) =>
                                                dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='cart__item--price'>$ {item.price}</div>
                                        <div className='cart__item--remove' onClick={() => removeFromCartHandler(item.product)}><i className='fas fa-trash' style={{ color: 'white' }}></i>Remove</div>
                                    </div>

                                )
                            })}
                        </div>

                        <div className='cart__container--right' >
                            <div className='cart__subtotal' ref = {el => c = el}>
                                <h1>Subtotal ({cartQty})</h1>
                                <p>$ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
                                {cartItems.length === 0 ? (
                                    <button onClick={checkoutHandler} className='cart__subtotal--disabled'>Checkout</button>
                                ) : (
                                        <button onClick={checkoutHandler} className='cart__subtotal--checkout'>Checkout</button>
                                    )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartScreen
