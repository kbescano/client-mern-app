import React from 'react'

const Loader = () => {
    return (<>
        <section className='loader__container'>
            <div className='loader'>
                <div className='loader__dot'></div>
                <div className='loader__dot'></div>
                <div className='loader__dot'></div>
                <div className='loader__dot'></div>
                <div className='loader__dot'></div>
            </div>
            <h1>Loading...</h1>
            <p>Ken Escaño</p>
        </section>
    </>)
}

export default Loader

