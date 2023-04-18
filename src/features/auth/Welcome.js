import { Link } from 'react-router-dom'
import { useUser } from '../../components/DashLayout'


const Welcome = () => {
    const user = useUser()
    const content = (
        <section className="welcome">
            <h1>Dashboard</h1>
            <h3>Hello {user.username}, Welcome!</h3>
            <p><Link to="/dash/programs">View Programs</Link></p>
            <p><Link to="/dash/instructors">View Instructors</Link></p>
            <p><Link to="/dash/classes">View Classes</Link></p>
            <p><Link to="/dash/students">View Students</Link></p>
            {/* <p><Link to="/dash/users">View User Settings</Link></p> */}
        </section>
    )

    return content
}
export default Welcome