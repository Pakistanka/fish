import React, {useEffect} from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { database } from '../../../firebase'

function Orders() {
    const { getProfile } = useAuth()
    
    // useEffect(() => {
    //     getProfile();
    // }, [database])

    return (
        <div>
            You can see orders here \\
        </div>
    )
}

export default Orders
