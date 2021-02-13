import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, updateProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'


const ProductEditScreen = ({ match, history }) => {

    toast.configure()

    const productId = match.params.id
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [gender, setGender] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const productDetails = useSelector(state => state.productDetails)

    const { loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)

    const { loading: loadingUpdate , success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(getProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setGender(product.gender)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }


    }, [dispatch, product, productId, history, successUpdate])

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
            toast.error(`${error}`)
            setUploading(false)
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({ _id: productId, name, price, image, brand, gender, category, countInStock, description }))
    }

    return (
        <>
            <Meta title='Edit Product' />
            <Navbar />
            {loading && <Loader />}
            {uploading && <Loader/>}
            {loadingUpdate && <Loader />}
            <div className='editproduct'>
                <div className='editproduct__main'>
                    <div className='editproduct__main--img'>
                        <img src={product.image} alt="shopping" />
                    </div>
                    <div className='editproduct__main--content'>
                        <h1>Update Product</h1>
                        <form onSubmit={submitHandler}>
                            <div className='editproduct__main--content--input'>
                                <label>Name</label>
                                <input type="text" placeholder='Name'
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='editproduct__main--content--input'>
                                <label>Description</label>
                                <input type="text" placeholder='Description'
                                    value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className='editproduct__main--content--input'>
                                <label>Brand</label>
                                <input type="text" placeholder='Brand'
                                    value={brand} onChange={(e) => setBrand(e.target.value)} />
                            </div>
                            <div className='editproduct__main--content--input'>
                                <label>Category</label>
                                <input type="text" placeholder='Category'
                                    value={category} onChange={(e) => setCategory(e.target.value)} />
                            </div>
                            <div className='editproduct__main--content--input'>
                                <label>Gender</label>
                                <input type="text" placeholder='Gender'
                                    value={gender} onChange={(e) => setGender(e.target.value)} />
                            </div>
                            <div className='editproduct__main--content--input'>
                                <label>Price</label>
                                <input type="number" placeholder='Price'
                                    value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className='editproduct__main--content--input'>
                                <label>Stocks</label>
                                <input type="number" placeholder='Stocks'
                                    value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                            </div>
                            <div className='editproduct__main--content--input'>
                                <label>Image</label>
                                <input type="text" placeholder='Image'
                                    value={image} onChange={(e) => setImage(e.target.value)} />
                                <input type="file" placeholder='Choose file' onChange={uploadFileHandler} />
                            </div>
                            <div className='editproduct__main--content--button'>
                                <button>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductEditScreen
