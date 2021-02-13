import axios from 'axios'
import {CART_ITEM_RESET} from '../constant/cartConstants'
import {ORDER_CREATE_RESET, ORDER_LIST_MY_RESET} from '../constant/orderConstants'
import {
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from '../constant/userConstants'
import {toast} from 'react-toastify'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('https://mern-ecom-app.herokuapp.com/api/users/login', {
            email,
            password
        }, config)

        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        toast(`Welcome ${data.name}`)

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`Invalid Email or Password!`)
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('https://mern-ecom-app.herokuapp.com/api/users/', {
            name,
            email,
            password
        }, config)

        dispatch({type: USER_REGISTER_SUCCESS, payload: data})

        dispatch({type: USER_LOGIN_SUCCESS, payload: data})

        toast('Thank you for register!')

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {

        dispatch({type: USER_DETAILS_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${
                    userInfo.token
                }`
            }

        }

        const {data} = await axios.get(`https://mern-ecom-app.herokuapp.com/api/users/${id}`, config)

        dispatch({type: USER_DETAILS_SUCCESS, payload: data})

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {

        dispatch({type: USER_UPDATE_PROFILE_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${
                    userInfo.token
                }`
            }

        }

        const {data} = await axios.put('https://mern-ecom-app.herokuapp.com/api/users/profile', user, config)

        dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data})
        toast('Profile updated!')

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}


export const listUsers = () => async (dispatch, getState) => {
    try {

        dispatch({type: USER_LIST_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${
                    userInfo.token
                }`
            }

        }

        const {data} = await axios.get('https://mern-ecom-app.herokuapp.com/api/users', config)

        dispatch({type: USER_LIST_SUCCESS, payload: data})


    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {

        dispatch({type: USER_DELETE_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${
                    userInfo.token
                }`
            }

        }

        await axios.delete(`https://mern-ecom-app.herokuapp.com/api/users/${id}`, config)

        dispatch({type: USER_DELETE_SUCCESS})
        toast.info('Deleted successfuly')

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}


export const userUpdateId = (user) => async (dispatch, getState) => {
    try {

        dispatch({type: USER_UPDATE_REQUEST})

        const {userLogin: {
                userInfo
            }} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${
                    userInfo.token
                }`
            }

        }

        const {data} = await axios.put(`https://mern-ecom-app.herokuapp.com/api/users/${
            user._id
        }`, user, config)

        dispatch({type: USER_UPDATE_SUCCESS})


        dispatch({type: USER_DETAILS_SUCCESS, payload: data})

        toast.info('User updated!')

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        toast.error(`${error.response.data.message}`)
    }
}

export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('__paypal_storage__')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
    dispatch({type: CART_ITEM_RESET})
    dispatch({type: ORDER_CREATE_RESET})
    toast('Logged out Successfully')
}
