import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../constant/userConstants'
import { getUserDetails, userUpdateId } from '../actions/userActions'
import {toast} from 'react-toastify'

const UserEditScreen = ({ match,  history }) => {

    toast.configure()

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)

    const { loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, user, userId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userUpdateId({ _id: userId, name, email, isAdmin }))
    }


    return (
        <>
            <Meta title='Welcome to Shop || User edit' />
            <Navbar />
            {loading && <Loader />}
            {error && (<h1>{error}</h1>)}
            {loadingUpdate && <Loader />}
            <div className='useredit'>
                <div className='useredit__main'>
                    <div className='useredit__main--img'>
                        <img src='/images/shopping.jpg' alt="shopping" />
                    </div>
                    <div className='useredit__main--content'>

                        <form onSubmit={submitHandler}>
                            <h1>Update your Account</h1>
                            <div className='useredit__main--content--input'>
                                <label>Email</label>
                                <input type="email" placeholder='Enter your email address' value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='useredit__main--content--input'>
                                <label>Full name</label>
                                <input type="text" placeholder='Enter your full name' value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='useredit__main--content--input--admin'>
                                <label>Is Admin?</label>
                                <input type="checkbox" placeholder='Is Admin?' value={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)} />
                            </div>
                            <div className='useredit__main--content--button'>
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserEditScreen

