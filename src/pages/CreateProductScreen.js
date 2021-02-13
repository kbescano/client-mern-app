import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import { createProduct, listProducts } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constant/productConstants'
import { toast } from 'react-toastify'



const CreateProductScreen = ({ history }) => {

    toast.configure()


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [gender, setGender] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setStocks] = useState(0)
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productCreate = useSelector(state => state.productCreate)

    const { loading, success,  product } = productCreate


    useEffect(() => {
        if (success) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            dispatch(listProducts())
            history.push('/admin/productlist')
        }

    }, [dispatch, history, success, product])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }

            const { data } = await axios.post('https://mern-ecom-app.herokuapp.com/api/upload', formData , config)


            setImage(data.substring(16,50))
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct({ name, description, brand, category, gender, price, countInStock, image }))
    }

    return (
        <>
            <Meta title='Create product' />
            <Navbar />
            {loading && <Loader />}
            {uploading && <Loader/>}
            <div className='createproduct'>
                <div className='createproduct__main'>
                    <div className='createproduct__main--content'>
                        <h1>Create Product</h1>
                        <form onSubmit={submitHandler}>
                            <div className='createproduct__main--content--input'>
                                <label>Name</label>
                                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='createproduct__main--content--input'>
                                <label>Description</label>
                                <input type="text" placeholder='Description'
                                    value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className='createproduct__main--content--input'>
                                <label>Brand</label>
                                <input type="text" placeholder='Brand'
                                    value={brand} onChange={(e) => setBrand(e.target.value)} />
                            </div>
                            <div className='createproduct__main--content--input'>
                                <label>Category</label>
                                <input type="text" placeholder='Category'
                                    value={category} onChange={(e) => setCategory(e.target.value)} />
                            </div>
                            <div className='createproduct__main--content--input'>
                                <label>Gender</label>
                                <input type="text" placeholder='Gender'
                                    value={gender} onChange={(e) => setGender(e.target.value)} />
                            </div>
                            <div className='createproduct__main--content--input'>
                                <label>Price</label>
                                <input type="number" placeholder='$'
                                    value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className='createproduct__main--content--input'>
                                <label>Stocks Available</label>
                                <input type="number" placeholder='0'
                                    value={countInStock} onChange={(e) => setStocks(e.target.value)} />
                            </div>
                            <div className='createproduct__main--content--input'>
                                <label>Image</label>
                                <input type="text" placeholder='Image'
                                    value={image} onChange={(e) => setImage(e.target.value)} />
                                <input type="file" placeholder='Choose file' onChange={uploadFileHandler} />
                            </div>
                            <div className='createproduct__main--content--button'>
                                <button>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProductScreen
