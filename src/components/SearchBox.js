import React, {useState} from 'react'

const SearchBox = ({history}) => {

    const [ keyword, setKeyword ] = useState('') 


    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/products/search/${keyword}`)
        } else {
            history.push('/products')
        }
    }
    return (
        <>  
            <form onSubmit={submitHandler} className='searchBox'>
            <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products'/>
            <button><i className='fas fa-search'/></button>
            </form>
        </>
    )
}

export default SearchBox
