import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h2><span className="nowrap">HYI Student Management</span></h2>
            </header>
            <main className="public__main">
                <p>Student Management System V2.1</p>
                <address className="public__addr">
                    Huaqiao Yihu Institute<br />
                    3720 Prince Street 4A<br />
                    Flushing, NY 11354<br />
                    <a href="tel:+17184455888">(718) 4455888</a>
                </address>
                <br />
                <p>Owner: Huaqiao Yihu Institute</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content
}
export default Public