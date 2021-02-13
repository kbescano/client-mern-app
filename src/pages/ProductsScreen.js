import React, {useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import SearchBox from '../components/SearchBox'
import { toast } from 'react-toastify'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'



const ProductsScreen = ({match}) => {

    let con = useRef(null)
    let a = useRef(null)
    let b = useRef(null)

    gsap.registerPlugin(CSSPlugin)
 
    toast.configure()

    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading, products} = productList


    
    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    useEffect(() => {
        if(!loading) {
            TweenLite.to(con, 0, {css: {visibility: "visible"}})
            TweenLite.staggerFrom([a, b ], .8, {opacity: 0, x: 10, ease: Power3.easeInOut}, .2)
        }
    }, [loading])


    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <Meta title='View Products' />
                    <Navbar color='#1D263B' text='#fff' />
                    <div className='products__container' ref={el => con = el}>
                    {keyword && <div className='clear'>
                        <h1>Showing results for <span>{keyword}</span> </h1>
                        <Link to='/products' ><button><i className='fas fa-times'/></button></Link>
                        </div>}
                        <nav className='nav-left' ref={el => a = el}>
                            <Route  render={({ history }) => <SearchBox history={history} key={'Clear'} />} />
                             
                                {!keyword && (
                                    <ul >
                                    <Link to='/gender/Men'><li>Mens</li></Link>
                                    <Link to='/gender/Women'><li>Womens</li></Link>
                                    <Link to='/category/Apparel' ><li>Apparel</li></Link>
                                    <Link to='/category/Footwear' ><li>Footwear</li></Link>
                                    <Link to='/category/Accessories' ><li>Accessories</li></Link>
                                    </ul>
                                )}
                            
                        </nav>
                        
                        <div className='product-right' ref={el => b = el}>
                            
                            {products.map((item, index) => (
                                <div className='products' key={index}>
                                    <div className='products__main' >
                                        <div className='products__main--price'><span>$</span>{item.price}</div>
                                        <img className='products__main--img' src={item.image} alt={item.name} />
                                        <div className='products__main--rating'>
                                            <Rating value={item.rating} text={item.numReviews === 1 ? `${item.numReviews} review` : item.numReviews === 0 ? `0 reviews` : ` ${item.numReviews} reviews`} />
                                        </div>
                                        <div className='products__main--title'>
                                            {item.name}
                                        </div>
                                        <div className='products__main--brand'>
                                            by {item.brand}
                                        </div>
                                            <div className='products__main--button'>
                                            <Link to={`/product/${item._id}`}>
                                                <button>View Details</button>
                                                </Link>
                                            </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default ProductsScreen
