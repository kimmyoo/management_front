import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import axiosBaseURL from "../common/httpCommon"
import { useContext } from "react"
import { UserContext } from "./DashLayout"

const DashFooter = () => {
    const user = useContext(UserContext)
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(date)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => {
        navigate('/dash')
    }

    const logout = () => {
        axiosBaseURL.post('/logout')
            .then(reponse => {
                console.log("logged out")
                navigate('/')
            })
    }

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button warn"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const logoutButton = (
        <button
            className="dash-footer__button icon-button warn"
            title="Logout"
            onClick={logout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )


    const content = (
        <footer className="dash-footer">
            <p>{goHomeButton}</p>
            <p>User:{user?.username}, {user?.is_superuser ? "Administrator" : "Staff"}</p>
            <p><span className="dash-footer__span">{today}</span></p>
            <p>{logoutButton}</p>
        </footer>
    )
    return content
}
export default DashFooter