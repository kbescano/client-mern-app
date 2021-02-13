import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProduct, listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'
import { PRODUCT_CREATE_RESET } from '../constant/productConstants'
import {toast} from 'react-toastify'



const ProductlistScreen = () => {

    toast.configure()

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading,  products } = productList

    const productCreate = useSelector(state => state.productCreate)

    const { loading: loadingCreate,  product: createdProduct } = productCreate

    const productDelete = useSelector(state => state.productDelete)

    const { loading: loadingDelete , success} = productDelete

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        dispatch(listProducts())
        if(success){
            dispatch(listProducts())
        }
    }, [dispatch, createdProduct, success ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }

    }

    return (
        <>
            <Meta title='List of Products || Admin' />
            <Navbar />
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {loading ? <Loader /> : (
                <div className='list__container'>
                    <div className='list__container--button'>
                        <Link to='/admin/create'><button><i className='fas fa-plus'></i>Create Product</button></Link>
                    </div>
                    <table className="productlist">
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Gender</th>
                            <th>Price</th>
                            <th>Stocks Available</th>
                            <th>Update</th>
                        </thead>
                        <tbody>
                            {products.map(item => (
                                <tr key={item._id}>
                                    <td data-label="Product Id">{item._id.substring(20, 25)}</td>
                                    <td data-label="Name" className='productlist--name'><Link to={`/product/${item._id}`}>{item.name}</Link></td>
                                    <td data-label="Brand">{item.brand}</td>
                                    <td data-label="Category">{item.category}</td>
                                    <td data-label="Gender">{item.gender}</td>
                                    <td data-label="Price">{item.price}</td>
                                    <td data-label="Stocks">{item.countInStock}</td>
                                    <td data-label="Update">
                                        <Link to={`/admin/product/${item._id}/edit`}>
                                            <i className='fas fa-edit'></i></Link><i className='fas fa-trash' onClick={() => deleteHandler(item._id)}></i></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}


        </>
    )
}

export default ProductlistScreen
