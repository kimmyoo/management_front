import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import axiosBaseURL from "../common/httpCommon"


const DashFooter = ({user}) => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')
    const logout = () => {
        axiosBaseURL.post('/logout')
            .then(reponse=>{
                console.log("logged out successfully")
                navigate('/login')
            })
    }

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }


    const content = (
        <footer className="dash-footer">
            {goHomeButton}
            <p>Current User:{user.username}</p>
            <p>User Group:{user.is_superuser?"Administrator":"Staff"}</p>
            <span className="dash-footer__span">{today}</span>
            <button onClick={logout}>logout</button>
        </footer>
    )
    return content
}
export default DashFooter