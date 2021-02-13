import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOrderDetails, listMyOrders } from '../actions/orderActions'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'


const ProfileScreen = ({ history }) => {

    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)

    gsap.registerPlugin(CSSPlugin)

    toast.configure()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)

    const { loading,  user } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const { loading: loadingUpdate } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)

    const { loading: loadingOrders, orders } = orderListMy



    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
                
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

        
    }, [dispatch, history, userInfo, user, orders])

    useEffect(() => {
        if(!loading) {
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a, b ], .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
        }
    }, [loading])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!')
            console.log('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }


    return (
        <>
            <Meta title='Welcome to Shop || Profile' />
            <Navbar />
            {loading && <Loader />}
            {loadingOrders && <Loader />}
            {loadingUpdate && <Loader />}
            <div className='profile' ref={el => con = el}>
                <div className='profile__main'>
                    <div className='profile__main--content' ref={el => a = el}>

                        <form onSubmit={submitHandler}>
                            <h1>User Profile</h1>
                            <div className='profile__main--content--input'>
                                <label>Email</label>
                                <input type="email" placeholder='Enter your email address'
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='profile__main--content--input'>
                                <label>Full name</label>
                                <input type="text" placeholder='Enter your full name'
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='profile__main--content--input'>
                                <label>Password</label>
                                <input type="password" placeholder='Type your password'
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='profile__main--content--input'>
                                <label>Confirm Password</label>
                                <input type="password" placeholder='Confirm your password'
                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className='profile__main--content--button'>
                                <button>Update</button>
                            </div>
                        </form>
                    </div>
                    <div className='profile__main--order' ref={el => b = el}>
                        <table>
                            <thead>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </thead>

                            <tbody>
                                {orders && (
                                    orders.map((order, index) => (
                                        <tr key={index}>
                                            <td data-label="Order ID">
                                            <Link to={`/orders/${order._id}`} onClick={() => dispatch(getOrderDetails(order._id))}>{order._id.substring(9, 25)}</Link>
                                            </td>
                                            <td data-label="Date">{order.createdAt.substring(0, 10)}</td>
                                            <td data-label="Total">$ {order.totalPrice}</td>
                                            <td data-label="Paid">{order.isPaid === true ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                                            <td data-label="Delivered">{order.isDelivered === true ? <i className='fas fa-check' /> : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </>
    )
}

export default ProfileScreen
