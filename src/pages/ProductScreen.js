import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { createProductReview, getProductDetails } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constant/productConstants'
import {toast} from 'react-toastify'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

const ProductScreen = ({match, location, history}) => {

    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)
    let c = useRef(null)

    gsap.registerPlugin(CSSPlugin)


    toast.configure()

    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const qty = location.search ? Number(location.search.split('=')[1]): 1

    const productDetails = useSelector(state => state.productDetails)

    const { loading, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const productCreateReview = useSelector( state => state.productCreateReview)
    
    const {loading: loadingCreate, success: successProductReview , error: errorCreate} = productCreateReview


    useEffect(() =>{
        dispatch(getProductDetails(match.params.id)) 
        if(successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

    }, [dispatch, loading, match, successProductReview])

    useEffect(() => {
        if(!loading) {
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a, b, c], .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
        }
    }, [loading])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
        toast.info(`${product.name} has been added to your Cart!`)
    }

    const submithandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview( match.params.id, { rating, comment}))

    }
    return (
        <>  
                <Meta title='View Product'/>
                <Navbar/>
                {loadingCreate && <Loader/>}
                {loading ? <Loader /> : (
                <div className='product__container' ref={el => con = el}>
                         <div className='product'>
                        <div className='product__row' ref = {el => a = el}>
                        <div className='product__row__picture'>
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className='product__row__info' ref={el => b = el}>
                        <div className='product__row__info--name'>
                            {product.name}
                        </div>
                            <div className='product__row__info--details'>
                                <p>Price:    $ {product.price}</p>
                                <p>{product.countInStock > 0 ? 'Stocks: ' : 'No stocks Available' }{product.countInStock > 0 && product.countInStock}</p>
                            </div>
                            <div className='product__row__info--description'>
                            <Rating value={product.rating}  text={product.numReviews === 1 ? `${product.numReviews} review` : product.numReviews === 0 ? `0 reviews` : ` ${product.numReviews} reviews`} />
                            </div>
                            <div className='product__row__info--buy'>
                                <button onClick={addToCartHandler}>
                                    <i className='fas fa-cart-plus'/>
                                    Add to Cart
                              </button>
                            </div>
                            </div>
                            </div>
                         
                            <div className='radio' ref={el => c = el}>
                                <input type="radio" name='radio__tabs' id='radio__one' defaultChecked/>
                                <label htmlFor='radio__one'>About</label>
                                <input type="radio" name='radio__tabs' id='radio__two' />
                                <label htmlFor='radio__two'>Review</label>
                            
                            <div className='radio__tabs'>
                                <div className='radio__tabs--about'>
                                    <p> {product.description} </p>
                                </div>
                                <div className='radio__tabs--review'>
                                    {product.reviews && product.reviews.length === 0 && (<h1>No Reviews</h1>)}
                                    <div className='radio__tabs--review--details'>
                                    {userInfo ? (
                                    <form onSubmit={submithandler}>
                                        <h1>Write a Review</h1>
                                        <div>
                                        <p><i className='fas fa-star'/><i className='fas fa-star'/><i className='fas fa-star'/><i className='fas fa-star'/><i className='fas fa-star'/></p>
                                        <select value={rating}
                                        onChange={(e)=> setRating(e.target.value)}>
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                        </select>
                                        </div>
                                        <input type="textbox" placeholder='Write a comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                                        <button>Submit</button>
                                    </form>) : (<p className='radio__tabs--review--details--signin'>Please <Link to='/login'><span>sign in</span> </Link>to write a review! </p>)}
                                    <div className='radio__tabs--review--details--list'>
                                        {product.reviews ? product.reviews.map((review, index) => (
                                            <div key={index}>
                                                <strong>{review.name}</strong>
                                                <Rating  value={review.rating}/>
                                                <p>{review.createdAt.substring(0,10)}</p>
                                                <p>{review.comment}</p>
                                            </div>
                                        )): null}
                                    
                                     </div>
                                    </div>
                                    
                                </div>
                            </div>
                            </div>
                            </div>         
                    </div>
            )}
            
        </>
    )
}

export default ProductScreen