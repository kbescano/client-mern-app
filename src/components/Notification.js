import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const Notification = ({ message }) => {

    const notify = () => {
        toast({message})
    }

    notify()

    return (
        <>
        </>
    )
}

export default Notification
