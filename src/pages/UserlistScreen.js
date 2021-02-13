import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, listUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Navbar from '../components/Navbar'
import {toast} from 'react-toastify'


const UserlistScreen = ({ history }) => {
    
    toast.configure()

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)

    const { loading, users } = userList

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)

    const { loading: loadingDelete, success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }

    }
    return (
        <>
            <Meta title='List of users || Admin' />
            <Navbar />
            {loadingDelete && <Loader/>}
            {loading ? <Loader /> : (
                <div className='list__container'>
                    <table className="userlist">
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Update</th>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td data-label="ID">{user._id}</td>
                                    <td data-label="Name">{user.name}</td>
                                    <td data-label="Email">{user.email}</td>
                                    <td data-label="Admin">{user.isAdmin ? (<i className='fas fa-check'></i>) : <i className='fas fa-times' ></i>}</td>
                                    <td data-label="Update"><Link to={`/admin/user/${user._id}/edit`}><i className='fas fa-edit'></i></Link><i className='fas fa-trash' onClick={() => deleteHandler(user._id)}></i></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default UserlistScreen

