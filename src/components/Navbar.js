import React, { useState , useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import {toast} from 'react-toastify'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import {bg} from '../data/data'

const Navbar = ({ color, text }) => {

  let con = useRef(null)
  let a = useRef(null)
  let b = useRef(null)
  gsap.registerPlugin(CSSPlugin)

  toast.configure()

  const dispatch = useDispatch()

  const [click, setClick] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const userLogin = useSelector(state => state.userLogin)

  const { userInfo } = userLogin

  const cart = useSelector(state => state.cart)

  const { cartItems } = cart

  const cartQty = cartItems.reduce((acc, item) => acc + item.qty, 0)

  useEffect(() => {
    TweenLite.to(con, 0, {css: {visibility: "visible"}})
    TweenLite.staggerFrom([a,  b], .8, {opacity: 0, y: 5, ease: Power3.easeInOut}, .2)
  }, [])

  const dropHandler = () => {
    if (dropdown === true) {
      setTimeout(() => {
        setDropdown(false)
      }, 4000);
    }
    setDropdown(!dropdown)
  }

  const handleClick = () => {
    setClick(!click)
  }

  const logoutHandler = () => {
    dispatch(logout())
   
  }

  return (
    <>
      <header style={{ backgroundColor: color }} ref={el => con = el}>
        <img className='bg1' src={bg[0].image} alt="background-image" />
        <nav className='nav' style={{ backgroundColor: color }}>
          <Link to='/' className='nav__logo' style={{ color: text }} ref={el => a = el}>Cosmically 
          <span ref={el => b = el}>Conscious</span></Link>
          <div className='nav__links' >
            <Link to='/products'><p style={{ color: text }}>Products</p></Link>
            <Link to='/cart'><p style={{ color: text }}><i className='fas fa-cart-plus' />Cart
        {cartItems.length > 0 ? <span>({cartQty})</span> : ''}
            </p></Link>
            {userInfo && (
              <div className='nav__links--dropdown'>
                <button style={{ color: text, backgroundColor: color }} onMouseEnter={dropHandler}>{userInfo.name}
                  <i className='fas fa-caret-down' /></button>
                {dropdown && (<ul onMouseLeave={() => setDropdown(false)}>
                  <Link to='/profile'>Profile</Link>
                  {userInfo.isAdmin && (
                    <>
                      <Link to='/admin/userlist'>User list</Link>
                      <Link to='/admin/productlist'>Product list</Link>
                    </>
                  )}
                </ul>)}
              </div>
            )}
            {userInfo ? (<Link to='/login'><button className='nav__links--button' onClick={logoutHandler}>Logout</button></Link>) :
              <Link to='/login'><button className='nav__links--button'>Login</button></Link>
            }

          </div>
          <div className='nav__menu' onClick={handleClick} ><i className={click ? 'fas fa-times' : 'fas fa-bars'} style={{ color: text }} /></div>
        </nav>
        {!click ? (<div></div>) : (
          <section className={click ? 'sidebar active' : 'sidebar'}>
            <div className='sidebar__links--x' onClick={handleClick}><i className='fas fa-times' /></div>
            <div className='sidebar__links'>
              <Link to='/products'><p>Products</p></Link>
              <Link to='/cart'><p style={{ color: text }}><i className='fas fa-cart-plus' />Cart
          {cartItems.length > 0 ? <span>({cartQty})</span> : ''}
              </p></Link>
              {userInfo && (
                <div className='sidebar__links--dropdown'>
                  <button style={{ color: text, backgroundColor: color }} onMouseEnter={dropHandler}>{userInfo.isAdmin ? 'Admin' : userInfo.name}<i className='fas fa-caret-down' /></button>
                  {dropdown && (<ul onMouseLeave={() => setDropdown(false)}>
                    <Link to='/profile'>Profile</Link>
                    {userInfo.isAdmin && (
                      <>
                        <Link to='/admin/userlist'>User list</Link>
                        <Link to='/admin/productlist'>Product list</Link>
                      </>
                    )}
                  </ul>)}
                </div>
              )}
              {userInfo ? (<Link to='/login'><button className='sidebar__links--button' onClick={logoutHandler}>Logout</button></Link>) :
                (<Link to='/login'><button className='sidebar__links--button'>Login</button></Link>)}
            </div>
          </section>
        )}
      </header>
    </>
  )
}

export default Navbar
