import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'




const LoginScreen = ({ location, history }) => {

    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)
    gsap.registerPlugin(CSSPlugin)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { loading, userInfo  } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)  
        } 
       
    }, [userInfo, history, redirect])

    useEffect(() => {
        if(!loading) {
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a, b ], .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
        }
    }, [loading])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }



    return (
        <>  
            <Meta title='Welcome to Shop || Login' />
            {loading ? <Loader />  : (
                <>  
                    <Navbar color='#110B11' text='#fff' />
                    <div className='login'>
                        <div className='login__main' ref={el => con = el}>
                            <div className='login__main--img'>
                                <img ref={el => a = el} src='/images/login.jpg' alt="shopping" />
                            </div>
                            <div className='login__main--content' ref={el => b = el}>
                                <h1 >Sign In</h1>
                                <form onSubmit={submitHandler}>
                                    <div className='login__main--content--input'>
                                        <label>Email</label>
                                        <input type="email" placeholder='Enter your email address' value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className='login__main--content--input'>
                                        <label>Password</label>
                                        <input type="password" placeholder='Type your password' value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className='login__main--content--account'>
                                        <p> New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='login__main--content--account-sign' style={{ color: '#F93943' }}>Register</Link></p>
                                    </div>
                                    <div className='login__main--content--button'>
                                        <button>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default LoginScreen
