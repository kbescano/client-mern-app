import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

const RegisterScreen = ({ location, history }) => {

    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)

    gsap.registerPlugin(CSSPlugin)

    toast.configure()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const { loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    useEffect(() => {
        if(!loading) {
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a, b ], .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
        }
    }, [loading])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password === confirmPassword) {
            dispatch(register(name, email, password))
        } else {
            toast.error(`Invalid Email or Password!`)
        }
        
    }

    return (
        <>
            <Meta title='Welcome to Shop || Register' />
            <Navbar />
            {loading && <Loader />}
            <div className='register'>
                <div className='register__main' ref={el => con = el}>
                    <div className='register__main--img'>
                        <img ref={el => a = el} src='/images/login.jpg' alt="shopping" />
                    </div>
                    <div className='register__main--content' ref={el => b = el}>
                        <h1>Create your Account</h1>
                        <form onSubmit={submitHandler}>
                            <div className='register__main--content--input'>
                                <label>Email</label>
                                <input type="email" placeholder='Enter your email address' value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='register__main--content--input'>
                                <label>Full name</label>
                                <input type="text" placeholder='Enter your full name' value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='register__main--content--input'>
                                <label>Password</label>
                                <input type="password" placeholder='Type your password' value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='register__main--content--input'>
                                <label>Confirm Password</label>
                                <input type="password" placeholder='Confirm your password' value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className='register__main--content--account'>
                                <p>Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='register__main--content--account-sign' style={{ color: '#F93943' }}>Sign In</Link></p>
                            </div>
                            <div className='register__main--content--button'>
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterScreen
