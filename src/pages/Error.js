import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <section className='loader__container'>
                <div className='loader'>
                    <div className='loader__dot' ></div>
                    <div className='loader__dot' ></div>
                    <div className='loader__dot' ></div>
                    <div className='loader__dot' ></div>
                    <div className='loader__dot' ></div>
                </div>
                <h1>Page not Found!</h1>
                <Link to='/'><button>Go Back</button></Link>
                <p>Ken Escaño</p>
            </section>
        </>

    )
}

export default Error
