import { Outlet, useOutletContext} from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import { useState, useEffect } from 'react'
import axiosBaseURL from '../common/httpCommon'

const DashLayout = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        axiosBaseURL.get('/user', 
        {withCredentials:true})
            .then(response=>{
                setUser(response.data)
            })
            .catch(error=>{
                console.error("error:", error)
                // if token expired, user is not authenticated
                // direct to login page. 
                if (error.response.status === 403) {
                    window.location.href = '/login';
                }
            })
    }, [])

    const content = (        
        <>
            <DashHeader />
            <div className="dash-container">
                <Outlet context={user}/>
            </div>
            <DashFooter user={user}/>
        </>
    )

    return (
        content
    )
}
export default DashLayout


// export custom hook useUser() so children components 
// are able to use. 
export function useUser(){
    return useOutletContext()
}