import axios from "axios"
import { toast } from "react-toastify"
import {
    PRODUCT_CATEGORY_FAIL,
    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS
} from "../constant/productConstants"


export const listProducts = ( keyword = '') => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`https://mern-ecom-app.herokuapp.com/api/products?keyword=${keyword}`)

        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`https://mern-ecom-app.herokuapp.com/api/products/${id}`)

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})


    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getProductCategory = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_CATEGORY_REQUEST})

        const {data} = await axios.get(`https://mern-ecom-app.herokuapp.com/api/products/category/${id}`)

        dispatch({type: PRODUCT_CATEGORY_SUCCESS, payload: data})


    } catch (error) {
        dispatch({
            type: PRODUCT_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                    userInfo.token
                }`
            }

        }

        const {data} = await axios.post('https://mern-ecom-app.herokuapp.com/api/products/', product, config)

        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data})

        toast(`${data.name} has been created!`)
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                    userInfo.token
                }`
            }

        }

        const {data} = await axios.put(`https://mern-ecom-app.herokuapp.com/api/products/${
            product._id
        }`, product, config)

        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data})
        toast.info(`${data.name} updated!`)

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                    userInfo.token
                }`
            }

        }

        await axios.delete(`https://mern-ecom-app.herokuapp.com/api/products/${id}`, config)

        dispatch({type: PRODUCT_DELETE_SUCCESS})
        toast.info('Product deleted!')

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}

export const createProductReview = (productId, review) => async(dispatch, getState) => {
    try {

        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        const { userLogin: {userInfo}} = getState()
 
        const config = {
            headers: {
                'Content-Type' : 'application/json' ,
                Authorization: `Bearer ${userInfo.token}`
            }
            
        }

       await axios.post(`https://mern-ecom-app.herokuapp.com/api/products/${productId}/reviews` , review, config)

        dispatch({ 
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })

        toast('Review submitted!')


    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    } 
} 
