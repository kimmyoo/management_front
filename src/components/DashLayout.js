// import { Outlet, useOutletContext} from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import { useState, useEffect, createContext} from 'react'
import axiosBaseURL from '../common/httpCommon'
import { Outlet, useOutletContext } from 'react-router-dom'


export const UserContext = createContext()

const DashLayout = () => {
    

    const [user, setUser] = useState({})

    useEffect(() => {
        axiosBaseURL.get('/user', 
        {withCredentials:true})
            .then(response=>{
                setUser(response.data)
                // console.log(response.data)
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
        <UserContext.Provider value={user}>
            <DashHeader />
            <div className="dash-container">
                {/* context={user} */}
                <Outlet />
            </div>
            {/* user={user} */}
            <DashFooter /> 
        </UserContext.Provider>
    )

    return (
        content
    )
}

// export custom hook useUser() so children components 
// are able to use. 
export function useUser(){
    return useOutletContext()
}


export default DashLayout

