import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons"
// import { useNavigate, useLocation } from 'react-router-dom'
import React from 'react';

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h2><span className="nowrap">School Management System</span></h2>
            </header>
            <main className="public__main">
                <p>V2.1</p>
                <address className="public__addr">
                    ABC Occupational Training School<br />
                    1234 Wonderful Street <br />
                    New York, NY 10002<br />
                    <a href="tel:+14132307801">(413) 2307801</a>
                </address>
                <br />
                <p>www.abcschool.com</p>
            </main>
            <footer>
                <Link to="/login"><FontAwesomeIcon icon={faRightToBracket} />Login</Link>
            </footer>
        </section>
    )
    return content
}
export default Public