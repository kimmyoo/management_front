import { Link } from 'react-router-dom'
// import { useUser } from '../../components/DashLayout'
import { useContext } from "react"
import { UserContext } from '../../components/DashLayout'


const Welcome = () => {
    const user = useContext(UserContext)
    const content = (
        <div className='content-wrapper'>
            <section className="welcome">
                    <h1>Dashboard</h1>
                    <h3>Hello {user?.username}, Welcome!</h3>
                    <p><Link to="/dash/programs">View Programs</Link></p>
                    <p><Link to="/dash/instructors">View Instructors</Link></p>
                    <p><Link to="/dash/classes">View Classes</Link></p>
                    <p><Link to="/dash/students">View Students</Link></p>
                    <p><Link to="/dash/import">Import from File</Link></p>
            </section>
        </div>
    )
    return content
}
export default Welcome