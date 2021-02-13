import React , {useRef, useEffect} from 'react'
import { products } from '../data/data'
import { Link } from 'react-router-dom'
import {TweenLite, Power3} from 'gsap'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

const Categories = () => {

    let cat = useRef(null)
    let cat2 = useRef(null)
    gsap.registerPlugin(CSSPlugin)

    useEffect(()=> {
        TweenLite.staggerFrom([cat, cat2], .8, {opacity: 0, y: 40, ease: Power3.easeInOut}, .5)
    }, [])
    

    const product = products.filter((a, ind) => ind === products.findIndex(item => item.category === a.category))

    return (<>
        <section className="categories">
            <div className="categories__title">
                <h2 ref = {el => cat = el}>Shop Collections</h2>
                <span ref = {el => cat2 = el}>Select from the premium product and save plenty money</span>
            </div>
            <div className="categories__container"> {
                product.map((item, index) => {
                    return (<div className="categories__container--item"
                        key={index}>
                        <div className="categories__container--item--content">
                            <img src={item.category === 'Apparel' ? '/images/apparel.jpg' : item.category === 'Footwear' ? '/images/footwear.jpg' : '/images/acc.jpg'}alt={ item.name} 
                            />
                            <h3> { item.category}</h3>
                            <Link to={`/category/${item.category}`}>
                                <button>Explore
                                    <i className="fas fa-shopping-bag"></i>
                                </button>
                            </Link>
                        </div>
                    </div>)
                })
            } </div>
        </section>
    </>)
}

export default Categories
