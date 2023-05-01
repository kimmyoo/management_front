// import { Outlet, useOutletContext} from 'react-router-dom'
import React from 'react';
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import { useState, useEffect, createContext } from 'react'
import axiosBaseURL from '../common/httpCommon'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'


const DashLayout = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosBaseURL.get('/user', { withCredentials: true })
                setUser(response.data)
            } catch (error) {
                console.error("error:", error)
                // if token expired, user is not authenticated
                // direct to login page. 
                if (error.response.status === 403) {
                    setUser(null)
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 5000)
                    // window.location.href = '/login';
                }
            }
        }
        fetchUser()
    }, [])

    let content
    if (!user) {
        content = (
            <div className='content-wrapper'>
                <h3>You're not logged in, Please login</h3>
                <h3>Your will be directed to login page in 5s</h3>
                <Link to="/login">Login</Link>
            </div>
        )
    }
    else {
        content = (
            <UserContext.Provider value={user}>
                <DashHeader />
                <div className="dash-container">
                    {/* context={user} */}
                    {user && <Outlet />}
                </div>
                {/* user={user} */}
                <DashFooter />
            </UserContext.Provider>
        )
    }

    return (
        content
    )
}

// export custom hook useUser() so children components 
// are able to use. 
// export function useUser(){
//     return useOutletContext()
// }


export default DashLayout
export const UserContext = createContext()
