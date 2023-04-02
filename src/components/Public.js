import { Link } from 'react-router-dom'


const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h2><span className="nowrap">School Management System</span></h2>
            </header>
            <main className="public__main">
                <p>V2.1</p>
                <address className="public__addr">
                    School Name<br />
                    0000 Light street <br />
                    New York, NY 10002<br />
                    <a href="tel:+14132307801">(413) 2307801</a>
                </address>
                <br />
                <p>School Webiste: www.schoolname.com</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content
}
export default Public